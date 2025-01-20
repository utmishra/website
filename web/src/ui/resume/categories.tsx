import { TabNav } from '@radix-ui/themes'

export default function Categories() {
  return (
    <TabNav.Root id="categories">
      <TabNav.Link href="#" active>
        About Me
      </TabNav.Link>
      <TabNav.Link href="#">Skills</TabNav.Link>
      <TabNav.Link href="#">Experience</TabNav.Link>
      <TabNav.Link href="#">Certifications</TabNav.Link>
      <TabNav.Link href="#">Education</TabNav.Link>
    </TabNav.Root>
  )
}
