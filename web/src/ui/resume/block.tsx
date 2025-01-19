import { Container, Box } from '@radix-ui/themes'

type BlockProps = {
  readonly title: string
  readonly children?: React.ReactNode
}

export default function Block({ children }: BlockProps) {
  return (
    <Container
      style={{
        border: '1px solid #dddddd',
        borderRadius: '15px',
      }}
      p="2"
      m="2"
    >
      <Box mt="2">{children}</Box>
    </Container>
  )
}
