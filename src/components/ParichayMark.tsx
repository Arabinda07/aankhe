/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { cn } from "../lib/utils";

interface ParichayMarkProps {
  className?: string;
  tileClassName?: string;
  wordmarkClassName?: string;
  compact?: boolean;
}

export function ParichayMark({
  className,
  tileClassName,
  wordmarkClassName,
  compact = false,
}: ParichayMarkProps) {
  return (
    <span className={cn("group inline-flex items-center gap-3", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "grid h-11 w-11 shrink-0 place-items-center rounded-sm bg-parichay-accent text-parichay-on-accent shadow-[0_4px_14px_color-mix(in_oklch,var(--color-accent)_20%,transparent)] border border-parichay-accent-dark/20 transition-all duration-400 ease-[var(--ease-out-expo)] group-hover:-rotate-3 group-hover:scale-[1.04]",
          tileClassName
        )}
      >
        <span className="font-display text-[1.5rem] font-semibold italic leading-none">P</span>
      </span>
      {!compact && (
        <span
          className={cn(
            "font-display text-[1.65rem] italic leading-none text-parichay-accent-dark transition-colors duration-200 group-hover:text-parichay-accent",
            wordmarkClassName
          )}
        >
          Parichay
        </span>
      )}
    </span>
  );
}
