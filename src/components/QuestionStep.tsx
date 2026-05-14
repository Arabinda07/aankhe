/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { CaretDown, CaretUp, Eye, EyeSlash, LockKey } from "@phosphor-icons/react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { answerValueIsPresent, getAnswerComponentForQuestion, getSensitiveSkipAction } from "../lib/answerUiPolicy";
import { getOptionLabel, getOptionValue } from "../lib/protocolManifest";
import { Question, QuestionOption, Visibility } from "../lib/schemaTypes";
import { cn } from "../lib/utils";
import { SoftButton } from "./SoftButton";

type AnswerValue = string | string[] | number | undefined;

const choiceGridClassName = "grid gap-3 md:grid-cols-[repeat(2,minmax(16rem,1fr))]";

interface QuestionStepProps {
  question: Question;
  value: AnswerValue;
  onChange: (val: string | string[] | number) => void;
  onClear: () => void;
  note: string;
  onNoteChange: (note: string) => void;
  visibility: Visibility;
  onVisibilityChange: (vis: Visibility) => void;
  onNext: () => void;
  onBack?: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export function QuestionStep({
  question,
  value,
  onChange,
  onClear,
  note,
  onNoteChange,
  visibility,
  onVisibilityChange,
  onNext,
  onBack,
  isFirst,
  isLast
}: QuestionStepProps) {
  const [isNuanceOpen, setIsNuanceOpen] = useState(note.trim().length > 0);
  const [isVisibilityOpen, setIsVisibilityOpen] = useState(false);
  const [isVisibilityHelpOpen, setIsVisibilityHelpOpen] = useState(false);
  const noteRef = useRef<HTMLTextAreaElement>(null);
  const questionLabelId = `question-${question.id}-label`;
  const helperTextId = question.helperText ? `question-${question.id}-helper` : undefined;
  const visibilityDescriptionId = `question-${question.id}-visibility-description`;
  const hasAnswer = answerValueIsPresent(value);
  const hasNote = note.trim().length > 0;
  const showAnswerDetails = hasAnswer || hasNote;

  useEffect(() => {
    if (note.trim().length > 0) setIsNuanceOpen(true);
  }, [note]);

  const revealNuance = () => {
    setIsNuanceOpen(true);
    window.setTimeout(() => noteRef.current?.focus(), 0);
  };

  const handleSensitiveSkip = (reason: "doesNotFit" | "notReady") => {
    const action = getSensitiveSkipAction(reason);
    if (action.shouldClearAnswer) {
      onClear();
      onNoteChange("");
    }
    onVisibilityChange(action.visibility);
    onNext();
  };

  return (
    <div className="space-y-6 md:space-y-7">
      <div className="space-y-4">
        <h2 id={questionLabelId} className="type-question-builder text-ankahe-text">
          {question.label}
        </h2>
        {question.helperText && (
          <p id={helperTextId} className="type-lead text-ankahe-muted">
            {question.helperText}
          </p>
        )}
      </div>

      <div className="py-2">
        <AnswerInput
          question={question}
          value={value}
          onChange={onChange}
          labelledBy={questionLabelId}
          describedBy={helperTextId}
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => handleSensitiveSkip("doesNotFit")}
          className="type-caption min-h-11 px-1 py-2 text-ankahe-muted underline-offset-4 transition-colors hover:text-ankahe-text hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2"
        >
          None of these fit
        </button>
        <button
          type="button"
          onClick={() => handleSensitiveSkip("notReady")}
          className="type-caption min-h-11 px-1 py-2 text-ankahe-muted underline-offset-4 transition-colors hover:text-ankahe-text hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2"
        >
          I am not ready to answer this
        </button>
      </div>

      {!showAnswerDetails && (
        <p className="type-caption max-w-2xl text-ankahe-muted">
          Privacy can be changed before sharing.
        </p>
      )}

      {showAnswerDetails && (
        <div className="space-y-5">
          <div className="space-y-3">
            {!isNuanceOpen ? (
              <button
                type="button"
                onClick={revealNuance}
                className="type-ui-label min-h-11 px-1 py-2 text-ankahe-accent underline-offset-4 transition-colors hover:text-ankahe-accent-dark hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2"
              >
                Add nuance
              </button>
            ) : (
              <div className="space-y-2">
                <label htmlFor={`${question.id}-note`} className="type-ui-label block text-ankahe-text">
                  Add nuance
                </label>
                <textarea
                  ref={noteRef}
                  id={`${question.id}-note`}
                  value={note}
                  onChange={(event) => onNoteChange(event.target.value)}
                  rows={3}
                  placeholder="Add context only if this answer needs your words."
                  className="type-body w-full resize-none rounded-sm border border-ankahe-paper-border bg-ankahe-paper-muted p-4 text-ankahe-text placeholder:text-ankahe-muted/60 transition-colors focus:border-ankahe-accent focus:outline-none focus-visible:ring-1 focus-visible:ring-ankahe-focus"
                />
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="type-caption text-ankahe-muted">Visibility:</span>
              <span className="type-caption font-semibold text-ankahe-text">{getVisibilityLabel(visibility)}</span>
              <span className="type-caption text-ankahe-muted" aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => setIsVisibilityOpen((isOpen) => !isOpen)}
                className="type-caption min-h-11 px-1 py-2 font-semibold text-ankahe-accent underline-offset-4 transition-colors hover:text-ankahe-accent-dark hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2"
                aria-expanded={isVisibilityOpen}
                aria-controls={`${question.id}-visibility-panel`}
              >
                {isVisibilityOpen ? "Close" : "Change"}
              </button>
            </div>

            {isVisibilityOpen && (
              <div id={`${question.id}-visibility-panel`} className="space-y-3">
                <VisibilityControl
                  questionId={question.id}
                  visibility={visibility}
                  onVisibilityChange={onVisibilityChange}
                  describedBy={isVisibilityHelpOpen ? visibilityDescriptionId : undefined}
                />
                <button
                  type="button"
                  onClick={() => setIsVisibilityHelpOpen((isOpen) => !isOpen)}
                  className="type-caption min-h-11 px-1 py-2 text-ankahe-muted underline-offset-4 transition-colors hover:text-ankahe-text hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2"
                  aria-expanded={isVisibilityHelpOpen}
                  aria-controls={visibilityDescriptionId}
                >
                  What does this mean?
                </button>
                {isVisibilityHelpOpen && (
                  <p id={visibilityDescriptionId} className="type-caption max-w-2xl text-ankahe-muted">
                    Share means included in links and exports. Private stays local. Hide is omitted from the manual.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-3 md:pt-5">
        {!isFirst && (
          <button
            type="button"
            onClick={onBack}
            className="type-ui-label min-h-11 px-1 py-2 text-ankahe-muted underline-offset-4 transition-colors hover:text-ankahe-text hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2"
          >
            Back
          </button>
        )}
        <button
          type="button"
          onClick={onNext}
          className="type-ui-label min-h-11 px-1 py-2 text-ankahe-muted underline-offset-4 transition-colors hover:text-ankahe-text hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2"
        >
          Skip this question
        </button>
        <SoftButton
          className="ml-auto min-w-36"
          onClick={onNext}
          disabled={!hasAnswer}
          variant="primary"
        >
          {isLast ? "Review Manual" : "Continue"}
        </SoftButton>
      </div>
    </div>
  );
}

function getVisibilityLabel(visibility: Visibility): string {
  const labels: Record<Visibility, string> = {
    share: "Share",
    private: "Private",
    hide: "Hide",
  };

  return labels[visibility];
}

function VisibilityControl({
  questionId,
  visibility,
  onVisibilityChange,
  describedBy,
}: {
  questionId: string;
  visibility: Visibility;
  onVisibilityChange: (visibility: Visibility) => void;
  describedBy?: string;
}) {
  return (
    <div className="space-y-3">
      <p className="type-ui-label text-ankahe-text" id={`${questionId}-visibility-label`}>Visibility</p>
      <RadioGroup.Root
        aria-labelledby={`${questionId}-visibility-label`}
        aria-describedby={describedBy}
        value={visibility}
        onValueChange={(value) => onVisibilityChange(value as Visibility)}
        className="flex w-full flex-wrap gap-2 rounded-sm border border-ankahe-border bg-ankahe-control-selected p-1 sm:w-fit"
      >
        <VisibilityOption
          value="share"
          active={visibility === "share"}
          icon={<Eye size={16} weight={visibility === "share" ? "fill" : "light"} />}
          label="Share"
        />
        <VisibilityOption
          value="private"
          active={visibility === "private"}
          icon={<LockKey size={16} weight={visibility === "private" ? "fill" : "light"} />}
          label="Private"
        />
        <VisibilityOption
          value="hide"
          active={visibility === "hide"}
          icon={<EyeSlash size={16} weight={visibility === "hide" ? "fill" : "light"} />}
          label="Hide"
        />
      </RadioGroup.Root>
    </div>
  );
}

function VisibilityOption({
  value,
  active,
  icon,
  label,
}: {
  value: Visibility;
  active: boolean;
  icon: ReactNode;
  label: string;
}) {
  return (
    <RadioGroup.Item
      value={value}
      className={cn(
        "type-ui-label min-h-11 flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-sm border border-transparent px-3 py-1.5 transition-all sm:flex-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2",
        active
          ? "border-ankahe-border bg-ankahe-control text-ankahe-text shadow-sm"
          : "text-ankahe-muted hover:bg-ankahe-control-hover hover:text-ankahe-text"
      )}
    >
      {icon}
      {label}
    </RadioGroup.Item>
  );
}

export function AnswerInput({
  question,
  value,
  onChange,
  labelledBy,
  describedBy,
}: {
  question: Question;
  value: AnswerValue;
  onChange: (value: string | string[] | number) => void;
  labelledBy: string;
  describedBy?: string;
}) {
  const component = getAnswerComponentForQuestion(question);

  if (component === "shortText") {
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

  if (component === "textarea") {
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

  if (component === "nativeSelect") {
    return (
      <select
        value={typeof value === "string" ? value : ""}
        onChange={(event) => onChange(event.target.value)}
        className="type-body min-h-12 w-full rounded-sm border border-ankahe-paper-border bg-ankahe-paper px-4 py-3 text-ankahe-text transition-colors focus:border-ankahe-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus"
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

  if (component === "radioCards") {
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

  if (component === "multiSelectCards") {
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

  if (component === "segmentedTriState") {
    return (
      <SegmentedAnswer
        questionId={question.id}
        labelledBy={labelledBy}
        describedBy={describedBy}
        value={typeof value === "string" ? value : ""}
        onChange={onChange}
        options={["Yes", "Maybe", "No"]}
      />
    );
  }

  if (component === "pairedChoice") {
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
        {[
          left,
          right,
          "Both are true",
          "Neither fits",
        ].map((option) => (
          <div key={option}>
            <ChoiceRadio
              option={option}
              value={option}
              checked={value === option}
            />
          </div>
        ))}
      </RadioGroup.Root>
    );
  }

  if (component === "labeledScale") {
    return (
      <ScaleAnswer
        question={question}
        value={typeof value === "number" ? value : undefined}
        onChange={onChange}
        labelledBy={labelledBy}
        describedBy={describedBy}
      />
    );
  }

  if (component === "rankedChoice") {
    return (
      <RankedAnswer
        question={question}
        value={Array.isArray(value) ? value : []}
        onChange={onChange}
        labelledBy={labelledBy}
        describedBy={describedBy}
      />
    );
  }

  return null;
}

function ChoiceFieldset({
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

function choiceClassName(checked: boolean, focusMode: "focus-within" | "focus-visible" = "focus-within") {
  return cn(
    "flex min-h-16 cursor-pointer items-center rounded-sm border px-4 py-3 text-left text-base font-semibold leading-snug transition-all md:min-h-20 md:px-5 md:py-4",
    focusMode === "focus-visible"
      ? "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2"
      : "focus-within:outline-none focus-within:ring-2 focus-within:ring-ankahe-focus focus-within:ring-offset-2",
    checked
      ? "border-ankahe-accent bg-ankahe-accent-soft text-ankahe-accent-dark"
      : "border-ankahe-paper-border bg-ankahe-paper text-ankahe-text hover:border-ankahe-border-strong hover:bg-ankahe-paper-muted"
  );
}

function SegmentedAnswer({
  questionId,
  labelledBy,
  describedBy,
  value,
  onChange,
  options,
}: {
  questionId: string;
  labelledBy: string;
  describedBy?: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <RadioGroup.Root
      className="flex w-full flex-wrap gap-2 rounded-sm border border-ankahe-border bg-ankahe-control-selected p-1 sm:w-fit"
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      value={value}
      onValueChange={onChange}
    >
      {options.map((option) => {
        const checked = value === option;
        return (
          <RadioGroup.Item
            key={option}
            value={option}
            className={cn(
              "type-ui-label min-h-11 flex flex-1 cursor-pointer items-center justify-center rounded-sm border border-transparent px-4 py-1.5 transition-all sm:flex-none",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2",
              checked
                ? "border-ankahe-border bg-ankahe-control text-ankahe-text shadow-sm"
                : "text-ankahe-muted hover:bg-ankahe-control-hover hover:text-ankahe-text"
            )}
          >
            {option}
          </RadioGroup.Item>
        );
      })}
    </RadioGroup.Root>
  );
}

function ScaleAnswer({
  question,
  value,
  onChange,
  labelledBy,
  describedBy,
}: {
  question: Question;
  value?: number;
  onChange: (value: number) => void;
  labelledBy: string;
  describedBy?: string;
}) {
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
        const checked = value === scaleValue;
        const anchor = anchors[scaleValue];
        return (
          <label
            key={scaleValue}
            className={cn(
              "min-h-20 cursor-pointer rounded-sm border px-4 py-3 text-center transition-all",
              "focus-within:outline-none focus-within:ring-2 focus-within:ring-ankahe-focus focus-within:ring-offset-2",
              checked
                ? "border-ankahe-accent bg-ankahe-accent-soft text-ankahe-accent-dark"
                : "border-ankahe-paper-border bg-ankahe-paper text-ankahe-text hover:border-ankahe-border-strong hover:bg-ankahe-paper-muted"
            )}
          >
            <input
              type="radio"
              name={`answer-${question.id}`}
              checked={checked}
              onChange={() => onChange(scaleValue)}
              className="sr-only"
            />
            <span className="type-tabular block text-xl font-semibold">{scaleValue}</span>
            <span className="type-caption mt-1 block text-ankahe-muted">
              {anchor || (scaleValue === min ? "Low" : scaleValue === max ? "High" : "Middle")}
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

function RankedAnswer({
  question,
  value,
  onChange,
  labelledBy,
  describedBy,
}: {
  question: Question;
  value: string[];
  onChange: (value: string[]) => void;
  labelledBy: string;
  describedBy?: string;
}) {
  const options = question.options || [];
  const optionLabels = new Map(options.map((option) => [getOptionValue(option), getOptionLabel(option)]));
  const optionValues = options.map(getOptionValue);
  const ordered = value.length > 0 ? value : optionValues;

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
            className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-sm border border-ankahe-paper-border bg-ankahe-paper p-3"
          >
            <span className="type-tabular flex h-9 w-9 items-center justify-center rounded-sm bg-ankahe-paper-muted text-ankahe-text">
              {index + 1}
            </span>
            <span className="type-body font-semibold text-ankahe-text">{optionLabels.get(option) || option}</span>
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
      {value.length === 0 && options.length > 0 && (
        <button
          type="button"
          onClick={() => onChange(optionValues)}
          className="type-ui-label min-h-11 rounded-sm border border-ankahe-border bg-ankahe-control px-4 py-1.5 text-ankahe-text transition-colors hover:bg-ankahe-control-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2"
        >
          Use this order
        </button>
      )}
      <p className="type-caption text-ankahe-muted" aria-live="polite">
        {value.length > 0 ? `Current order: ${ordered.map((item) => optionLabels.get(item) || item).join(", ")}` : "Move items or use the current order."}
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
      className="flex min-h-11 min-w-11 items-center justify-center rounded-sm border border-ankahe-border bg-ankahe-control text-ankahe-text transition-colors hover:bg-ankahe-control-hover disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2"
    >
      {icon}
    </button>
  );
}
