import {
  EnvelopeOpenIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
} from '@radix-ui/react-icons'
import Link from 'next/link'
import type { ComponentType, SVGProps } from 'react'

const socialData: {
  id: string
  name: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
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
    <div className="mt-2 mb-2 flex flex-row items-center justify-start gap-4">
      {socialData.map((data) => (
        <Link
          key={data.id}
          href={data.url}
          target="_blank"
          aria-label={`External link to ${data.name} profile`}
        >
          <button
            className="rounded-full border p-2 hover:bg-[var(--blue-4)]"
            aria-label={`${data.name} button`}
          >
            <data.icon />
          </button>
        </Link>
      ))}
    </div>
  )
}
