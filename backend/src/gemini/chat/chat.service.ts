import { Injectable } from '@nestjs/common'
import { google } from '@ai-sdk/google'
import { streamText, StreamTextResult, ToolSet } from 'ai'

@Injectable()
export class ChatService {
  generateChatResponse(prompt: string): StreamTextResult<ToolSet, never> {
    return streamText({
      model: google('gemini-2.5-flash-preview-05-20'),
      prompt,
    })
  }
}
