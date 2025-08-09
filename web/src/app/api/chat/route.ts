import { streamText, convertToModelMessages, type UIMessage } from 'ai'

export const maxDuration = 30
export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json()
    const result = await streamText({
      model: 'openai/gpt-4o-mini',
      system: `You are a helpful assistant that can answer questions about the weather.`,
      messages: convertToModelMessages(messages),
    })
    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error('Chat API error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to generate chat response.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}
