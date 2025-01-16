import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Box, TextField } from '@radix-ui/themes'

export default function Search() {
  return (
    <Box>
      <TextField.Root placeholder="Ask about me…" size="3">
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>
    </Box>
  )
}
