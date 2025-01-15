import Head from '@components/ui/homepage/head'
import Links from '@components/ui/homepage/links'
import Search from '@components/ui/homepage/search'

import { Flex, Card } from '@radix-ui/themes'

export default function Home() {
  return (
    <Flex
      align="center"
      direction="column"
      justify="center"
      gap="2"
      width="100vw"
      height="100vh"
      p="2"
    >
      <Card
        size={{
          xl: '5',
          md: '4',
          sm: '3',
          xs: '1',
        }}
      >
        <Head />
        <Search />
        <Links />
      </Card>
    </Flex>
  )
}
