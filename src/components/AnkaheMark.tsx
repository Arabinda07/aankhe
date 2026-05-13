/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BookOpenText } from "@phosphor-icons/react";
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
          "grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-ankahe-accent text-ankahe-on-accent shadow-[0_10px_24px_color-mix(in_oklch,var(--color-accent)_18%,transparent)] transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:-rotate-2 group-hover:scale-[1.03]",
          tileClassName
        )}
      >
        <BookOpenText size={21} weight="regular" />
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
