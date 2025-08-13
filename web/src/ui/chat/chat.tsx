'use client'

import { UIMessage, useChat } from '@ai-sdk/react'
import { memo, useEffect, useMemo, useRef, useState } from 'react'

import { ArrowUpIcon } from '@radix-ui/react-icons'
import { Button, Flex } from '@radix-ui/themes'
import InputBox from './input-box'
import { MessageBubble, LoadingDots } from './message-bubble'
import { IntroReveal } from './intro-reveal'

function ChatInner() {
  const [input, setInput] = useState<string>('')

  const { id, messages, sendMessage, status, error } = useChat()

  const handleInputChange = (
    event: React.SyntheticEvent | React.KeyboardEvent,
  ) => {
    event.preventDefault()
    if (!input.trim()) return // Prevent sending empty messages
    sendMessage({
      id,
      role: 'user',
      parts: [{ type: 'text', text: input }],
    })
    setInput('')
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (event.shiftKey) {
        // Allow new line
        return true
      } else {
        handleInputChange(event)
      }
    }
  }

  // Determine presence of user / assistant messages (excluding any synthetic error addition later)
  const hasUserMessage = messages.some((m) => m.role === 'user')
  const hasAssistantMessage = messages.some((m) => m.role === 'assistant')

  // Show intro at the very top only before the first user message is sent
  const showIntroTop = !hasUserMessage && status === 'ready'
  // After the first user message but before assistant starts streaming / responding, show intro
  // inline as a placeholder for the upcoming assistant reply (left aligned at bottom)
  const showIntroInline =
    hasUserMessage && !hasAssistantMessage && status === 'ready'

  const derivedMessages: UIMessage[] = useMemo(() => {
    if (status === 'error' && error) {
      return [
        ...messages,
        {
          id: `${Date.now()}-error`,
          role: 'assistant',
          parts: [
            {
              type: 'text',
              text: `⚠️ Error: ${error.message || 'Something went wrong.'}`,
            },
          ],
        } as UIMessage,
      ]
    }
    return messages
  }, [messages, status, error])

  const scrollRef = useRef<HTMLDivElement | null>(null)
  const bottomRef = useRef<HTMLDivElement | null>(null)
  const [showScrollIcon, setShowScrollIcon] = useState(false)

  // Show scroll-to-bottom icon if not at bottom
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
      setShowScrollIcon(scrollTop + clientHeight < scrollHeight - 40)
    }
    const ref = scrollRef.current
    if (ref) {
      ref.addEventListener('scroll', handleScroll)
      handleScroll()
    }
    return () => {
      if (ref) ref.removeEventListener('scroll', handleScroll)
    }
  }, [derivedMessages])

  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    } else if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }

  return (
    <Flex
      display="flex"
      direction="column"
      style={{ minHeight: '100%', minWidth: '100%' }}
    >
      <Flex
        ref={scrollRef}
        px="1"
        display="flex"
        direction="column"
        overflowY="scroll"
        style={{
          height: 'calc(100dvh - 12rem)',
        }}
      >
        {showIntroTop && <IntroReveal key="intro-top" />}
        {derivedMessages.map((message, idx) => {
          // Create a stable unique key including part count + last part type
          const last = message.parts[message.parts.length - 1]
          const lastType =
            (last as { type?: string } | undefined)?.type || 'none'
          const structuralKey = `${message.id}-${message.parts.length}-${lastType}`
          return (
            <MessageBubble
              key={structuralKey}
              message={message}
              showLoading={
                idx === derivedMessages.length - 1 && // only last bubble
                status !== 'ready' &&
                status !== 'error'
              }
            />
          )
        })}
        {showIntroInline && <IntroReveal key="intro-inline" />}
        {/* Placeholder loading dots after first user message while waiting for assistant start */}
        {hasUserMessage &&
          !hasAssistantMessage &&
          status !== 'error' &&
          status !== 'ready' && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                margin: '0.25rem 0.75rem',
                fontSize: '0.7rem',
                color: 'var(--gray-11)',
                maxWidth: '70ch',
              }}
            >
              <LoadingDots />
            </div>
          )}
        <div ref={bottomRef} style={{ height: 1 }} />
      </Flex>
      <div
        style={{ position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 10 }}
      >
        {/* Floating scroll-to-bottom icon centered above input */}
        {showScrollIcon && (
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              position: 'absolute',
              bottom: '7.5rem',
              zIndex: 20,
            }}
          >
            <Button
              size="3"
              variant="soft"
              style={{
                borderRadius: '50%',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                background: 'var(--blue-1)',
                color: 'white',
                transition: 'opacity 0.3s',
                opacity: showScrollIcon ? 1 : 0,
              }}
              onClick={scrollToBottom}
              aria-label="Scroll to bottom"
            >
              <ArrowUpIcon style={{ transform: 'rotate(180deg)' }} />
            </Button>
          </div>
        )}
        <form
          onSubmit={handleInputChange}
          style={{
            position: 'relative',
            left: 0,
            right: 0,
            bottom: 0,
            padding: '1rem',
            paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
          }}
        >
          <InputBox
            input={input}
            onChange={setInput}
            onKeyPress={handleKeyPress}
          />
          <Button
            size="4"
            type="submit"
            disabled={status !== 'ready' && status !== 'error'}
            style={{
              position: 'absolute',
              right: '2rem',
              bottom: '3rem',
              opacity: status !== 'ready' && status !== 'error' ? 0.5 : 1,
              pointerEvents:
                status !== 'ready' && status !== 'error' ? 'none' : 'auto',
              transition: 'opacity 0.2s ease',
            }}
          >
            <ArrowUpIcon />
          </Button>
        </form>
      </div>
    </Flex>
  )
}

export const Chat = memo(ChatInner)
Chat.displayName = 'Chat'
