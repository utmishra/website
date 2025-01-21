import {
  EnvelopeOpenIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
} from '@radix-ui/react-icons'
import { Flex, IconButton, type IconProps } from '@radix-ui/themes'
import Link from 'next/link'

const socialData: {
  id: string
  name: string
  icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >
  url: string
}[] = [
  {
    id: 'github',
    name: 'Github',
    icon: GitHubLogoIcon,
    url: 'https://github.com/utmishra',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: LinkedInLogoIcon,
    url: 'https://www.linkedin.com/in/utmishra/',
  },
  {
    id: 'email',
    name: 'Email',
    icon: EnvelopeOpenIcon,
    url: 'mailto:utmishra@gmail.com',
  },
]

export function Social() {
  return (
    <Flex
      direction="row"
      align={{
        xl: 'start',
        md: 'start',
        sm: 'center',
        xs: 'center',
        initial: 'center',
      }}
      justify="start"
      gap="4"
      mt="2"
      mb="2"
    >
      {socialData.map((data) => (
        <Link key={data.id} href={data.url} target="_blank">
          <IconButton size="2" variant="surface">
            <data.icon />
          </IconButton>
        </Link>
      ))}
    </Flex>
  )
}
