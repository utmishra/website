import { Search } from 'lucide-react'
import { Box, TextField } from '@radix-ui/themes'

export default function Search() {
  return (
    <Box mt="4">
      <TextField.Root placeholder="Ask about me…" size="3">
        <TextField.Slot>
          <Search size={16} />
        </TextField.Slot>
      </TextField.Root>
    </Box>
  )
}
