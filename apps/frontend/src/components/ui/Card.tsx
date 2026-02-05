import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variantStyles = {
      default: 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800',
      elevated: 'bg-white dark:bg-gray-900 shadow-lg',
      outlined: 'bg-transparent border-2 border-brand-primary',
    };

    return (
      <div
        ref={ref}
        className={cn('rounded-lg p-4', variantStyles[variant], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
export default Card;
