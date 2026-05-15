/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as RadioGroup from "@radix-ui/react-radio-group";
import { getOptionLabel, getOptionValue } from "../../lib/protocolManifest";
import type { QuestionOption } from "../../lib/schemaTypes";
import type { AnswerInputProps } from "./shared";
import { choiceClassName, choiceGridClassName, ChoiceFieldset } from "./shared";

/** Single-select radio card grid. */
export function RadioCardsInput({ question, value, onChange, labelledBy, describedBy }: AnswerInputProps) {
  return (
    <RadioGroup.Root
      className={choiceGridClassName}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      value={typeof value === "string" ? value : ""}
      onValueChange={onChange}
    >
      {(question.options || []).map((option) => (
        <div key={getOptionValue(option)}>
          <ChoiceRadio
            option={option}
            value={getOptionValue(option)}
            checked={value === getOptionValue(option)}
          />
        </div>
      ))}
    </RadioGroup.Root>
  );
}

/** Multi-select checkbox card grid. */
export function MultiSelectCardsInput({ question, value, onChange, labelledBy, describedBy }: AnswerInputProps) {
  const selected = Array.isArray(value) ? value : [];

  return (
    <ChoiceFieldset labelledBy={labelledBy} describedBy={describedBy}>
      {(question.options || []).map((option) => {
        const optionValue = getOptionValue(option);
        const checked = selected.includes(optionValue);
        return (
          <div key={optionValue}>
            <ChoiceCheckbox
              option={option}
              checked={checked}
              onChange={() => {
                const nextValue = checked
                  ? selected.filter((item) => item !== optionValue)
                  : [...selected, optionValue];
                onChange(nextValue);
              }}
            />
          </div>
        );
      })}
    </ChoiceFieldset>
  );
}

/** Native dropdown select for administrative questions with many options. */
export function NativeSelectInput({ question, value, onChange, labelledBy, describedBy }: AnswerInputProps) {
  return (
    <select
      value={typeof value === "string" ? value : ""}
      onChange={(event) => onChange(event.target.value)}
      className="type-body min-h-12 w-full rounded-sm border border-parichay-paper-border bg-parichay-paper px-4 py-3 text-parichay-text transition-colors focus:border-parichay-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus"
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
    >
      <option value="">Choose one</option>
      {(question.options || []).map((option) => (
        <option key={getOptionValue(option)} value={getOptionValue(option)}>
          {getOptionLabel(option)}
        </option>
      ))}
    </select>
  );
}

/** Paired choice (left/right/both/neither) rendered as radio cards. */
export function PairedChoiceInput({ question, value, onChange, labelledBy, describedBy }: AnswerInputProps) {
  const left = question.leftLabel || (question.options?.[0] ? getOptionLabel(question.options[0]) : "More like the first option");
  const right = question.rightLabel || (question.options?.[1] ? getOptionLabel(question.options[1]) : "More like the second option");
  return (
    <RadioGroup.Root
      className={choiceGridClassName}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      value={typeof value === "string" ? value : ""}
      onValueChange={onChange}
    >
      {[left, right, "Both are true", "Neither fits"].map((option) => (
        <div key={option}>
          <ChoiceRadio option={option} value={option} checked={value === option} />
        </div>
      ))}
    </RadioGroup.Root>
  );
}

// ── Internal sub-components ────────────────────────────────────────

function ChoiceRadio({
  option,
  value,
  checked,
}: {
  option: string | QuestionOption;
  value: string;
  checked: boolean;
}) {
  return (
    <RadioGroup.Item value={value} className={choiceClassName(checked, "focus-visible")}>
      <span>{getOptionLabel(option)}</span>
    </RadioGroup.Item>
  );
}

function ChoiceCheckbox({
  option,
  checked,
  onChange,
}: {
  option: string | QuestionOption;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className={choiceClassName(checked)}>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      <span>{getOptionLabel(option)}</span>
    </label>
  );
}
