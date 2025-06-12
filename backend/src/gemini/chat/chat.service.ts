import { Injectable } from '@nestjs/common'
import { google } from '@ai-sdk/google'
import { streamText, StreamTextResult, ToolSet } from 'ai'

@Injectable()
export class ChatService {
  generateChatResponse(prompt: string): AsyncIterable<string> {
    try {
      const fullPrompt = this.buildPromptFromHistory(sessionId, prompt)
      const { textStream } = streamText({
        model: google('gemini-2.5-flash-preview-05-20'),
        prompt: fullPrompt,
        onError: (error) => {
          console.error('Error in text stream:', error)
          throw new Error('Failed to stream chat response')
        },
      })

      return textStream
    } catch (error) {
      console.error('Error generating chat response:', error)
      throw new Error('Failed to generate chat response')
    }
  }

  async generateChatResponseOnly(prompt: string): Promise<void> {
    try {
      console.log('GOOGLE API KEY:', process.env.GOOGLE_GENERATIVE_AI_API_KEY)
      const streamTextResponse = streamText({
        model: google('gemini-2.5-flash-preview-05-20'),
        prompt,
      })

      console.log('Stream text response:', streamTextResponse)
      const { textStream } = streamTextResponse

      console.log('Text stream...', textStream)

      for await (const chunk of textStream) {
        console.log('Received chunk:', chunk)
      }
    } catch (error) {
      console.error('Error generating chat response:', error)
      throw new Error('Failed to generate chat response')
    }
  }

  async streamChatResponseWithNext(
    prompt: string,
    onChunk: (chunk: string) => void,
  ): Promise<void> {
    try {
      const { textStream } = streamText({
        model: google('gemini-2.0-flash-lite'),
        prompt,
        onError: (error) => {
          console.error('Error in text stream:', error)
          throw new Error('Failed to stream chat response')
        },
      })

      const iterator = textStream[Symbol.asyncIterator]()
      while (true) {
        const { value, done } = await iterator.next()
        console.log('Received chunk:', value)
        if (done) break
        onChunk(value)
      }
    } catch (error) {
      console.error('Error streaming chat response:', error)
      throw new Error('Failed to stream chat response')
    }
  }
}
