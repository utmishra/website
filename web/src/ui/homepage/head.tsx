import { Heading, Flex, Section } from '@radix-ui/themes'

export default function Head() {
  return (
    <Section size="1">
      <Flex direction="column" align="center" justify="center" gap="2">
        <Heading as="h1" size="9" weight="regular">
          Utkarsh Mishra
        </Heading>
        <Heading as="h2" size="6" weight="regular">
          Senior Full Stack Engineer
        </Heading>
      </Flex>
    </Section>
  )
}
