import IdCard from '@components/ui/homepage/id-card'
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
      height="calc(100vh - 40px)"
      p="2"
    >
      <Card
        size={{
          xl: '5',
          md: '5',
          sm: '3',
          xs: '1',
          initial: '1',
        }}
      >
        <IdCard />
        {/* <Search /> */}
        <Links />
      </Card>
    </Flex>
  )
}
