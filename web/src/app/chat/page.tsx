import { Chat } from '@components/ui/chat/chat'
import { Header } from '@components/ui/chat/header'
import { Flex } from '@radix-ui/themes'

export default function ChatPage() {
  return (
    <Flex
      display="flex"
      direction="column"
      style={{
        flex: '1 1 auto',
        minHeight: 0,
        overflow: 'hidden',
        minWidth: '100%',
      }}
    >
      <Chat />
    </Flex>
  )
}
