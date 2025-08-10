import { UIMessage } from '@ai-sdk/react'
import { Markdown } from './markdown'

export const MessageBubble = ({ message }: { message: UIMessage }) => {
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
      <div>
        {message.parts.map((part, index) => {
          switch (part.type) {
            case 'step-start':
              // show step boundaries as horizontal lines:
              return index > 0 ? (
                <div key={index} className="text-gray-500">
                  <hr className="my-2 border-gray-300" />
                </div>
              ) : null
            case 'text':
              return (
                <span
                  key={index}
                  style={{ display: 'block', marginBottom: '0.25rem' }}
                >
                  <Markdown>{part.text}</Markdown>
                </span>
              )
            default:
              return (
                <span
                  key={index}
                  style={{ display: 'block', marginBottom: '0.25rem' }}
                >
                  {JSON.stringify(part)}
                </span>
              )
          }
        })}
      </div>
    </div>
  )
}
