import { Controller, Sse, MessageEvent, Body } from '@nestjs/common'
import { Observable } from 'rxjs'
import { ChatService } from './chat.service'
import { ChatRequestDto } from './chat.dto'

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Sse('sse')
  sse(@Body() dto: ChatRequestDto): Observable<MessageEvent> {
    const { textStream } = this.chatService.generateChatResponse(dto.prompt)

    return new Observable<MessageEvent>((subscriber) => {
      ;(async () => {
        try {
          for await (const chunk of textStream) {
            subscriber.next({ data: chunk })
          }
          subscriber.complete()
        } catch (err) {
          subscriber.error(err)
        }
      })()
    })
  }
}
