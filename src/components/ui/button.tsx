import * as React from 'react'
import { cn } from '@/utils/cn'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost' | 'outline' | 'premium'
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function Button({ className, variant = 'default', size = 'md', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 cursor-pointer select-none',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'active:scale-95',
        {
          'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/25': variant === 'default',
          'bg-transparent text-white hover:bg-white/10': variant === 'ghost',
          'border-2 border-white/20 text-white hover:border-white/40 bg-transparent': variant === 'outline',
          'bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:shadow-lg hover:shadow-yellow-500/25 font-bold': variant === 'premium',
        },
        {
          'px-4 py-1.5 text-sm': size === 'sm',
          'px-6 py-2.5 text-base': size === 'md',
          'px-8 py-3.5 text-lg': size === 'lg',
          'px-10 py-4 text-xl': size === 'xl',
        },
        className,
      )}
      {...props}
    />
  )
}
