'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Label text displayed above the input */
  label?: string;
  /** Error message displayed below the input */
  error?: string;
  /** Helper text displayed below the input */
  helperText?: string;
  /** Make the label visually required (adds asterisk) */
  required?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      label,
      error,
      helperText,
      id,
      required,
      disabled,
      ...props
    },
    ref,
  ) => {
    const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'mb-1.5 block text-sm font-medium',
              error
                ? 'text-rose-600 dark:text-rose-400'
                : 'text-gray-700 dark:text-gray-300',
              disabled && 'opacity-50',
            )}
          >
            {label}
            {required && (
              <span className="ml-1 text-rose-500" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        {/* Input wrapper */}
        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            type={type}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            className={cn(
              // Base styles
              'flex h-12 w-full rounded-xl border-2 px-4 py-2 text-base bg-white/80 dark:bg-indigo-950/40',
              'placeholder:text-gray-400 dark:placeholder:text-gray-500',
              'transition-all duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              // Disabled
              'disabled:cursor-not-allowed disabled:opacity-50',
              // File input
              'file:border-0 file:bg-transparent file:text-sm file:font-medium',
              // Variants by error state
              error
                ? 'border-rose-300 dark:border-rose-700 focus-visible:border-rose-500 focus-visible:ring-rose-500/30'
                : 'border-gray-200 dark:border-indigo-800/40 focus-visible:border-indigo-500 focus-visible:ring-indigo-500/30 hover:border-gray-300 dark:hover:border-indigo-700/50',
              className,
            )}
            {...props}
          />
        </div>

        {/* Error message */}
        {error && (
          <p
            id={errorId}
            role="alert"
            className="mt-1.5 text-sm text-rose-600 dark:text-rose-400"
          >
            {error}
          </p>
        )}

        {/* Helper text */}
        {helperText && !error && (
          <p
            id={helperId}
            className="mt-1.5 text-sm text-gray-500 dark:text-gray-400"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };
