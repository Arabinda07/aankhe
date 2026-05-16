/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo } from "react";
import { cn } from "../../lib/utils";
import type { AnswerInputProps } from "./shared";

/** Labeled 1–5 scale with anchor text parsed from helperText. */
export function ScaleInput({ question, value, onChange, labelledBy, describedBy }: AnswerInputProps) {
  const numericValue = typeof value === "number" ? value : undefined;
  const min = question.min ?? 1;
  const max = question.max ?? 5;
  const values = useMemo(
    () => Array.from({ length: Math.max(1, max - min + 1) }, (_, index) => min + index),
    [max, min]
  );
  const anchors = parseScaleAnchors(question.helperText, min, max);

  return (
    <fieldset
      className="grid gap-3 sm:grid-cols-5"
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
    >
      {values.map((scaleValue) => {
        const checked = numericValue === scaleValue;
        const anchor = anchors[scaleValue];
        return (
          <label
            key={scaleValue}
            className={cn(
              "min-h-20 cursor-pointer rounded-sm border px-4 py-3 text-center transition-[border-color,background-color,color,box-shadow,transform] duration-200 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
              "focus-within:outline-none focus-within:ring-2 focus-within:ring-parichay-focus focus-within:ring-offset-2",
              checked
                ? "border-parichay-accent bg-parichay-accent-soft text-parichay-accent-dark shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]"
                : "border-parichay-paper-border bg-parichay-paper text-parichay-text hover:border-parichay-border-strong hover:bg-parichay-paper-muted"
            )}
          >
            <input
              type="radio"
              name={`answer-${question.id}`}
              checked={checked}
              onChange={() => onChange(scaleValue)}
              className="sr-only"
              aria-label={anchor ? `${scaleValue}: ${anchor}` : String(scaleValue)}
            />
            <span className="type-tabular block text-xl font-semibold" aria-hidden="true">{scaleValue}</span>
            <span className="type-caption mt-1 block text-parichay-muted" aria-hidden="true">
              {anchor || (scaleValue === min ? "Low" : scaleValue === max ? "High" : "\u00A0")}
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}

function parseScaleAnchors(helperText: string | undefined, min: number, max: number): Record<number, string> {
  if (!helperText) return {};

  const anchors: Record<number, string> = {};
  const pattern = /(\d+)\s*=\s*([^,]+)/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(helperText)) !== null) {
    const scaleValue = Number(match[1]);
    if (scaleValue >= min && scaleValue <= max) {
      anchors[scaleValue] = match[2].trim();
    }
  }

  return anchors;
}
