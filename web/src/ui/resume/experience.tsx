import { generateId } from '@components/utils/component'
import {
  Container,
  Box,
  Strong,
  Separator,
  Text,
  Flex,
  Link,
} from '@radix-ui/themes'
import Image from 'next/image'

export type ExperienceProps = {
  readonly title: string
  readonly company: {
    readonly logo: string
    readonly name: string
    readonly url: string
  }
  readonly start: {
    readonly month: string
    readonly year: string
  }
  readonly end: {
    readonly month: string
    readonly year: string
  }
  readonly location: string
  readonly description: readonly string[]
}

export default function Experience(props: ExperienceProps) {
  return (
    <Container>
      <Flex
        direction={{
          xl: 'row',
          md: 'row',
          initial: 'column',
        }}
        gap="2"
      >
        <Strong>{props.title}</Strong>
        <Separator size="2" orientation="vertical" />
        <Image
          width={15}
          height={15}
          src={`/${props.company.logo}`}
          alt={props.company.name}
          style={{ marginTop: '5px' }}
        />
        <Link href={props.company.url}>{props.company.name}</Link>
        <Separator size="2" orientation="vertical" />
        <Text>{props.location}</Text>
        <Separator size="2" orientation="vertical" />
        <Text>
          {props.start.month} {props.start.year} - {props.end.month}{' '}
          {props.end.year}
        </Text>
      </Flex>
      <Separator size="4" />
      <Box>
        <ul>
          {props.description.map((item) => (
            <li key={generateId(item)}>{item}</li>
          ))}
        </ul>
      </Box>
    </Container>
  )
}
