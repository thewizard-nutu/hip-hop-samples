import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string;
  height?: string;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, width = 'w-full', height = 'h-4', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700',
        width,
        height,
        className
      )}
      {...props}
    />
  )
);

Skeleton.displayName = 'Skeleton';
export default Skeleton;
