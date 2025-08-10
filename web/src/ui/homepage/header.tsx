'use client'

import React from 'react'
import { useTheme } from 'next-themes'
import { HomeIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

export const Header = () => {
  const { theme, systemTheme, setTheme } = useTheme()

  return (
    <div className="flex w-full flex-row justify-between p-5">
      <Link href="/" aria-label="Home page">
        <button className="rounded-full p-2 text-[var(--blue-12)] hover:bg-[var(--blue-4)]">
          <HomeIcon />
        </button>
      </Link>
      <button
        className="rounded-full p-2 text-[var(--blue-12)] hover:bg-[var(--blue-4)]"
        aria-label="Toggle theme"
        title="Toggle theme"
        onClick={() => {
          const resolvedTheme = theme === 'system' ? systemTheme : theme
          const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
          const newThemeMatchesSystem = newTheme === systemTheme
          setTheme(newThemeMatchesSystem ? 'system' : newTheme)
        }}
      >
        <SunIcon
          width="16"
          height="16"
          style={{ display: 'var(--theme-toggle-sun-icon-display)' }}
        />
        <MoonIcon
          width="16"
          height="16"
          style={{ display: 'var(--theme-toggle-moon-icon-display)' }}
        />
      </button>
    </div>
  )
}
