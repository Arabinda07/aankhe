/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AnswerInputProps } from "./shared";

/** Single-line text input for short free-text answers. */
export function ShortTextInput({ value, onChange, labelledBy, describedBy }: AnswerInputProps) {
  return (
    <input
      type="text"
      value={typeof value === "string" ? value : ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Type your answer..."
      className="type-answer-field w-full rounded-none border-b-2 border-ankahe-border bg-transparent py-2 text-ankahe-text outline-none transition-colors placeholder:text-ankahe-muted/50 focus:border-ankahe-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-accent/40"
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
      className="type-answer-field w-full resize-none rounded-sm border border-ankahe-paper-border bg-ankahe-paper p-6 text-ankahe-text shadow-sm transition-colors placeholder:text-ankahe-muted/50 focus:border-ankahe-accent focus:outline-none focus-visible:ring-1 focus-visible:ring-ankahe-focus"
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
    />
  );
}
