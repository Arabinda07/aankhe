/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * QuestionStep — page-level orchestrator for a single question.
 *
 * Responsibilities:
 *   - Render the question label and helper text
 *   - Delegate answer rendering to `AnswerInput` (from `inputs/`)
 *   - Manage nuance (note) disclosure
 *   - Manage per-question visibility controls
 *   - Handle sensitive skip actions
 *   - Render navigation (back / skip / continue)
 */

import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { CaretLeft } from "@phosphor-icons/react/dist/csr/CaretLeft";
import { Eye } from "@phosphor-icons/react/dist/csr/Eye";
import { EyeSlash } from "@phosphor-icons/react/dist/csr/EyeSlash";
import { LockKey } from "@phosphor-icons/react/dist/csr/LockKey";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { answerValueIsPresent, getSensitiveSkipAction } from "../lib/answerUiPolicy";
import type { Question, Visibility } from "../lib/schemaTypes";
import { cn } from "../lib/utils";
import { SoftButton } from "./SoftButton";
import { AnswerInput } from "./inputs";
import type { AnswerValue } from "./inputs";

// Re-export AnswerInput for consumers that imported it from QuestionStep
export { AnswerInput } from "./inputs";


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
  onSensitiveSkip: (action: { shouldClearAnswer: boolean, visibility: any }) => void;
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
  onSensitiveSkip,
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

  const handleChange = useCallback((val: string | string[] | number) => {
    onChange(val);
  }, [onChange]);

  const revealNuance = () => {
    setIsNuanceOpen(true);
    window.setTimeout(() => noteRef.current?.focus(), 0);
  };

  const handleSensitiveSkip = (reason: "doesNotFit" | "notReady") => {
    const action = getSensitiveSkipAction(reason);
    onSensitiveSkip(action);
  };

  return (
    <div className="space-y-5 md:space-y-6">
      <div className="space-y-3">
        <h2 id={questionLabelId} className="type-question-builder text-parichay-heading">
          {question.label}
        </h2>
        {question.helperText && (
          <p id={helperTextId} className="type-lead text-parichay-muted">
            {question.helperText}
          </p>
        )}
      </div>

      <div className="py-1">
        <AnswerInput
          question={question}
          value={value}
          onChange={handleChange}
          labelledBy={questionLabelId}
          describedBy={helperTextId}
        />
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <button
          type="button"
          onClick={() => handleSensitiveSkip("doesNotFit")}
          className="type-caption min-h-11 px-1 py-2 text-parichay-muted transition-colors hover:text-parichay-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2"
        >
          None of these fit
        </button>
        <button
          type="button"
          onClick={() => handleSensitiveSkip("notReady")}
          className="type-caption min-h-11 px-1 py-2 text-parichay-muted transition-colors hover:text-parichay-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2"
        >
          Not ready to answer this
        </button>
      </div>

      {showAnswerDetails && (
        <div className="space-y-4">
          <div className="space-y-3">
            {!isNuanceOpen ? (
              <button
                type="button"
                onClick={revealNuance}
                className="type-ui-label min-h-11 px-1 py-2 text-parichay-accent transition-colors hover:text-parichay-accent-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2"
              >
                Add nuance
              </button>
            ) : (
              <div className="space-y-2">
                <label htmlFor={`${question.id}-note`} className="type-ui-label block text-parichay-text">
                  Add nuance
                </label>
                <textarea
                  ref={noteRef}
                  id={`${question.id}-note`}
                  value={note}
                  onChange={(event) => onNoteChange(event.target.value)}
                  rows={3}
                  placeholder="Add context only if this answer needs your words."
                  className="type-body w-full resize-none rounded-sm border border-parichay-paper-border bg-parichay-paper-muted p-4 text-parichay-text placeholder:text-parichay-muted/60 transition-colors focus:border-parichay-accent focus:outline-none focus-visible:ring-1 focus-visible:ring-parichay-focus"
                />
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="type-caption text-parichay-muted">Visibility:</span>
              <span className="type-caption font-semibold text-parichay-text">{getVisibilityLabel(visibility)}</span>
              <span className="type-caption text-parichay-muted" aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => setIsVisibilityOpen((isOpen) => !isOpen)}
                className="type-caption min-h-11 px-1 py-2 font-semibold text-parichay-accent transition-colors hover:text-parichay-accent-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2"
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
                  className="type-caption min-h-11 px-1 py-2 text-parichay-muted transition-colors hover:text-parichay-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2"
                  aria-expanded={isVisibilityHelpOpen}
                  aria-controls={visibilityDescriptionId}
                >
                  What does this mean?
                </button>
                {isVisibilityHelpOpen && (
                  <p id={visibilityDescriptionId} className="type-caption max-w-2xl text-parichay-muted">
                    Share means included in links and exports. Private stays here. Hide leaves it out of the intro.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-2 md:pt-4">
        {!isFirst && (
          <button
            type="button"
            onClick={onBack}
            className="type-ui-label inline-flex min-h-11 items-center gap-2 px-1 py-2 text-parichay-muted transition-colors hover:text-parichay-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2"
          >
            <CaretLeft size={16} weight="light" aria-hidden="true" />
            Previous question
          </button>
        )}
        <button
          type="button"
          onClick={onNext}
          className="type-ui-label min-h-11 px-1 py-2 text-parichay-muted transition-colors hover:text-parichay-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2"
        >
          Skip
        </button>
        <SoftButton
          className="ml-auto min-h-11 min-w-36"
          onClick={onNext}
          disabled={!showAnswerDetails}
          variant="primary"
        >
          {isLast ? "Review intro" : "Continue"}
        </SoftButton>
      </div>
    </div>
  );
}

// ── Visibility sub-components (stay here — they're QuestionStep-specific) ──

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
      <p className="type-ui-label text-parichay-text" id={`${questionId}-visibility-label`}>Visibility</p>
      <RadioGroup.Root
        aria-labelledby={`${questionId}-visibility-label`}
        aria-describedby={describedBy}
        value={visibility}
        onValueChange={(value) => onVisibilityChange(value as Visibility)}
        className="flex w-full flex-wrap gap-2 rounded-sm border border-parichay-border bg-parichay-control-selected p-1 sm:w-fit"
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
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2",
        active
          ? "border-parichay-border bg-parichay-control text-parichay-text shadow-sm"
          : "text-parichay-muted hover:bg-parichay-control-hover hover:text-parichay-text"
      )}
    >
      {icon}
      {label}
    </RadioGroup.Item>
  );
}
