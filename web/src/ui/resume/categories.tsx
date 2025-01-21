'use client'

import { TabNav } from '@radix-ui/themes'

export default function Categories() {
  const scrollIntoView = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id: string,
  ) => {
    console.log(`Scrolling ${id} smoothly...`)
    event.preventDefault()

    const element = document.getElementById(id)

    console.log(`Element: ${element}`)

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
        active
      >
        About Me
      </TabNav.Link>
      <TabNav.Link href="#skills" onClick={(e) => scrollIntoView(e, 'skills')}>
        Skills
      </TabNav.Link>
      <TabNav.Link
        href="#experience"
        onClick={(e) => scrollIntoView(e, 'experience')}
      >
        Experience
      </TabNav.Link>
      <TabNav.Link
        href="#certifications"
        onClick={(e) => scrollIntoView(e, 'certifications')}
      >
        Certifications
      </TabNav.Link>
      <TabNav.Link
        href="#education"
        onClick={(e) => scrollIntoView(e, 'education')}
      >
        Education
      </TabNav.Link>
    </TabNav.Root>
  )
}
