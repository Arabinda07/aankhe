/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as RadioGroup from "@radix-ui/react-radio-group";
import { cn } from "../../lib/utils";
import type { AnswerInputProps } from "./shared";

/** Segmented tri-state control (Yes / Maybe / No). */
export function SegmentedTriStateInput({ question, value, onChange, labelledBy, describedBy }: AnswerInputProps) {
  const currentValue = typeof value === "string" ? value : "";
  const options = ["Yes", "Maybe", "No"];

  return (
    <RadioGroup.Root
      className="flex w-full flex-wrap gap-2 rounded-sm border border-parichay-border bg-parichay-control-selected p-1 sm:w-fit"
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      value={currentValue}
      onValueChange={onChange}
    >
      {options.map((option) => {
        const checked = currentValue === option;
        return (
          <RadioGroup.Item
            key={option}
            value={option}
            className={cn(
              "type-ui-label min-h-11 flex flex-1 cursor-pointer items-center justify-center rounded-sm border border-transparent px-4 py-1.5 transition-all sm:flex-none",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2",
              checked
                ? "border-parichay-border bg-parichay-control text-parichay-text shadow-sm"
                : "text-parichay-muted hover:bg-parichay-control-hover hover:text-parichay-text"
            )}
          >
            {option}
          </RadioGroup.Item>
        );
      })}
    </RadioGroup.Root>
  );
}
