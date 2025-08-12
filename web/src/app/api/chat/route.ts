import {
  convertToModelMessages,
  smoothStream,
  stepCountIs,
  streamText,
  type UIMessage,
} from 'ai'
import { buildToolSchemas } from './schema'
import { logger } from '@components/lib/logging/logger'

// Allow streaming responses up to 30 seconds like examples
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const result = streamText({
    model: 'openai/o3-mini',
    system: `You are a helpful, concise file system assistant. Use read-only tools to gather exactly the information needed. After collecting needed data (at most a few tool calls), ALWAYS produce a natural language answer summarizing the findings for the user. If the data is already sufficient, answer directly without further tool calls.`,
    messages: convertToModelMessages(messages),
    providerOptions: {
      openai: {
        reasoningSummary: 'auto',
        reasoningEffort: 'medium',
      },
    },
    tools: buildToolSchemas({ includeInputs: true }),
    stopWhen: stepCountIs(5),
    onStepFinish: ({ text, toolCalls, toolResults, finishReason }) => {
      logger.info(
        {
          text,
          toolCalls,
          toolResults,
          finishReason,
        },
        'agent.step.finish',
      )
    },
    experimental_transform: smoothStream({
      delayInMs: 20,
      chunking: 'word',
    }),
  })

  return result.toUIMessageStreamResponse({ sendReasoning: true })
}
