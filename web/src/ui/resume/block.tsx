import { Container, Box, Badge } from '@radix-ui/themes'

type BlockProps = {
  readonly title: string
  readonly children?: React.ReactNode
}

export default function Block({ title, children }: BlockProps) {
  console.log()
  return (
    <Container
      style={{
        border: '1px solid #dddddd',
        borderRadius: '15px',
      }}
      p="2"
    >
      <Box mt="-8">
        <Badge size="3">{title}</Badge>
      </Box>
      <Box mt="6">{children}</Box>
    </Container>
  )
}
