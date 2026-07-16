'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';
import { User } from 'lucide-react';

// ============================================================
// Avatar with initials fallback
// ============================================================

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** URL of the avatar image */
  src?: string | null;
  /** Alt text for the image */
  alt?: string;
  /** Name used to generate initials fallback */
  name?: string | null;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Border style */
  bordered?: boolean;
  /** Show online status indicator */
  status?: 'online' | 'offline' | 'away';
}

const sizeMap = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-lg',
  xl: 'h-20 w-20 text-2xl',
};

const statusDotMap = {
  online: 'bg-emerald-500',
  offline: 'bg-gray-400',
  away: 'bg-amber-500',
};

/**
 * Get initials from a name string.
 * "John Doe" → "JD", "john" → "J", "" → "?"
 */
function getInitials(name?: string | null): string {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0]![0]?.toUpperCase() ?? '?';
  return (
    (parts[0]?.[0] ?? '') + (parts[parts.length - 1]?.[0] ?? '')
  ).toUpperCase();
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt = '',
      name,
      size = 'md',
      bordered = false,
      status,
      className,
      ...props
    },
    ref,
  ) => {
    const [imgError, setImgError] = React.useState(false);
    const hasImage = !!src && !imgError;

    return (
      <div
        ref={ref}
        className={cn(
          'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full',
          'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-semibold',
          sizeMap[size],
          bordered &&
            'ring-2 ring-white dark:ring-indigo-900 shadow-md',
          className,
        )}
        {...props}
      >
        {/* Image */}
        {hasImage ? (
          <img
            src={src}
            alt={alt || name || 'Avatar'}
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : name ? (
          /* Initials fallback */
          <span aria-hidden="true">{getInitials(name)}</span>
        ) : (
          /* Generic user icon fallback */
          <User className="h-1/2 w-1/2 text-indigo-400 dark:text-indigo-500" aria-hidden="true" />
        )}

        {/* Status indicator dot */}
        {status && (
          <span
            className={cn(
              'absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white dark:ring-indigo-900',
              statusDotMap[status],
            )}
            aria-label={status}
          />
        )}
      </div>
    );
  },
);

Avatar.displayName = 'Avatar';

export { Avatar };
