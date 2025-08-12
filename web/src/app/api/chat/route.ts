import {
  convertToModelMessages,
  smoothStream,
  stepCountIs,
  streamText,
  type UIMessage,
} from 'ai'
import { buildToolSchemas } from './schema'
import { systemPrompt } from './system-prompt'

// Allow streaming responses up to 30 seconds like examples
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const result = streamText({
    model: 'openai/gpt-5-mini',
    system: systemPrompt,
    messages: convertToModelMessages(messages),
    providerOptions: {
      openai: {
        reasoningSummary: 'auto',
        reasoningEffort: 'medium',
      },
    },
    tools: buildToolSchemas({ includeInputs: true }),
    stopWhen: stepCountIs(5),
    experimental_transform: smoothStream({
      delayInMs: 20,
      chunking: 'word',
    }),
  })

  return result.toUIMessageStreamResponse({ sendReasoning: true })
}
