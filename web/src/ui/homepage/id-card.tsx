import { Heading, Flex, Text, Box } from '@radix-ui/themes'
import { Social } from './social'
import Image from 'next/image'

export default function IdCard() {
  return (
    <Flex
      direction={{
        xl: 'row',
        md: 'row',
        sm: 'column',
        xs: 'column',
        initial: 'column',
      }}
      align={{
        xl: 'start',
        md: 'start',
        sm: 'center',
        xs: 'center',
        initial: 'center',
      }}
      justify={{
        xl: 'start',
        md: 'center',
        sm: 'center',
        xs: 'center',
        initial: 'center',
      }}
      gap={{
        xl: '4',
        md: '2',
        sm: '2',
        xs: '0',
        initial: '0',
      }}
      className="id-card"
    >
      <Box as="div" p="4">
        <Image
          src="/utmishra.webp"
          alt="Utkarsh Mishra's avatar"
          width="160"
          height="160"
          style={{ borderRadius: '50%' }}
        />
      </Box>
      <Flex
        direction="column"
        align={{
          xl: 'start',
          md: 'start',
          sm: 'center',
          xs: 'center',
          initial: 'center',
        }}
        justify={{
          xl: 'start',
          md: 'start',
          sm: 'center',
          xs: 'center',
          initial: 'center',
        }}
        gap="2"
      >
        <Heading
          as="h1"
          size={{
            xl: '9',
            md: '8',
            sm: '7',
            xs: '6',
            initial: '5',
          }}
          weight="regular"
        >
          Utkarsh Mishra
        </Heading>
        <Heading
          as="h2"
          size={{
            xl: '6',
            md: '5',
            sm: '4',
            xs: '3',
            initial: '3',
          }}
          weight="regular"
        >
          Senior Full Stack Engineer
        </Heading>
        <Text>Zurich, Switzerland</Text>
        <Social />
      </Flex>
    </Flex>
  )
}
