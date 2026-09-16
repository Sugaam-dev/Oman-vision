import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type BadgeVariant = 
  | 'blue' 
  | 'green' 
  | 'orange' 
  | 'purple' 
  | 'red' 
  | 'slate' 
  | 'teal'
  | 'outline';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'blue',
  size = 'md',
  className
}) => {
  const variantStyles: Record<BadgeVariant, string> = {
    blue: 'bg-blue-50 text-blue-700 border border-blue-200',
    green: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    orange: 'bg-amber-50 text-amber-700 border border-amber-200',
    purple: 'bg-purple-50 text-purple-700 border border-purple-200',
    red: 'bg-rose-50 text-rose-700 border border-rose-200',
    slate: 'bg-slate-100 text-slate-700 border border-slate-200',
    teal: 'bg-teal-50 text-teal-700 border border-teal-200',
    outline: 'bg-transparent text-slate-600 border border-slate-300'
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 font-medium rounded-full',
    md: 'text-xs px-2.5 py-1 font-medium rounded-full'
  };

  return (
    <span className={twMerge(clsx('inline-flex items-center gap-1 leading-none font-medium', sizeStyles[size], variantStyles[variant], className))}>
      {children}
    </span>
  );
};

export const StatusBadge: React.FC<{ status: string; size?: 'sm' | 'md'; className?: string }> = ({
  status,
  size = 'md',
  className
}) => {
  let variant: BadgeVariant = 'slate';
  const s = status.toLowerCase();

  if (s.includes('deliver') || s.includes('active') || s.includes('awarded') || s.includes('preferred')) {
    variant = 'green';
  } else if (s.includes('confirm') || s.includes('in stock')) {
    variant = 'green';
  } else if (s.includes('fulfillment') || s.includes('transit') || s.includes('on order') || s.includes('quotes')) {
    variant = 'orange';
  } else if (s.includes('processing') || s.includes('draft') || s.includes('under review')) {
    variant = 'blue';
  } else if (s.includes('cancel') || s.includes('inactive') || s.includes('suspended')) {
    variant = 'red';
  } else if (s.includes('os approved') || s.includes('admin') || s.includes('manager')) {
    variant = 'purple';
  }

  return (
    <Badge variant={variant} size={size} className={className}>
      {status}
    </Badge>
  );
};
