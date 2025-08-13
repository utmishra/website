// External web / search tools for the chatbot
// Server-only utility functions used by tool schemas.

import { ContentsOptions, Exa } from 'exa-js'
import { logger } from '../logging/logger'

const exa = new Exa(process.env.EXA_API_KEY)

/**
 * Perform a Brave Web Search for a natural language query.
 * Requires BRAVE_API_KEY environment variable.
 */
export async function braveWebSearch({
  query,
  count = 5,
  safesearch = 'strict',
}: {
  query: string
  count?: number
  safesearch?: 'off' | 'moderate' | 'strict'
}) {
  if (typeof window !== 'undefined') {
    throw new Error('braveWebSearch: server-only tool')
  }
  const apiKey = process.env.BRAVE_API_KEY
  if (!apiKey) {
    throw new Error('Missing BRAVE_API_KEY env variable')
  }
  const params = new URLSearchParams({
    q: query,
    count: String(count),
    safesearch,
  })
  const url = `https://api.search.brave.com/res/v1/web/search?${params.toString()}`
  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'X-Subscription-Token': apiKey,
      'User-Agent': 'ut-portfolio-chatbot/1.0',
    },
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(
      `Brave search failed (${res.status}): ${text.slice(0, 200)}`,
    )
  }
  const json = (await res.json()) as any
  const webResults: any[] =
    json.web?.results?.map((r: any) => ({
      title: r.title,
      description: r.description?.slice(0, 400) ?? null,
      url: r.url,
      language: r.language ?? null,
    })) ?? []
  return {
    query,
    count: webResults.length,
    results: webResults,
    source: 'brave',
    fetchedAt: new Date().toISOString(),
  }
}

/**
 * Fetch a web page and extract a concise text snippet for grounding.
 */
export async function fetchWebPage({
  url,
  maxBytes = 200_000,
  includeHtml = false,
}: {
  url: string
  maxBytes?: number
  includeHtml?: boolean
}) {
  if (typeof window !== 'undefined') {
    throw new Error('fetchWebPage: server-only tool')
  }
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 12_000)
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'ut-portfolio-chatbot/1.0' },
      signal: controller.signal,
    })
    if (!res.ok) {
      throw new Error(`fetch failed (${res.status})`)
    }
    const ctype = res.headers.get('content-type') || ''
    if (!/(text\/html|text\/plain)/i.test(ctype)) {
      throw new Error(`Unsupported content-type: ${ctype}`)
    }
    const reader = res.body?.getReader()
    if (!reader) throw new Error('No body reader')
    let received = 0
    const chunks: Uint8Array[] = []
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      if (value) {
        received += value.byteLength
        if (received > maxBytes) {
          chunks.push(
            value.subarray(0, maxBytes - (received - value.byteLength)),
          )
          break
        }
        chunks.push(value)
      }
    }
    const buf = Buffer.concat(chunks)
    const html = buf.toString('utf8')
    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i)
    const title = titleMatch ? titleMatch[1].trim() : null
    const cleaned = html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/gi, ' ')
      .replace(/&amp;/gi, '&')
      .replace(/&quot;/gi, '"')
      .replace(/&#39;/gi, "'")
      .replace(/&lt;/gi, '<')
      .replace(/&gt;/gi, '>')
      .replace(/[\r\n]+/g, '\n')
      .replace(/[\t ]+/g, ' ')
      .replace(/\n{2,}/g, '\n')
      .trim()
    const text = cleaned.slice(0, 10_000)
    return {
      url,
      title,
      snippet: text.slice(0, 2000),
      textLength: text.length,
      truncated: text.length >= 10_000,
      contentType: ctype,
      fetchedAt: new Date().toISOString(),
      ...(includeHtml
        ? { html: html.slice(0, 20_000), htmlTruncated: html.length > 20_000 }
        : {}),
    }
  } finally {
    clearTimeout(timeout)
  }
}

export async function exaWebSearch({ query }: { query: string }) {
  logger.info(`Searching for ${query}`)
  const response = await exa.searchAndContents<ContentsOptions>(query, {
    numResults: 5,
    type: 'keyword',
    text: {
      maxCharacters: 5000,
    },
  })

  logger.info(
    response.results.reduce((acc, result) => acc + result.text.length, 0),
    'Total text length from Exa search results',
  )

  return response.results.map((result) => {
    return {
      id: result.id,
      title: result.title,
      url: result.url,
      content: result.text,
    }
  })
}
