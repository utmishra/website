import { Heading } from '@radix-ui/themes'

export function Header({ title = 'New Chat' }: { title?: string }) {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        padding: '1rem',
      }}
    >
      <Heading as="h1" className="text-xl font-bold">
        {title}
      </Heading>
    </header>
  )
}
