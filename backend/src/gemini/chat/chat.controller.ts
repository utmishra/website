import { Controller, Sse, MessageEvent, Body, Post } from '@nestjs/common'
import { Observable } from 'rxjs'
import { ChatService } from './chat.service'
import { ChatRequestDto } from './chat.dto'

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Sse('sse')
  sse(@Body() dto: ChatRequestDto): Observable<MessageEvent> {
    console.log('Received SSE request with prompt:', dto.prompt)
    const textStream = this.chatService.generateChatResponse(dto.prompt)

    console.log('Starting to stream text...')

    return new Observable<MessageEvent>((subscriber) => {
      let aborted = false

      ;(async () => {
        try {
          for await (const chunk of textStream) {
            console.log('Received chunk:', chunk)
            if (aborted) break
            subscriber.next({ data: chunk })
          }
          if (!aborted) subscriber.complete()
        } catch (err) {
          if (!aborted) subscriber.error(err)
        }
      })()

      return () => {
        aborted = true
      }
    })
  }

  @Post('generate')
  async chat(@Body() dto: ChatRequestDto): Promise<void> {
    console.log('GOOGLE API KEY:', process.env.GOOGLE_GENERATIVE_AI_API_KEY)
    console.log('Received chat request with prompt:', dto.prompt)
    this.chatService.streamChatResponseWithNext(dto.prompt, (chunk) => {
      console.log('Chunk received in chat method:', chunk)
    })
  }
}
