import { FileTextIcon, PersonIcon } from '@radix-ui/react-icons'
import { Section, Flex, Button, Text } from '@radix-ui/themes'
import Link from 'next/link'

export default function Links() {
  return (
    <Section size="1">
      <Flex gap="6" direction="row" align="center" justify="center">
        {/* <Button size="4" radius="medium">
          <Text weight="bold">Search</Text>
        </Button> */}
        <Link href="/resume">
          <Button size="4" radius="medium" aria-label="View Resume">
            <PersonIcon />
            <Text weight="bold">About Me</Text>
          </Button>
        </Link>
        <Link
          href="https://rdkwr3shxcvpilqn.public.blob.vercel-storage.com/documents/Utkarsh%20Mishra%20-%20Senior%20Full%20Stack%20Developer%20Resume-wwNjOr6X5BkykUtNIZAawEFP5q16fS.pdf"
          rel="noopener noreferrer"
          download
          target="_blank"
        >
          <Button size="4" radius="medium" aria-label="Download Resume">
            <FileTextIcon />
            <Text weight="bold">Resume</Text>
          </Button>
        </Link>
      </Flex>
    </Section>
  )
}
