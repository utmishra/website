import type { Metadata } from 'next'
import '@radix-ui/themes/styles.css'
import './globals.css'
import { Theme } from '@radix-ui/themes'
import { ThemeProvider } from 'next-themes'
import { Noto_Sans_Mono } from 'next/font/google'
import { Header } from '@components/ui/homepage/header'
import { cn } from '@components/lib/cn'

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          notoSansMono.className,
        )}
      >
        <ThemeProvider attribute="class" enableSystem>
          <Theme
            accentColor="blue"
            grayColor="gray"
            scaling="100%"
            radius="full"
            appearance="inherit"
          >
            <main className="min-h-screen">
              <Header />

              {children}
            </main>
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  )
}
