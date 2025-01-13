import { Section, Flex, Button, Text } from '@radix-ui/themes'

export default function Links() {
  return (
    <Section size="1">
      <Flex gap="6" direction="row" align="center" justify="center">
        <Button size="4" radius="medium">
          <Text weight="bold">Search</Text>
        </Button>
        <Button size="4" radius="medium">
          <Text weight="bold">Resume</Text>
        </Button>
      </Flex>
    </Section>
  )
}
