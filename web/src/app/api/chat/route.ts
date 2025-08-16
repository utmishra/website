import {
  convertToModelMessages,
  smoothStream,
  stepCountIs,
  streamText,
} from 'ai'
import { buildToolSchemas } from './schema'
import { genericSystemPrompt } from './prompts/generic-system-prompt'
import { logger } from '@components/lib/logging/logger'
import { NextResponse } from 'next/server'
import { simpleStream } from '../../../../tests/prompts/simple'
import { buildStream } from '../../../../tests/prompts/utils'

// Allow streaming responses up to 30 seconds like examples
export const maxDuration = 30

export async function POST(req: Request) {
  // Parse and validate request body
  let body: unknown
  try {
    body = await req.json()
  } catch {
    body = null
  }
  const messages =
    body && typeof body === 'object' && Array.isArray((body as any).messages)
      ? ((body as any).messages as any[])
      : undefined

  if (!messages) {
    return NextResponse.json(
      { error: 'Invalid request: messages array is required' },
      { status: 400 },
    )
  }

  // Normalize incoming messages: ensure content is an array of parts
  // compatible with convertToModelMessages expectations.
  const normalized = messages.map((m: any) => ({
    id: m.id,
    role: m.role,
    parts: Array.isArray(m.parts)
      ? m.parts
      : Array.isArray(m.content)
      ? m.content
      : [{ type: 'text', text: String(m.content ?? '') }],
  }))

  // Deterministic stubbed response for route tests.
  if (process.env.TEST_ROUTES) {
    const lines = buildStream(simpleStream)
    return new Response(lines, {
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
        'X-Test-Mode': 'routes',
      },
    })
  }

  const result = streamText({
    model: 'openai/gpt-5-mini',
    system: genericSystemPrompt,
    messages: convertToModelMessages(normalized),
    providerOptions: {
      openai: {
        reasoningSummary: 'auto',
        reasoningEffort: 'low',
        parallelToolCalls: true,
      },
    },
    tools: buildToolSchemas({ includeInputs: true }),
    stopWhen: stepCountIs(10),
    experimental_transform: smoothStream({
      delayInMs: 20,
      chunking: 'line',
    }),
    onStepFinish: (stepResult) => {
      logger.info(
        `Tool calls in this step: ${
          stepResult.toolCalls.length
        }, ${stepResult.toolCalls.map((tc) => tc.toolName)}`,
      )
      logger.info(
        `Tool results in this step: ${
          stepResult.toolResults.length
        }, ${stepResult.toolResults.map((tr) => tr.toolName)}`,
      )
    },
  })

  logger.info(result.steps)

  return result.toUIMessageStreamResponse({ sendReasoning: true })
}
