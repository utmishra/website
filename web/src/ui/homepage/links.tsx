import { Section, Flex, Button, Text } from '@radix-ui/themes'
import Link from 'next/link'

export default function Links() {
  return (
    <Section size="1">
      <Flex gap="6" direction="row" align="center" justify="center">
        <Button size="4" radius="medium">
          <Text weight="bold">Search</Text>
        </Button>
        <Button size="4" radius="medium">
          <Link href="/resume">
            <Text weight="bold">Resume</Text>
          </Link>
        </Button>
      </Flex>
    </Section>
  )
}
