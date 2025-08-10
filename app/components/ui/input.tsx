
'use client';

import { cn } from '../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'error';
}

export function Input({ className, variant = 'default', ...props }: InputProps) {
  return (
    <input
      className={cn(
        'flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2',
        'text-sm placeholder:text-muted focus-visible:outline-none',
        'focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent',
        'disabled:cursor-not-allowed disabled:opacity-50',
        {
          'border-red-300 focus-visible:ring-red-500': variant === 'error',
        },
        className
      )}
      {...props}
    />
  );
}
