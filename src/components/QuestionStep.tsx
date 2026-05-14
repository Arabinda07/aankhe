/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Question, Visibility } from "../lib/schemaTypes";
import { cn } from "../lib/utils";
import { Eye, EyeSlash, LockKey } from "@phosphor-icons/react";
import { SoftButton } from "./SoftButton";

interface QuestionStepProps {
  question: Question;
  value: any;
  onChange: (val: any) => void;
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
  note,
  onNoteChange,
  visibility,
  onVisibilityChange,
  onNext,
  onBack,
  isFirst,
  isLast
}: QuestionStepProps) {
  const questionLabelId = `question-${question.id}-label`;
  const helperTextId = question.helperText ? `question-${question.id}-helper` : undefined;

  return (
    <div className="space-y-8">
      {/* Visibility Control */}
      <div className="flex w-fit flex-wrap items-center gap-2 rounded-lg border border-ankahe-border bg-ankahe-control-selected p-2">
        <VisibilityButton
          active={visibility === "share"}
          onClick={() => onVisibilityChange("share")}
          label="Share"
          icon={<Eye size={16} weight={visibility === "share" ? "fill" : "light"} />}
        />
        <VisibilityButton
          active={visibility === "private"}
          onClick={() => onVisibilityChange("private")}
          label="Private"
          icon={<LockKey size={16} weight={visibility === "private" ? "fill" : "light"} />}
        />
        <VisibilityButton
          active={visibility === "hide"}
          onClick={() => onVisibilityChange("hide")}
          label="Hide"
          icon={<EyeSlash size={16} weight={visibility === "hide" ? "fill" : "light"} />}
        />
      </div>

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

      <div className="py-4">
        <InputComponent 
          type={question.type} 
          options={question.options} 
          min={question.min} 
          max={question.max} 
          value={value} 
          onChange={onChange} 
          placeholder={question.helperText}
          labelledBy={questionLabelId}
          describedBy={helperTextId}
        />
      </div>

      <div className="space-y-3 rounded-sm border border-ankahe-paper-border bg-ankahe-paper p-5">
        <label htmlFor={`${question.id}-note`} className="type-ui-label block text-ankahe-text">
          Want to make this more yours?
        </label>
        <textarea
          id={`${question.id}-note`}
          value={note}
          onChange={(event) => onNoteChange(event.target.value)}
          rows={3}
          placeholder="Add an optional sentence in your own words."
          className="type-body w-full resize-none rounded-sm border border-ankahe-paper-border bg-ankahe-paper-muted p-4 text-ankahe-text placeholder:text-ankahe-muted/60 transition-colors focus:border-ankahe-accent focus:outline-none focus-visible:ring-1 focus-visible:ring-ankahe-focus"
        />
      </div>

      <div className="flex items-center gap-4 pt-8">
        {!isFirst && (
          <SoftButton variant="secondary" onClick={onBack}>
            Back
          </SoftButton>
        )}
        <SoftButton 
          className="flex-1 md:flex-none"
          onClick={onNext}
          variant={value ? "primary" : "secondary"}
        >
          {value ? (isLast ? "Review Manual" : "Add to my manual") : "Skip for now"}
        </SoftButton>
      </div>
    </div>
  );
}

function VisibilityButton({ active, onClick, label, icon }: any) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "type-ui-label min-h-11 flex items-center gap-2 px-3 py-1.5 rounded-sm transition-all border border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2",
        active 
          ? "bg-ankahe-control text-ankahe-text shadow-sm border-ankahe-border"
          : "text-ankahe-muted hover:text-ankahe-text hover:bg-ankahe-control-hover"
      )}
    >
      {icon}
      {label}
    </button>
  );
}

function InputComponent({ type, options, min, max, value, onChange, placeholder, labelledBy, describedBy }: any) {
  if (type === "text") {
    return (
      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Type your answer..."}
        className="type-answer-field w-full bg-transparent border-b-2 border-ankahe-border py-2 focus:border-ankahe-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-accent/40 transition-colors rounded-none outline-none text-ankahe-text placeholder:text-ankahe-muted/50"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
      />
    );
  }

  if (type === "textarea") {
    return (
      <textarea
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Type your answer..."}
        rows={4}
        className="type-answer-field w-full bg-ankahe-paper border border-ankahe-paper-border rounded-sm p-6 focus:border-ankahe-accent focus:outline-none focus-visible:ring-1 focus-visible:ring-ankahe-focus transition-colors resize-none shadow-sm text-ankahe-text placeholder:text-ankahe-muted/50"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
      />
    );
  }

  if (type === "scale") {
    return (
      <div className="space-y-6">
        <input
          type="range"
          min={min}
          max={max}
          value={value || min}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full accent-ankahe-accent focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ankahe-accent outline-none"
          aria-labelledby={labelledBy}
          aria-describedby={describedBy}
        />
        <div className="type-meta flex justify-between text-ankahe-muted px-1">
          <span>Min</span>
          <span className="type-tabular text-ankahe-text text-2xl font-semibold">{value || min}</span>
          <span>Max</span>
        </div>
      </div>
    );
  }

  if (type === "multiSelect") {
    return (
      <div className="grid gap-3 sm:grid-cols-2" role="group" aria-labelledby={labelledBy} aria-describedby={describedBy}>
        {options.map((opt: string) => {
          const isSelected = Array.isArray(value) ? value.includes(opt) : value === opt;
          return (
            <button
              key={opt}
              aria-pressed={isSelected}
              onClick={() => {
                let nextVal = Array.isArray(value) ? [...value] : (value ? [value] : []);
                if (isSelected) {
                  nextVal = nextVal.filter(v => v !== opt);
                } else {
                  nextVal.push(opt);
                }
                onChange(nextVal);
              }}
              className={cn(
                "min-h-20 px-5 py-4 rounded-sm text-left text-base font-semibold leading-snug transition-all border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2",
                isSelected 
                  ? "bg-ankahe-accent-soft text-ankahe-accent-dark border-ankahe-accent" 
                  : "bg-ankahe-paper border-ankahe-paper-border text-ankahe-text hover:bg-ankahe-paper-muted hover:border-ankahe-border-strong"
              )}
            >
              {opt}
            </button>
          )
        })}
      </div>
    );
  }

  if (type === "select") {
    return (
      <div className="grid gap-3 sm:grid-cols-2" role="group" aria-labelledby={labelledBy} aria-describedby={describedBy}>
        {options.map((opt: string) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            aria-pressed={value === opt}
            className={cn(
              "min-h-20 px-5 py-4 rounded-sm text-left text-base font-semibold leading-snug transition-all border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2",
              value === opt 
                ? "bg-ankahe-accent-soft text-ankahe-accent-dark border-ankahe-accent" 
                : "bg-ankahe-paper border-ankahe-paper-border text-ankahe-text hover:bg-ankahe-paper-muted hover:border-ankahe-border-strong"
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    );
  }

  return null;
}
