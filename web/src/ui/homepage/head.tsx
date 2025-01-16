import { Heading, Flex, Avatar, Text, Section, Box } from '@radix-ui/themes'
import { Social } from './social'

export default function Head() {
  return (
    <Flex
      direction={{
        xl: 'row',
        md: 'column',
        sm: 'column',
        xs: 'column',
      }}
      align={{
        xl: 'center',
        md: 'start',
        sm: 'start',
        xs: 'start',
      }}
      gap={{
        xl: '4',
        md: '2',
        sm: '2',
        xs: '0',
      }}
    >
      <Box as="div">
        <Avatar src="/utmishra.jpeg" size="9" radius="full" fallback={''} />
      </Box>
      <Flex direction="column" align="start" justify="center" gap="2">
        <Heading as="h1" size="9" weight="regular">
          Utkarsh Mishra
        </Heading>
        <Heading as="h2" size="6" weight="regular">
          Senior Full Stack Engineer
        </Heading>
        <Text>Zurich, Switzerland</Text>
        <Social />
      </Flex>
    </Flex>
  )
}
