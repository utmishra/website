'use client'

import { UIMessage } from 'ai'
import { useState } from 'react'

import InputBox from './input-box'
import { Button, Flex } from '@radix-ui/themes'
import { ArrowUp } from 'lucide-react'
import { MessageBubble } from './message-bubble'

export function Chat() {
  const [input, setInput] = useState<string>('')

  // const { messages, sendMessage } = useChat()
  const messages: UIMessage[] = [
    {
      id: '1',
      role: 'user',
      parts: [{ type: 'text', text: 'Hello!' }],
    },
    {
      id: '2',
      role: 'assistant',
      parts: [{ type: 'text', text: 'Hi there! How can I help you today?' }],
    },
  ]

  const handleInputChange = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!input.trim()) return // Prevent sending empty messages
    // sendMessage({
    //   role: 'user',
    //   parts: [{ type: 'text', text: input }],
    // })
    setInput('')
  }

  return (
    <Flex
      display="flex"
      direction="column"
      style={{ minHeight: '100%', minWidth: '100%' }}
    >
      <Flex px="4" display="flex" direction="column">
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
        <InputBox input={input} onChange={setInput} />
        <Button
          size="4"
          type="submit"
          style={{
            position: 'absolute',
            right: '2rem',
            bottom: '3rem',
          }}
        >
          <ArrowUp />
        </Button>
      </form>
    </Flex>
  )
}
