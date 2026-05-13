/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export interface SoftButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  className?: string; 
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export function SoftButton({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon,
  className, 
  ...props 
}: SoftButtonProps) {
  const variants = {
    primary: 'bg-ankahe-accent hover:bg-ankahe-accent-dark text-ankahe-on-accent shadow-[0_10px_24px_color-mix(in_oklch,var(--color-accent)_16%,transparent)]',
    secondary: 'bg-ankahe-surface border border-ankahe-border text-ankahe-text hover:bg-ankahe-surface-soft',
    ghost: 'bg-transparent text-ankahe-muted hover:bg-ankahe-surface hover:text-ankahe-text',
    danger: 'bg-ankahe-danger-soft text-ankahe-danger hover:bg-ankahe-danger-soft/80 border border-ankahe-danger/25'
  };

  const sizes = {
    sm: 'min-h-11 px-4 py-2 text-sm',
    md: 'min-h-12 px-6 py-3 text-base',
    lg: 'min-h-14 px-8 py-4 text-lg'
  };

  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'group inline-flex items-center justify-center gap-3 rounded-md font-semibold leading-none transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-[var(--ease-out-expo)] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-accent focus-visible:ring-offset-2',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {icon && (
        <span className={cn(
          "flex items-center justify-center rounded transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5",
          size === 'sm' ? "w-6 h-6" : "w-8 h-8",
          variant === 'primary' ? "bg-ankahe-accent-dark/25" : "bg-ankahe-surface-soft"
        )}>
          {icon}
        </span>
      )}
    </motion.button>
  );
}
