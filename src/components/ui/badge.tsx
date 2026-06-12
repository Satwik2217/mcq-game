import * as React from 'react'
import { cn } from '@/utils/cn'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'danger' | 'warning' | 'info' | 'gold'
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold',
        {
          'bg-white/10 text-white': variant === 'default',
          'bg-green-500/20 text-green-400': variant === 'success',
          'bg-red-500/20 text-red-400': variant === 'danger',
          'bg-yellow-500/20 text-yellow-400': variant === 'warning',
          'bg-cyan-500/20 text-cyan-400': variant === 'info',
          'bg-yellow-400/20 text-yellow-300': variant === 'gold',
        },
        className,
      )}
      {...props}
    />
  )
}
