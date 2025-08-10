
'use client';

import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'default';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ 
  className, 
  variant = 'default', 
  size = 'md',
  ...props 
}: ButtonProps) {
  return (
    <button
      className={cn(
        // Base styles
        'inline-flex items-center justify-center rounded-md font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        'disabled:pointer-events-none disabled:opacity-50',
        
        // Variants
        {
          'bg-primary text-white hover:bg-primary/90': variant === 'primary',
          'bg-surface border border-gray-200 hover:bg-gray-50': variant === 'secondary',
          'bg-gray-100 hover:bg-gray-200': variant === 'default',
        },
        
        // Sizes
        {
          'h-8 px-3 text-sm': size === 'sm',
          'h-10 px-4': size === 'md',
          'h-12 px-6 text-lg': size === 'lg',
        },
        
        className
      )}
      {...props}
    />
  );
}
