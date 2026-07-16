'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';

// ============================================================
// Skeleton — loading placeholder
// ============================================================

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Shape variant */
  variant?: 'text' | 'circular' | 'rectangular';
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = 'text', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'animate-pulse rounded-md bg-indigo-200/50 dark:bg-indigo-800/30',
          variant === 'circular' && 'rounded-full',
          variant === 'text' && 'h-4 w-full',
          variant === 'rectangular' && 'h-24 w-full',
          className,
        )}
        aria-hidden="true"
        {...props}
      />
    );
  },
);

Skeleton.displayName = 'Skeleton';

// ============================================================
// Convenience composable skeletons
// ============================================================

/** Skeleton for a typical card layout */
function CardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-white/20 bg-white/50 dark:bg-indigo-950/30 p-6 space-y-4',
        className,
      )}
      aria-label="Loading content"
    >
      <Skeleton variant="rectangular" className="h-40 rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-9 w-20 rounded-xl" />
        <Skeleton className="h-9 w-28 rounded-xl" />
      </div>
    </div>
  );
}

/** Skeleton for a table row */
function TableRowSkeleton({ columns = 4 }: { columns?: number }) {
  return (
    <div className="flex items-center gap-4 py-3">
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            'h-4',
            i === 0 ? 'w-1/4' : 'w-1/6',
          )}
        />
      ))}
    </div>
  );
}

/** Skeleton for user avatar + text */
function AvatarSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-3', className)} aria-label="Loading user">
      <Skeleton variant="circular" className="h-10 w-10" />
      <div className="space-y-1.5">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  );
}

export { Skeleton, CardSkeleton, TableRowSkeleton, AvatarSkeleton };
