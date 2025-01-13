import Head from '@components/ui/homepage/head'
import Links from '@components/ui/homepage/links'
import Search from '@components/ui/homepage/search'

import { Flex, Card } from '@radix-ui/themes'

export default function Home() {
  return (
    <Flex
      height="750px"
      align="center"
      direction="column"
      justify="center"
      gap="2"
    >
      <Card size="4">
        <Head />
        <Search />
        <Links />
      </Card>
    </Flex>
  )
}
