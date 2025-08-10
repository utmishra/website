'use client'

import { useChat } from '@ai-sdk/react'
import { useState } from 'react'

import InputBox from './input-box'
import { Box, Button, Flex } from '@radix-ui/themes'
import { ArrowUpIcon } from '@radix-ui/react-icons'
import { MessageBubble } from './message-bubble'

export function Chat() {
  const [input, setInput] = useState<string>('')

  const { id, messages, sendMessage } = useChat()

  const handleInputChange = (
    event:
      | React.SyntheticEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLTextAreaElement>,
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

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      if (event.shiftKey) {
        // Allow new line
        return true
      } else {
        handleInputChange(event)
      }
    }
  }

  return (
    <Flex
      display="flex"
      direction="column"
      style={{ minHeight: '100%', minWidth: '100%' }}
    >
      <Flex
        px="1"
        display="flex"
        direction="column"
        overflowY="scroll"
        style={{
          height: 'calc(100dvh - 12rem)',
        }}
      >
        {messages.map((message, index) => (
          <MessageBubble key={index} message={message} />
        ))}
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
