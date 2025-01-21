import { Container, Box, Badge } from '@radix-ui/themes'
import { ReactNode } from 'react'

type BlockProps = {
  readonly id: string
  readonly title: string
  readonly children: ReactNode
}

export default function Block({ id, title, children }: BlockProps) {
  return (
    <Container
      id={id}
      align={{ initial: 'center', sm: 'left', xs: 'left' }}
      style={{ width: '100%' }}
    >
      <Badge size="3" m="2">
        {title}
      </Badge>
      <Container
        style={{
          border: '1px solid #dddddd',
          borderRadius: '15px',
        }}
        p="2"
        m="2"
      >
        <Box mt="2" mb="2">
          {children}
        </Box>
      </Container>
    </Container>
  )
}
