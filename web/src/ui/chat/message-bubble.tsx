import type { UIMessage } from '@ai-sdk/react'
import { renderMessageParts } from './message-part-renderers'

export const MessageBubble = ({ message }: { message: UIMessage }) => {
  console.log(message.parts.map((part) => part.type))
  return (
    <div
      key={message.id}
      style={{
        padding: '0.5rem 1rem',
        borderRadius: '25px',
        margin: '0.5rem',
        backgroundColor:
          message.role === 'user' ? 'var(--blue-a3)' : 'var(--blue-a4)',
        display: 'inline-block',
        width: 'fit-content', // shrink to content
        maxWidth: '80%', // prevent overly wide bubbles
        alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start', // right for user, left for assistant
        flexDirection: 'column',
      }}
    >
      <div>{renderMessageParts(message)}</div>
    </div>
  )
}
