'use client'

import React from 'react'
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { IconButton, Tooltip } from '@radix-ui/themes'

export const ThemeSwitcher = () => {
  const { theme, systemTheme, setTheme } = useTheme()

  return (
    <Tooltip
      align="end"
      className="radix-themes-custom-fonts position"
      content="Toggle theme"
    >
      <IconButton
        size="3"
        variant="ghost"
        color="gray"
        aria-label="Toggle theme"
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
      </IconButton>
    </Tooltip>
  )
}
