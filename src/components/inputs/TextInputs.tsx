/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AnswerInputProps } from "./shared";

/** Single-line text input — warm paper writing surface. */
export function ShortTextInput({ value, onChange, labelledBy, describedBy }: AnswerInputProps) {
  return (
    <input
      type="text"
      value={typeof value === "string" ? value : ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Type your answer..."
      className="type-answer-field w-full rounded-sm border border-parichay-paper-border bg-parichay-paper px-4 py-3 text-parichay-text shadow-sm transition-colors placeholder:text-parichay-muted/50 focus:border-parichay-accent focus:outline-none focus-visible:ring-1 focus-visible:ring-parichay-focus"
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
    />
  );
}

/** Multi-line text input for longer free-text answers. */
export function TextareaInput({ value, onChange, labelledBy, describedBy }: AnswerInputProps) {
  return (
    <textarea
      value={typeof value === "string" ? value : ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Type your answer..."
      rows={4}
      className="type-answer-field w-full resize-none rounded-sm border border-parichay-paper-border bg-parichay-paper p-6 text-parichay-text shadow-sm transition-colors placeholder:text-parichay-muted/50 focus:border-parichay-accent focus:outline-none focus-visible:ring-1 focus-visible:ring-parichay-focus"
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
    />
  );
}
