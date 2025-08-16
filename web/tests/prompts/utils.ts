export type StreamChunk = Record<string, any>

export function buildStream(chunks: StreamChunk[]): string {
  const lines = chunks.map((c) => `data: ${JSON.stringify(c)}`)
  lines.push('data: [DONE]', '')
  return lines.join('\n')
}

export function parseStream(raw: string): StreamChunk[] {
  return raw
    .split('\n')
    .filter((line) => line.startsWith('data:'))
    .map((line) => line.replace(/^data:\s*/, ''))
    .filter((line) => line && line !== '[DONE]')
    .map((line) => JSON.parse(line))
}
