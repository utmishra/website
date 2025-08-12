'use client'

import { UIMessage, useChat } from '@ai-sdk/react'
import { memo, useEffect, useMemo, useRef, useState } from 'react'

import { ArrowUpIcon } from '@radix-ui/react-icons'
import { Button, Flex } from '@radix-ui/themes'
import InputBox from './input-box'
import { MessageBubble } from './message-bubble'
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

  const showIntro = messages.length <= 1 && status === 'ready'

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

  // Smooth scroll to bottom when messages or status change (including streaming parts)
  useEffect(() => {
    // Use requestAnimationFrame to ensure DOM updated
    const id = requestAnimationFrame(() => {
      if (bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
      } else if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      }
    })
    return () => cancelAnimationFrame(id)
  }, [derivedMessages, status])

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
        {showIntro && <IntroReveal />}
        {!showIntro &&
          derivedMessages.map((message, idx) => {
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
        <div ref={bottomRef} style={{ height: 1 }} />
      </Flex>
      <form
        onSubmit={handleInputChange}
        style={{
          position: 'fixed',
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
          style={{
            position: 'absolute',
            right: '2rem',
            bottom: '3rem',
          }}
        >
          <ArrowUpIcon />
        </Button>
      </form>
    </Flex>
  )
}

export const Chat = memo(ChatInner)
Chat.displayName = 'Chat'
