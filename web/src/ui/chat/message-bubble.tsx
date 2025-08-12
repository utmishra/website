import type { UIMessage } from '@ai-sdk/react'
import { renderMessagePart } from './message-part-renderers'
import { memo } from 'react'
import { motion } from 'motion/react'

const LoadingDots = memo(() => {
  const dots = [0, 1, 2]
  return (
    <span style={{ display: 'inline-flex', gap: 4, alignItems: 'center' }}>
      {dots.map((i) => (
        <motion.span
          key={i}
          // start semi-transparent & slightly lowered
          initial={{ opacity: 0.25, y: 1 }}
          animate={{ opacity: [0.25, 1, 0.25], y: [1, -1, 1] }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: 'easeInOut',
            delay: i * 0.2,
          }}
          style={{
            display: 'inline-block',
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: 'var(--blue-9)',
          }}
        />
      ))}
    </span>
  )
})

interface MessageBubbleProps {
  message: UIMessage
  showLoading?: boolean
}

export const MessageBubble = ({ message, showLoading }: MessageBubbleProps) => {
  return (
    <>
      {message.parts.map((part, index) => {
        const content = renderMessagePart(part as any, index)
        if (!content) return null
        const type = (part as any).type as string | undefined
        const isMeta =
          (!!type &&
            (type === 'reasoning' ||
              type === 'dynamic-tool' ||
              type.startsWith?.('tool-'))) ||
          type === 'step-start'

        if (isMeta) {
          return (
            <div
              key={`${message.id}-meta-${index}`}
              style={{
                margin: '0.25rem 0.75rem',
                fontSize: '0.7rem',
                fontStyle: 'italic',
                lineHeight: 1.2,
                color: 'var(--gray-11)',
                maxWidth: '70ch',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 6,
              }}
            >
              {showLoading && index === message.parts.length - 1 && (
                <LoadingDots />
              )}
              <span style={{ flex: 1 }}>{content}</span>
            </div>
          )
        }

        return (
          <div
            key={`${message.id}-part-${index}`}
            style={{
              padding: '1rem 2rem',
              borderRadius: '25px',
              margin: '0.5rem',
              backgroundColor:
                message.role === 'user' ? 'var(--blue-a3)' : 'var(--blue-a4)',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              gap: 8,
              width: 'fit-content',
              maxWidth: '80%',
              alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            {showLoading && index === message.parts.length - 1 && (
              <LoadingDots />
            )}
            <div style={{ flex: 1 }}>{content}</div>
          </div>
        )
      })}
    </>
  )
}
