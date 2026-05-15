/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { type ReactNode } from "react";
import { CaretDown } from "@phosphor-icons/react/dist/csr/CaretDown";
import { CaretUp } from "@phosphor-icons/react/dist/csr/CaretUp";
import { getOptionLabel, getOptionValue } from "../../lib/protocolManifest";
import type { AnswerInputProps } from "./shared";

/** Drag-free ranked choice list with up/down reorder buttons. */
export function RankedInput({ question, value, onChange, labelledBy, describedBy }: AnswerInputProps) {
  const options = question.options || [];
  const optionLabels = new Map(options.map((option) => [getOptionValue(option), getOptionLabel(option)]));
  const optionValues = options.map(getOptionValue);
  const currentValue = Array.isArray(value) ? value : [];
  const ordered = currentValue.length > 0 ? currentValue : optionValues;

  const move = (fromIndex: number, direction: -1 | 1) => {
    const toIndex = fromIndex + direction;
    if (toIndex < 0 || toIndex >= ordered.length) return;
    const next = [...ordered];
    const [item] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, item);
    onChange(next);
  };

  return (
    <div className="space-y-3" role="group" aria-labelledby={labelledBy} aria-describedby={describedBy}>
      <ol className="space-y-2">
        {ordered.map((option, index) => (
          <li
            key={option}
            className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-sm border border-parichay-paper-border bg-parichay-paper p-3"
          >
            <span className="type-tabular flex h-9 w-9 items-center justify-center rounded-sm bg-parichay-paper-muted text-parichay-text">
              {index + 1}
            </span>
            <span className="type-body font-semibold text-parichay-text">{optionLabels.get(option) || option}</span>
            <span className="flex gap-1">
              <RankButton
                label={`Move ${optionLabels.get(option) || option} up`}
                disabled={index === 0}
                onClick={() => move(index, -1)}
                icon={<CaretUp size={16} weight="light" />}
              />
              <RankButton
                label={`Move ${optionLabels.get(option) || option} down`}
                disabled={index === ordered.length - 1}
                onClick={() => move(index, 1)}
                icon={<CaretDown size={16} weight="light" />}
              />
            </span>
          </li>
        ))}
      </ol>
      {currentValue.length === 0 && options.length > 0 && (
        <button
          type="button"
          onClick={() => onChange(optionValues)}
          className="type-ui-label min-h-11 rounded-sm border border-parichay-border bg-parichay-control px-4 py-1.5 text-parichay-text transition-colors hover:bg-parichay-control-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2"
        >
          Use this order
        </button>
      )}
      <p className="type-caption text-parichay-muted" aria-live="polite">
        {currentValue.length > 0 ? `Current order: ${ordered.map((item) => optionLabels.get(item) || item).join(", ")}` : "Move items or use the current order."}
      </p>
    </div>
  );
}

function RankButton({
  label,
  disabled,
  onClick,
  icon,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  icon: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex min-h-11 min-w-11 items-center justify-center rounded-sm border border-parichay-border bg-parichay-control text-parichay-text transition-colors hover:bg-parichay-control-hover disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2"
    >
      {icon}
    </button>
  );
}
