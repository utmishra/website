import * as React from 'react'

import { cn } from '@components/lib/cn'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center gap-2 rounded-md bg-[var(--blue-9)] px-4 py-2 text-sm font-medium text-[var(--blue-contrast)] hover:bg-[var(--blue-10)]',
        className,
      )}
      {...props}
    />
  )
}
