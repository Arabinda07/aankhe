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
  const base = "type-choice flex min-h-16 cursor-pointer items-center rounded-sm border px-4 py-3 text-left transition-all md:min-h-20 md:px-5 md:py-4";
  const focusRing = focusMode === "focus-visible"
    ? "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2"
    : "focus-within:outline-none focus-within:ring-2 focus-within:ring-parichay-focus focus-within:ring-offset-2";
  const color = checked
    ? "border-parichay-accent bg-parichay-accent-soft text-parichay-accent-dark"
    : "border-parichay-paper-border bg-parichay-paper/70 text-parichay-text hover:border-parichay-border-strong hover:bg-parichay-paper-muted";

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
