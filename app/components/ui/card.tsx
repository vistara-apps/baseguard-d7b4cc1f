
'use client';

import { cn } from '../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export function Card({ children, className, title }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg bg-surface p-4 shadow-card border border-gray-100',
        className
      )}
    >
      {title && (
        <h3 className="text-heading mb-3">{title}</h3>
      )}
      {children}
    </div>
  );
}
