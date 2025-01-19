import { Box, Flex, Progress, Text } from '@radix-ui/themes'

export default function Skill({
  name,
  value,
}: {
  readonly name: string
  readonly value: number
}) {
  return (
    <Flex direction="row" align="center" justify="center">
      <Box width="40%" ml="1">
        <Text align="left">{name}</Text>
      </Box>
      <Progress value={value} max={100} />
    </Flex>
  )
}
