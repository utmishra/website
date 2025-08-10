import * as React from 'react'
import { Box, Flex, TextArea } from '@radix-ui/themes'

const ChatThreadSelector = ({
  input,
  onChange,
  onKeyPress,
}: {
  input: string
  onChange: (value: string) => void
  onKeyPress: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void
}) => (
  <Box height="6rem" width="100%">
    <TextArea
      name="chatInput"
      placeholder="Select a chat thread or start a new one"
      value={input}
      onChange={(e) => onChange(e.target.value)}
      size="3"
      className="bg-color-white"
      onKeyUp={onKeyPress}
    />
  </Box>
)

export default ChatThreadSelector
