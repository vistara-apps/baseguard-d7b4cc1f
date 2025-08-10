
'use client';

import { cn } from '../../utils/cn';
import { Shield, ShieldAlert, Clock } from 'lucide-react';

interface StatusBadgeProps {
  variant: 'verified' | 'unverified' | 'pending';
  className?: string;
}

export function StatusBadge({ variant, className }: StatusBadgeProps) {
  const config = {
    verified: {
      icon: Shield,
      text: 'Verified',
      className: 'bg-green-100 text-green-800 border-green-200'
    },
    unverified: {
      icon: ShieldAlert,
      text: 'Unverified',
      className: 'bg-red-100 text-red-800 border-red-200'
    },
    pending: {
      icon: Clock,
      text: 'Pending',
      className: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    }
  };

  const { icon: Icon, text, className: variantClassName } = config[variant];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-1 rounded-sm text-caption font-medium border',
        variantClassName,
        className
      )}
    >
      <Icon size={12} />
      {text}
    </span>
  );
}
