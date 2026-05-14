/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Shared types for answer input components.
 */

import type { Question } from "../../lib/schemaTypes";
import type { ReactNode } from "react";

export type AnswerValue = string | string[] | number | undefined;

export interface AnswerInputProps {
  question: Question;
  value: AnswerValue;
  onChange: (value: string | string[] | number) => void;
  labelledBy: string;
  describedBy?: string;
}

/**
 * Shared Tailwind class string for the two-column choice grid layout
 * used by radioCards, multiSelectCards, and pairedChoice.
 */
export const choiceGridClassName = "grid gap-3 md:grid-cols-[repeat(2,minmax(16rem,1fr))]";

/**
 * Produces the base class string for a choice card (radio or checkbox).
 */
export function choiceClassName(checked: boolean, focusMode: "focus-within" | "focus-visible" = "focus-within") {
  const base = "flex min-h-16 cursor-pointer items-center rounded-sm border px-4 py-3 text-left text-base font-semibold leading-snug transition-all md:min-h-20 md:px-5 md:py-4";
  const focusRing = focusMode === "focus-visible"
    ? "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2"
    : "focus-within:outline-none focus-within:ring-2 focus-within:ring-ankahe-focus focus-within:ring-offset-2";
  const color = checked
    ? "border-ankahe-accent bg-ankahe-accent-soft text-ankahe-accent-dark"
    : "border-ankahe-paper-border bg-ankahe-paper text-ankahe-text hover:border-ankahe-border-strong hover:bg-ankahe-paper-muted";

  return `${base} ${focusRing} ${color}`;
}

/**
 * Reusable fieldset wrapper for the choice grid.
 */
export function ChoiceFieldset({
  labelledBy,
  describedBy,
  children,
}: {
  labelledBy: string;
  describedBy?: string;
  children: ReactNode;
}) {
  return (
    <fieldset
      className={choiceGridClassName}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
    >
      {children}
    </fieldset>
  );
}
