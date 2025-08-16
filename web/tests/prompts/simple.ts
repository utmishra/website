import type { StreamChunk } from './utils'

export const simpleStream: StreamChunk[] = [
  { type: 'reasoning', text: 'Searching for greeting' },
  { type: 'dynamic-tool', toolName: 'braveWebSearch' },
  {
    type: 'tool-braveWebSearch',
    state: 'call-in-progress',
    input: { query: 'Hello, world!' },
  },
  {
    type: 'tool-braveWebSearch',
    state: 'output-available',
    output: { results: [{ title: 'Hello World', url: 'https://example.com' }] },
  },
  { type: 'text', text: 'Hello world from test assistant.' },
]

export const simpleAnswerText = 'Hello world from test assistant.'
export const simpleReasoning = 'Searching for greeting'
