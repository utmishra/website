'use client'

import React from 'react'
import { useTheme } from 'next-themes'
import { HomeIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { Flex, IconButton, Link, Tooltip } from '@radix-ui/themes'

export const Header = () => {
  const { theme, systemTheme, setTheme } = useTheme()

  return (
    <Flex
      direction="row"
      p="20px"
      width="100%"
      style={{ justifyContent: 'space-between' }}
    >
      <Link href="/">
        <IconButton
          size="4"
          variant="ghost"
          color="gray"
          aria-label="Home page"
        >
          <HomeIcon></HomeIcon>
        </IconButton>
      </Link>
      <Tooltip
        align="end"
        className="radix-themes-custom-fonts position"
        content="Toggle theme"
      >
        <IconButton
          size="4"
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
    </Flex>
  )
}
