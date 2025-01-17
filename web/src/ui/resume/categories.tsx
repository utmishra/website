import * as NavigationMenu from '@radix-ui/react-navigation-menu'

export default function Categories() {
  return (
    <NavigationMenu.Root orientation="vertical" data-orientation="vertical">
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger data-state="open">
            About Me
          </NavigationMenu.Trigger>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger data-state="open">
            Skills
          </NavigationMenu.Trigger>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger data-state="open">
            Experience
          </NavigationMenu.Trigger>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger data-state="open">
            Education
          </NavigationMenu.Trigger>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger data-state="open">
            Certificates
          </NavigationMenu.Trigger>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  )
}
