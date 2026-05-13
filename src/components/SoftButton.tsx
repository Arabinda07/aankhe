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
    primary: 'bg-ankahe-accent hover:bg-ankahe-accent-dark text-ankahe-on-accent',
    secondary: 'bg-ankahe-surface border border-ankahe-border text-ankahe-text hover:bg-ankahe-bg',
    ghost: 'bg-transparent text-ankahe-muted hover:bg-ankahe-surface hover:text-ankahe-text',
    danger: 'bg-ankahe-danger-soft text-ankahe-danger hover:bg-ankahe-danger-soft/80 border border-ankahe-danger/20'
  };

  const sizes = {
    sm: 'min-h-11 px-4 py-2 text-sm',
    md: 'min-h-12 px-6 py-3 text-base',
    lg: 'min-h-14 px-8 py-4 text-lg'
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        'group inline-flex items-center justify-center gap-3 font-semibold leading-none rounded-full disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-accent focus-visible:ring-offset-2',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {icon && (
        <span className={cn(
          "flex items-center justify-center rounded-full transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105 group-hover:translate-x-1",
          size === 'sm' ? "w-6 h-6" : "w-8 h-8",
          variant === 'primary' ? "bg-black/10" : "bg-black/5 dark:bg-white/10"
        )}>
          {icon}
        </span>
      )}
    </motion.button>
  );
}
