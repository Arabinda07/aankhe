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
  visibility,
  onVisibilityChange,
  onNext,
  onBack,
  isFirst,
  isLast
}: QuestionStepProps) {
  return (
    <div className="space-y-8">
      {/* Visibility Control */}
      <div className="flex w-fit flex-wrap items-center gap-2 rounded-lg border border-ankahe-border bg-ankahe-surface-soft p-2">
        <VisibilityButton
          active={visibility === "share"}
          onClick={() => onVisibilityChange("share")}
          label="Share"
          icon={<Eye size={14} />}
        />
        <VisibilityButton
          active={visibility === "private"}
          onClick={() => onVisibilityChange("private")}
          label="Private"
          icon={<LockKey size={14} />}
        />
        <VisibilityButton
          active={visibility === "hide"}
          onClick={() => onVisibilityChange("hide")}
          label="Hide"
          icon={<EyeSlash size={14} />}
        />
      </div>

      <div className="space-y-4">
        <h2 className="type-question text-ankahe-text">
          {question.label}
        </h2>
        {question.helperText && (
          <p className="type-lead text-ankahe-muted">
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
        "type-ui-label min-h-11 flex items-center gap-2 px-3 py-1.5 rounded-sm transition-all border border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-accent focus-visible:ring-offset-2",
        active 
          ? "bg-ankahe-surface text-ankahe-text shadow-sm border-ankahe-border"
          : "text-ankahe-muted hover:text-ankahe-text hover:bg-ankahe-surface/50"
      )}
    >
      {icon}
      {label}
    </button>
  );
}

function InputComponent({ type, options, min, max, value, onChange, placeholder }: any) {
  if (type === "text") {
    return (
      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Type your answer..."}
        className="type-answer-field w-full bg-transparent border-b-2 border-ankahe-border py-2 focus:border-ankahe-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-accent/40 transition-colors rounded-none outline-none text-ankahe-text placeholder:text-ankahe-muted/50"
        aria-label={placeholder || "Answer to question"}
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
        className="type-answer-field w-full bg-ankahe-surface border border-ankahe-border rounded-sm p-6 focus:border-ankahe-accent focus:outline-none focus-visible:ring-1 focus-visible:ring-ankahe-accent/50 transition-colors resize-none shadow-sm text-ankahe-text placeholder:text-ankahe-muted/50"
        aria-label={placeholder || "Answer to question"}
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
          aria-label={`Scale from ${min} to ${max}`}
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
      <div className="flex flex-wrap gap-3">
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
                "min-h-11 px-6 py-3 rounded-sm text-base font-semibold leading-snug transition-all border-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-accent focus-visible:ring-offset-2",
                isSelected 
                  ? "bg-ankahe-accent text-ankahe-on-accent border-ankahe-accent" 
                  : "bg-ankahe-surface border-ankahe-border text-ankahe-text hover:border-ankahe-accent/50"
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
      <div className="flex flex-wrap gap-3">
        {options.map((opt: string) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            aria-pressed={value === opt}
            className={cn(
              "min-h-11 px-6 py-3 rounded-sm text-base font-semibold leading-snug transition-all border-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-accent focus-visible:ring-offset-2",
              value === opt 
                ? "bg-ankahe-accent text-ankahe-on-accent border-ankahe-accent" 
                : "bg-ankahe-surface border-ankahe-border text-ankahe-text hover:border-ankahe-accent/50"
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
