import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import {
  Flex,
  Box,
  Heading,
  Section,
  TextField,
  Text,
  Button,
} from '@radix-ui/themes'

export default function Home() {
  return (
    <Flex
      height="750px"
      align="center"
      direction="column"
      justify="center"
      gap="2"
    >
      <Box height="300px" width="750px">
        <Section id="search">
          <Flex direction="column" align="center" justify="center" gap="2">
            <Heading as="h1" size="9" weight="regular">
              Utkarsh Mishra
            </Heading>
            <Heading as="h2" size="6" weight="regular">
              Senior Full Stack Engineer
            </Heading>

            <Box width="400px">
              <TextField.Root placeholder="Ask about me…" m="2" size="3">
                <TextField.Slot>
                  <MagnifyingGlassIcon height="16" width="16" />
                </TextField.Slot>
              </TextField.Root>
            </Box>
            <Flex gap="2" direction="row" align="center">
              <Button size="4" radius="large">
                <Text weight="bold">Search</Text>
              </Button>
              <Button size="4" radius="large">
                <Text weight="bold">Resume</Text>
              </Button>
            </Flex>
          </Flex>
        </Section>
      </Box>
    </Flex>
  )
}
