/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { CaretDown, CaretUp, Eye, EyeSlash, LockKey } from "@phosphor-icons/react";
import { answerValueIsPresent, getAnswerComponentForQuestion, getSensitiveSkipAction } from "../lib/answerUiPolicy";
import { Question, Visibility } from "../lib/schemaTypes";
import { cn } from "../lib/utils";
import { SoftButton } from "./SoftButton";

type AnswerValue = string | string[] | number | undefined;

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
  const noteRef = useRef<HTMLTextAreaElement>(null);
  const questionLabelId = `question-${question.id}-label`;
  const helperTextId = question.helperText ? `question-${question.id}-helper` : undefined;
  const visibilityDescriptionId = `question-${question.id}-visibility-description`;
  const hasAnswer = answerValueIsPresent(value);

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
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 id={questionLabelId} className="type-question text-ankahe-text">
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
          className="type-caption min-h-11 rounded-sm border border-ankahe-paper-border bg-ankahe-paper-muted px-3 py-2 text-ankahe-text transition-colors hover:border-ankahe-border-strong hover:bg-ankahe-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2"
        >
          This does not fit me
        </button>
        <button
          type="button"
          onClick={() => handleSensitiveSkip("notReady")}
          className="type-caption min-h-11 rounded-sm border border-ankahe-paper-border bg-ankahe-paper-muted px-3 py-2 text-ankahe-text transition-colors hover:border-ankahe-border-strong hover:bg-ankahe-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2"
        >
          I am not ready to answer this
        </button>
      </div>

      <div className="space-y-3 rounded-sm border border-ankahe-paper-border bg-ankahe-paper p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="type-ui-label text-ankahe-text">Optional nuance</p>
            <p className="type-caption text-ankahe-muted">
              Add context only if the structured answer needs your words.
            </p>
          </div>
          {!isNuanceOpen && (
            <button
              type="button"
              onClick={revealNuance}
              className="type-ui-label min-h-11 rounded-sm border border-ankahe-border bg-ankahe-control px-4 py-1.5 text-ankahe-text transition-colors hover:bg-ankahe-control-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2"
            >
              Add nuance
            </button>
          )}
        </div>

        {isNuanceOpen && (
          <textarea
            ref={noteRef}
            id={`${question.id}-note`}
            value={note}
            onChange={(event) => onNoteChange(event.target.value)}
            rows={3}
            placeholder="Add an optional sentence in your own words."
            className="type-body w-full resize-none rounded-sm border border-ankahe-paper-border bg-ankahe-paper-muted p-4 text-ankahe-text placeholder:text-ankahe-muted/60 transition-colors focus:border-ankahe-accent focus:outline-none focus-visible:ring-1 focus-visible:ring-ankahe-focus"
            aria-label={`Optional nuance for ${question.label}`}
          />
        )}
      </div>

      <VisibilityControl
        questionId={question.id}
        visibility={visibility}
        onVisibilityChange={onVisibilityChange}
        describedBy={visibilityDescriptionId}
      />
      <p id={visibilityDescriptionId} className="type-caption max-w-2xl text-ankahe-muted">
        Share means included in links and exports. Private stays local. Hide is omitted from the manual.
      </p>

      <div className="flex flex-wrap items-center gap-4 pt-8">
        {!isFirst && (
          <SoftButton variant="secondary" onClick={onBack}>
            Back
          </SoftButton>
        )}
        <SoftButton variant="secondary" onClick={onNext}>
          Skip
        </SoftButton>
        <SoftButton
          className="flex-1 md:flex-none"
          onClick={onNext}
          disabled={!hasAnswer}
          variant={hasAnswer ? "primary" : "secondary"}
        >
          {isLast ? "Review Manual" : "Continue"}
        </SoftButton>
      </div>
    </div>
  );
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
  describedBy: string;
}) {
  return (
    <fieldset className="space-y-3" aria-describedby={describedBy}>
      <legend className="type-ui-label text-ankahe-text">Visibility</legend>
      <div className="flex w-full flex-wrap gap-2 rounded-sm border border-ankahe-border bg-ankahe-control-selected p-1 sm:w-fit">
        <VisibilityOption
          name={`visibility-${questionId}`}
          value="share"
          active={visibility === "share"}
          onChange={onVisibilityChange}
          icon={<Eye size={16} weight={visibility === "share" ? "fill" : "light"} />}
          label="Share"
        />
        <VisibilityOption
          name={`visibility-${questionId}`}
          value="private"
          active={visibility === "private"}
          onChange={onVisibilityChange}
          icon={<LockKey size={16} weight={visibility === "private" ? "fill" : "light"} />}
          label="Private"
        />
        <VisibilityOption
          name={`visibility-${questionId}`}
          value="hide"
          active={visibility === "hide"}
          onChange={onVisibilityChange}
          icon={<EyeSlash size={16} weight={visibility === "hide" ? "fill" : "light"} />}
          label="Hide"
        />
      </div>
    </fieldset>
  );
}

function VisibilityOption({
  name,
  value,
  active,
  onChange,
  icon,
  label,
}: {
  name: string;
  value: Visibility;
  active: boolean;
  onChange: (visibility: Visibility) => void;
  icon: ReactNode;
  label: string;
}) {
  return (
    <label
      className={cn(
        "type-ui-label min-h-11 flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-sm border border-transparent px-3 py-1.5 transition-all sm:flex-none",
        "focus-within:outline-none focus-within:ring-2 focus-within:ring-ankahe-focus focus-within:ring-offset-2",
        active
          ? "border-ankahe-border bg-ankahe-control text-ankahe-text shadow-sm"
          : "text-ankahe-muted hover:bg-ankahe-control-hover hover:text-ankahe-text"
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={active}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      {icon}
      {label}
    </label>
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
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  if (component === "radioCards") {
    return (
      <ChoiceFieldset labelledBy={labelledBy} describedBy={describedBy}>
        {(question.options || []).map((option) => (
          <div key={option}>
            <ChoiceRadio
              name={`answer-${question.id}`}
              option={option}
              checked={value === option}
              onChange={() => onChange(option)}
            />
          </div>
        ))}
      </ChoiceFieldset>
    );
  }

  if (component === "multiSelectCards") {
    const selected = Array.isArray(value) ? value : [];

    return (
      <ChoiceFieldset labelledBy={labelledBy} describedBy={describedBy}>
        {(question.options || []).map((option) => {
          const checked = selected.includes(option);
          return (
            <div key={option}>
              <ChoiceCheckbox
                option={option}
                checked={checked}
                onChange={() => {
                  const nextValue = checked
                    ? selected.filter((item) => item !== option)
                    : [...selected, option];
                  onChange(nextValue);
                }}
              />
            </div>
          );
        })}
        <button
          type="button"
          onClick={() => onChange([])}
          className="type-caption min-h-11 rounded-sm border border-ankahe-paper-border bg-ankahe-paper-muted px-3 py-2 text-left text-ankahe-text transition-colors hover:border-ankahe-border-strong hover:bg-ankahe-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2 sm:col-span-2"
        >
          None of these fit
        </button>
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
    const left = question.leftLabel || question.options?.[0] || "More like the first option";
    const right = question.rightLabel || question.options?.[1] || "More like the second option";
    return (
      <ChoiceFieldset labelledBy={labelledBy} describedBy={describedBy}>
        {[
          left,
          right,
          "Both are true",
          "Neither fits",
        ].map((option) => (
          <div key={option}>
            <ChoiceRadio
              name={`answer-${question.id}`}
              option={option}
              checked={value === option}
              onChange={() => onChange(option)}
            />
          </div>
        ))}
      </ChoiceFieldset>
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
      className="grid gap-3 sm:grid-cols-2"
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
    >
      {children}
    </fieldset>
  );
}

function ChoiceRadio({
  name,
  option,
  checked,
  onChange,
}: {
  name: string;
  option: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className={choiceClassName(checked)}>
      <input type="radio" name={name} checked={checked} onChange={onChange} className="sr-only" />
      <span>{option}</span>
    </label>
  );
}

function ChoiceCheckbox({
  option,
  checked,
  onChange,
}: {
  option: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className={choiceClassName(checked)}>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      <span>{option}</span>
    </label>
  );
}

function choiceClassName(checked: boolean) {
  return cn(
    "flex min-h-20 cursor-pointer items-center rounded-sm border px-5 py-4 text-left text-base font-semibold leading-snug transition-all",
    "focus-within:outline-none focus-within:ring-2 focus-within:ring-ankahe-focus focus-within:ring-offset-2",
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
    <fieldset
      className="flex w-full flex-wrap gap-2 rounded-sm border border-ankahe-border bg-ankahe-control-selected p-1 sm:w-fit"
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
    >
      {options.map((option) => {
        const checked = value === option;
        return (
          <label
            key={option}
            className={cn(
              "type-ui-label min-h-11 flex flex-1 cursor-pointer items-center justify-center rounded-sm border border-transparent px-4 py-1.5 transition-all sm:flex-none",
              "focus-within:outline-none focus-within:ring-2 focus-within:ring-ankahe-focus focus-within:ring-offset-2",
              checked
                ? "border-ankahe-border bg-ankahe-control text-ankahe-text shadow-sm"
                : "text-ankahe-muted hover:bg-ankahe-control-hover hover:text-ankahe-text"
            )}
          >
            <input
              type="radio"
              name={`answer-${questionId}`}
              value={option}
              checked={checked}
              onChange={() => onChange(option)}
              className="sr-only"
            />
            {option}
          </label>
        );
      })}
    </fieldset>
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
  const ordered = value.length > 0 ? value : options;

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
            <span className="type-body font-semibold text-ankahe-text">{option}</span>
            <span className="flex gap-1">
              <RankButton
                label={`Move ${option} up`}
                disabled={index === 0}
                onClick={() => move(index, -1)}
                icon={<CaretUp size={16} weight="light" />}
              />
              <RankButton
                label={`Move ${option} down`}
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
          onClick={() => onChange(options)}
          className="type-ui-label min-h-11 rounded-sm border border-ankahe-border bg-ankahe-control px-4 py-1.5 text-ankahe-text transition-colors hover:bg-ankahe-control-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2"
        >
          Use this order
        </button>
      )}
      <p className="type-caption text-ankahe-muted" aria-live="polite">
        {value.length > 0 ? `Current order: ${ordered.join(", ")}` : "Move items or use the current order."}
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
