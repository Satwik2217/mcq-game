import * as React from 'react'
import { cn } from '@/utils/cn'

interface ProgressProps {
  value: number
  max?: number
  className?: string
  barClassName?: string
  color?: string
}

export function Progress({ value, max = 100, className, barClassName, color }: ProgressProps) {
  const pct = Math.min(Math.max((value / max) * 100, 0), 100)
  return (
    <div className={cn('w-full h-2 bg-white/10 rounded-full overflow-hidden', className)}>
      <div
        className={cn('h-full rounded-full transition-all duration-500 ease-out', barClassName)}
        style={{ width: `${pct}%`, background: color ?? undefined }}
      />
    </div>
  )
}
