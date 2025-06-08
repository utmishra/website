'use client'

import { TabNav } from '@radix-ui/themes'
import { BlockId } from './types'

export default function Categories({
  activeClass,
}: {
  readonly activeClass: BlockId
}) {
  const scrollIntoView = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id: string,
  ) => {
    event.preventDefault()

    const element = document.getElementById(id)

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <TabNav.Root
      id="categories"
      style={{
        position: 'fixed',
        top: '10%',
      }}
    >
      <TabNav.Link
        href="#about-me"
        onClick={(e) => scrollIntoView(e, 'about-me')}
        active={activeClass === BlockId.ABOUT_ME}
      >
        About Me
      </TabNav.Link>
      <TabNav.Link
        href="#skills"
        onClick={(e) => scrollIntoView(e, 'skills')}
        active={activeClass === BlockId.SKILLS}
      >
        Skills
      </TabNav.Link>
      <TabNav.Link
        href="#experience"
        onClick={(e) => scrollIntoView(e, 'experience')}
        active={activeClass === BlockId.EXPERIENCE}
      >
        Experience
      </TabNav.Link>
      <TabNav.Link
        href="#qualification"
        onClick={(e) => scrollIntoView(e, 'qualifications')}
        active={activeClass === BlockId.QUALIFICATIONS}
      >
        Qualifications
      </TabNav.Link>
    </TabNav.Root>
  )
}
