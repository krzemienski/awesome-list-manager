import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface AlertProps {
  children: ReactNode
  variant?: 'default' | 'destructive'
  className?: string
}

export function Alert({ children, variant = 'default', className }: AlertProps) {
  return (
    <div
      className={cn(
        'rounded-lg border p-4',
        variant === 'default' && 'bg-blue-50 border-blue-200 text-blue-800',
        variant === 'destructive' && 'bg-red-50 border-red-200 text-red-800',
        className
      )}
      role="alert"
    >
      {children}
    </div>
  )
}
