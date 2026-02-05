import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md';
  children: React.ReactNode;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const variantStyles = {
      primary: 'bg-brand-primary/10 text-brand-primary',
      secondary: 'bg-brand-secondary/10 text-brand-secondary',
      success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
      warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
      error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
    };

    const sizeStyles = {
      sm: 'px-2 py-0.5 text-xs font-semibold',
      md: 'px-3 py-1 text-sm font-semibold',
    };

    return (
      <span
        ref={ref}
        className={cn('rounded-full whitespace-nowrap', variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
export default Badge;
