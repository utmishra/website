import * as React from 'react'

import { cn } from '@components/utils/cn'

export type CardProps = React.HTMLAttributes<HTMLDivElement>

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border bg-background p-4 shadow',
        className,
      )}
      {...props}
    />
  )
}

