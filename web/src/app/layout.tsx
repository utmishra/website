import type { Metadata } from 'next'
import '@radix-ui/themes/styles.css'
import './globals.css'
import { Theme } from '@radix-ui/themes'
import { ThemeProvider } from 'next-themes'
import { Cormorant, Noto_Serif, Noto_Sans_Mono } from 'next/font/google'

const cormorant = Cormorant({
  subsets: ['latin'],
  display: 'swap',
})

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  display: 'swap',
})

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
            <main>{children}</main>
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  )
}
