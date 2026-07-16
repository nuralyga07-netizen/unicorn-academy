'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

// ============================================================
// Badge variants
// ============================================================

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full px-3 py-0.5 text-xs font-semibold transition-colors duration-200 whitespace-nowrap select-none',
  {
    variants: {
      variant: {
        default:
          'bg-indigo-600/10 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300 border border-indigo-600/20 dark:border-indigo-500/20',
        primary:
          'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20',
        secondary:
          'bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300 border border-emerald-500/20 dark:border-emerald-500/20',
        success:
          'bg-emerald-500 text-white shadow-sm shadow-emerald-500/20',
        warning:
          'bg-amber-500/10 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300 border border-amber-500/20 dark:border-amber-500/20',
        danger:
          'bg-rose-500/10 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300 border border-rose-500/20 dark:border-rose-500/20',
        outline:
          'bg-transparent text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600',
        ghost:
          'bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800',
      },
      size: {
        sm: 'px-2 py-0 text-[10px]',
        md: 'px-3 py-0.5 text-xs',
        lg: 'px-4 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Make badge a pill shape (default: true) */
  pill?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, pill = true, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          badgeVariants({ variant, size, className }),
          !pill && 'rounded-md',
        )}
        {...props}
      >
        {children}
      </span>
    );
  },
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };
