import type { UIMessage } from '@ai-sdk/react'
import { renderMessagePart } from './message-part-renderers'
import { memo } from 'react'
import { motion } from 'motion/react'

export const LoadingDots = memo(function LoadingDots() {
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
LoadingDots.displayName = 'LoadingDots'

interface MessageBubbleProps {
  message: UIMessage
  showLoading?: boolean
}

// Signature helper for shallow-ish comparison (tracks part counts & text lengths)
// Derive a simple signature for memo compare. The SDK doesn't export a granular part type.
const signature = (m: UIMessage) =>
  m.parts
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Generic library part shape
    .map(
      (p: any) =>
        `${(p as any).type}:${
          typeof (p as any).text === 'string' ? (p as any).text.length : ''
        }`,
    )
    .join('|')

const MessageBubbleInner = ({ message, showLoading }: MessageBubbleProps) => {
  return (
    <>
  {message.parts.map((part, index) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- external lib message part
        const content = renderMessagePart(part as any, index)
        if (!content) return null
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- external lib message part
        const type = (part as any).type as string | undefined
        const isMeta =
          (!!type &&
            (type === 'reasoning' ||
              type === 'dynamic-tool' ||
              type.startsWith?.('tool-'))) ||
          type === 'step-start'

        if (isMeta) {
          const isReasoning = type === 'reasoning'
          const isToolLine = !!type && type.startsWith?.('tool-')
          // Inline dots removed; they now appear in their own line below all parts.
          const showDotsHere = false
          return (
            <motion.div
              key={`${message.id}-meta-${index}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
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
              <span style={{ flex: 1 }}>{content}</span>
            </motion.div>
          )
        }

        return (
          <motion.div
            key={`${message.id}-part-${index}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
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
            <div style={{ flex: 1 }}>{content}</div>
          </motion.div>
        )
      })}
      {showLoading && message.role !== 'user' && (
        <motion.div
          key={`${message.id}-loading`}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            margin: '0.25rem 0.75rem',
            fontSize: '0.7rem',
            lineHeight: 1.2,
            color: 'var(--gray-11)',
            maxWidth: '70ch',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <LoadingDots />
        </motion.div>
      )}
    </>
  )
}
MessageBubbleInner.displayName = 'MessageBubbleInner'

export const MessageBubble = memo(
  MessageBubbleInner,
  (prev, next) =>
    prev.showLoading === next.showLoading &&
    prev.message.id === next.message.id &&
    signature(prev.message) === signature(next.message),
)
MessageBubble.displayName = 'MessageBubble'
