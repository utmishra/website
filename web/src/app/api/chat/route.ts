import {
  convertToModelMessages,
  smoothStream,
  stepCountIs,
  streamText,
  type UIMessage,
} from 'ai'
import { buildToolSchemas } from './schema'
import { systemPrompt } from './prompts/file-system-prompt'
import { genericSystemPrompt } from './prompts/generic-system-prompt'
import { logger } from '@components/lib/logging/logger'

// Allow streaming responses up to 30 seconds like examples
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const result = streamText({
    model: 'openai/gpt-5-mini',
    system: genericSystemPrompt,
    messages: convertToModelMessages(messages),
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
