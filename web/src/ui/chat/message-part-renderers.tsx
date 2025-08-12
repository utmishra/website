import React from 'react'
import type { UIMessage } from '@ai-sdk/react'
import { Markdown } from './markdown'
import { logger } from '@components/lib/logging/logger'

// Helper to create a stable-ish key for text parts
function keyFromText(prefix: string, text: string, fallback: string) {
  return `${prefix}-${
    text.trim().slice(0, 32).replace(/\s+/g, '-') || fallback
  }`
}

// Friendly tool message generator for parts whose type matches tool-<toolName>
function renderFriendlyToolMessage(part: any) {
  if (
    !part?.type ||
    typeof part.type !== 'string' ||
    !part.type.startsWith('tool-')
  )
    return null
  const toolName = part.type.substring('tool-'.length)
  const state: string | undefined = part.state
  const input: Record<string, any> | undefined = part.input
  const output: any = (part as any).output

  // Specific phrasing per known tool
  const build = () => {
    switch (toolName) {
      case 'listDirectory': {
        const dir = input?.dir ?? '.'
        const opts = input?.options || {}
        const optBits: string[] = []
        if (opts.recursive) optBits.push('recursive')
        if (opts.includeHidden) optBits.push('including hidden')
        if (opts.followSymlinks) optBits.push('following symlinks')
        if (typeof opts.maxDepth === 'number')
          optBits.push(`max depth ${opts.maxDepth}`)
        if (opts.includeSelf) optBits.push('including self')
        const suffix = optBits.length ? ` (${optBits.join(', ')})` : ''
        return `Listing directory contents of "${dir}"${suffix}.`
      }
      case 'readTextFile':
        return `Reading text file: "${input?.path}".`
      case 'readJsonFile':
        return `Reading JSON file: "${input?.path}".`
      case 'readBuffer':
        return `Reading binary file: "${input?.path}".`
      case 'getFileMeta':
        return `Fetching metadata for: "${input?.path}".`
      case 'getFileMetaCached':
        return `Fetching cached metadata for: "${input?.path}".`
      case 'pathExists':
        return `Checking if path exists: "${input?.path}".`
      case 'resolveSafePath':
        return `Resolving safe path from segments: ${(
          input?.segments || []
        ).join('/')}.`
      case 'walk': {
        const dir = input?.dir ?? '.'
        return `Walking directory tree starting at "${dir}".`
      }
      case 'getRoot':
        return 'Retrieving project root path.'
      case 'getCwd':
        return 'Retrieving current working directory.'
      default:
        return `Running tool: ${toolName}.`
    }
  }

  const baseMessage = build()
  let statusSuffix = ''
  if (state === 'call-in-progress') statusSuffix = ' (in progress)'
  else if (state === 'output-available') statusSuffix = ' (done)'
  else if (state && state !== 'waiting') statusSuffix = ` (${state})`

  // Optionally summarize output if small & recognizable
  let outputSummary = ''
  if (state === 'output-available' && output != null) {
    try {
      if (toolName === 'listDirectory' && Array.isArray(output)) {
        outputSummary = ` Found ${output.length} entries.`
      } else if (
        toolName === 'listDirectory' &&
        Array.isArray(output?.entries)
      ) {
        outputSummary = ` Found ${output.entries.length} entries.`
      } else if (toolName === 'pathExists' && typeof output === 'boolean') {
        outputSummary = output ? ' Path exists.' : ' Path does not exist.'
      } else if (toolName === 'readJsonFile') {
        const size = JSON.stringify(output).length
        outputSummary = ` JSON size ${size} chars.`
      }
    } catch {
      // ignore summarization errors
    }
  }

  return (
    <span
      key={`tool-${toolName}-${part.toolCallId || part.id || Math.random()}`}
    >
      <Markdown>{`${baseMessage}${statusSuffix}${outputSummary}`}</Markdown>
    </span>
  )
}

// Individual type renderers (excluding tool-* which is dynamic)
const staticRenderers: Record<
  string,
  (part: any, index: number) => React.ReactNode | null
> = {
  'step-start': (_part, index) =>
    index > 0 ? (
      <div className="text-gray-500" key={`step-${index}`}>
        <hr className="min-w-12 my-2 border-gray-300" />
      </div>
    ) : null,
  'dynamic-tool': (part) => (
    <span key={`dynamic-${part.toolName}`}>
      {' '}
      <Markdown>{`[Tool called: ${part.toolName}]`}</Markdown>{' '}
    </span>
  ),
  text: (part) => (
    <span key={keyFromText('text', part.text, 'text')}>
      <Markdown>{part.text}</Markdown>{' '}
    </span>
  ),
  reasoning: (part) =>
    part.text && part.text.trim() ? (
      <span key={keyFromText('reasoning', part.text, 'reasoning')}>
        {' '}
        <Markdown>{`[Reasoning]: ${part.text}`}</Markdown>{' '}
      </span>
    ) : null,
}

export function renderMessagePart(
  part: any,
  index: number,
): React.ReactNode | null {
  // Tool parts first (pattern)
  const toolNode = renderFriendlyToolMessage(part)
  if (toolNode) return toolNode

  if (part.type === 'text') {
    logger.info('Text content', part.text)
  }
  const renderer = staticRenderers[part.type]
  if (renderer) return renderer(part, index)

  // Fallback: raw JSON
  return <span key={`raw-${part.type}-${index}`}>{JSON.stringify(part)}</span>
}

// Optional: expose utility for entire message
export function renderMessageParts(message: UIMessage) {
  return message.parts.map((p, i) => renderMessagePart(p as any, i))
}
