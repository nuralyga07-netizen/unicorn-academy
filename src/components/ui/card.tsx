'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

// ============================================================
// Card variants — glassmorphism-focused
// ============================================================

const cardVariants = cva(
  'rounded-2xl border backdrop-blur-xl transition-all duration-300',
  {
    variants: {
      variant: {
        default:
          'bg-white/70 dark:bg-indigo-950/40 border-white/20 dark:border-indigo-800/30 shadow-xl shadow-black/5 dark:shadow-black/20 hover:shadow-2xl hover:shadow-indigo-500/10',
        glass:
          'bg-white/40 dark:bg-indigo-950/20 border-white/30 dark:border-indigo-800/20 shadow-lg shadow-black/5 dark:shadow-black/10 backdrop-blur-2xl hover:bg-white/50 dark:hover:bg-indigo-950/30',
        elevated:
          'bg-white dark:bg-indigo-950/60 border-gray-200/50 dark:border-indigo-800/30 shadow-2xl shadow-indigo-500/10 dark:shadow-black/30 hover:-translate-y-1',
        outline:
          'bg-transparent border-indigo-600/20 dark:border-indigo-400/20 shadow-none hover:border-indigo-600/40 dark:hover:border-indigo-400/40',
        ghost:
          'bg-transparent border-transparent shadow-none hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
    },
  },
);

// ============================================================
// Card components
// ============================================================

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, padding, className }))}
        {...props}
      >
        {children}
      </div>
    );
  },
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 mb-4', className)}
    {...props}
  >
    {children}
  </div>
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white',
      className,
    )}
    {...props}
  >
    {children}
  </h3>
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      'text-sm text-gray-500 dark:text-gray-400',
      className,
    )}
    {...props}
  >
    {children}
  </p>
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn('', className)} {...props}>
    {children}
  </div>
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center mt-4 pt-4 border-t border-gray-100 dark:border-indigo-800/30', className)}
    {...props}
  >
    {children}
  </div>
));
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants,
};
