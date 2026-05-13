/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PenNib } from "@phosphor-icons/react";
import { cn } from "../lib/utils";

interface AnkaheMarkProps {
  className?: string;
  tileClassName?: string;
  wordmarkClassName?: string;
  compact?: boolean;
}

export function AnkaheMark({
  className,
  tileClassName,
  wordmarkClassName,
  compact = false,
}: AnkaheMarkProps) {
  return (
    <span className={cn("group inline-flex items-center gap-3", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "grid h-11 w-11 shrink-0 place-items-center rounded-sm bg-ankahe-accent text-ankahe-on-accent shadow-[0_4px_14px_color-mix(in_oklch,var(--color-accent)_20%,transparent)] border border-ankahe-accent-dark/20 transition-all duration-400 ease-[var(--ease-out-expo)] group-hover:-rotate-3 group-hover:scale-[1.04]",
          tileClassName
        )}
      >
        <PenNib size={22} weight="light" />
      </span>
      {!compact && (
        <span
          className={cn(
            "font-display text-[1.65rem] italic leading-none text-ankahe-accent-dark transition-colors duration-200 group-hover:text-ankahe-accent",
            wordmarkClassName
          )}
        >
          Ankahe
        </span>
      )}
    </span>
  );
}
