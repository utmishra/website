import type { Metadata } from 'next'
import '@radix-ui/themes/styles.css'
import './globals.css'
import { Theme } from '@radix-ui/themes'
import { ThemeProvider } from 'next-themes'
import { Header } from '@components/ui/homepage/header'

// Fallback to system fonts to avoid network dependency issues
const systemFontClass = 'font-mono'

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
    <html lang="en" className={systemFontClass} suppressHydrationWarning>
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
              <Header />

              {children}
            </main>
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  )
}
