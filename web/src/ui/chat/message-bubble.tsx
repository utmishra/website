import { UIMessage } from '@ai-sdk/react'

export const MessageBubble = ({ message }: { message: UIMessage }) => {
  return (
    <div
      key={message.id}
      style={{
        padding: '1rem',
        borderRadius: '25px',
        margin: '0.5rem 0',
        backgroundColor:
          message.role === 'user' ? 'var(--blue-a3)' : 'var(--blue-a4)',
        display: 'inline-block',
        width: 'fit-content', // shrink to content
        maxWidth: '80%', // prevent overly wide bubbles
        alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start', // right for user, left for assistant
        flexDirection: 'column',
      }}
    >
      <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
        {message.role === 'user' ? 'You' : 'AI'}
      </div>
      <div>
        {message.parts.map((part, index) => (
          <span
            key={index}
            style={{ display: 'block', marginBottom: '0.25rem' }}
          >
            {part.type === 'text' ? part.text : JSON.stringify(part)}
          </span>
        ))}
      </div>
    </div>
  )
}
