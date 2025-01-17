import type { Metadata } from 'next'
import '@radix-ui/themes/styles.css'
import './globals.css'
import { Flex, Theme } from '@radix-ui/themes'
import { ThemeProvider } from 'next-themes'
import { Noto_Sans_Mono } from 'next/font/google'
import { ThemeSwitcher } from '@components/ui/homepage/theme-switcher'

const notoSansMono = Noto_Sans_Mono({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Utkarsh Mishra - Senior Full Stack Engineer',
  description: 'Personal website of Utkarsh Mishra, Senior Full Stack Engineer',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={notoSansMono.className} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" enableSystem>
          <Theme
            accentColor="blue"
            grayColor="gray"
            scaling="100%"
            radius="full"
            appearance="inherit"
          >
            <main>
              <Flex direction="row-reverse" p="4">
                <ThemeSwitcher />
              </Flex>
              {children}
            </main>
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  )
}
