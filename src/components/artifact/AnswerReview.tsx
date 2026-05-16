/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Eye } from "@phosphor-icons/react/dist/csr/Eye";
import { EyeSlash } from "@phosphor-icons/react/dist/csr/EyeSlash";
import { LockKey } from "@phosphor-icons/react/dist/csr/LockKey";
import { PencilSimple } from "@phosphor-icons/react/dist/csr/PencilSimple";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { answerValueIsPresent } from "../../lib/answerUiPolicy";
import type { ManualWorkspace } from "../../hooks/useManualState";
import type { Question, Visibility } from "../../lib/schemaTypes";
import { findQuestionOption, getOptionLabel } from "../../lib/protocolManifest";
import { cn } from "../../lib/utils";
import { AnswerInput } from "../QuestionStep";

interface AnswerReviewProps {
  workspace: ManualWorkspace;
}

const VISIBILITY_GROUPS: Array<{
  id: Visibility;
  title: string;
  description: string;
}> = [
  {
    id: "share",
    title: "Included",
    description: "These answers can leave the page in share links and exports.",
  },
  {
    id: "private",
    title: "Private",
    description: "These answers stay local unless you change them.",
  },
  {
    id: "hide",
    title: "Omitted",
    description: "These answers do not appear in preview, share, or export.",
  },
];

export function AnswerReview({ workspace }: AnswerReviewProps) {
  const answeredQuestions = workspace.config.questions.filter((question) =>
    answerValueIsPresent(workspace.getAnswer(question.id))
  );

  return (
    <section className="space-y-6 rounded-lg border border-parichay-border bg-parichay-surface p-5 md:p-6">
      <div className="space-y-2">
        <h3 className="type-panel-title text-parichay-heading">Review answers before sharing</h3>
        <p className="type-caption max-w-2xl text-parichay-muted">
          Check what is included, what stays private, and what is omitted before you send anything.
        </p>
      </div>

      {answeredQuestions.length === 0 ? (
          <p className="type-body rounded-sm border border-parichay-paper-border bg-parichay-paper p-4 text-parichay-muted">
          Your intro will start taking shape here.
        </p>
      ) : (
        <div className="space-y-6">
          {VISIBILITY_GROUPS.map((group) => {
            const groupQuestions = answeredQuestions.filter((question) => workspace.getVisibility(question) === group.id);
            return (
              <div key={group.id} className="space-y-3 border-t border-parichay-border pt-5 first:border-t-0 first:pt-0">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h4 className="type-ui-label text-parichay-heading">{group.title}</h4>
                    <p className="type-caption text-parichay-muted">{group.description}</p>
                  </div>
                  <span className="type-tabular type-caption text-parichay-muted">{groupQuestions.length}</span>
                </div>
                {groupQuestions.length === 0 ? (
                  <p className="type-caption rounded-sm border border-parichay-paper-border bg-parichay-paper-muted px-3 py-2 text-parichay-muted">
                    No answers here.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {groupQuestions.map((question) => (
                      <div key={question.id}>
                        <ReviewAnswer
                          question={question}
                          workspace={workspace}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

function ReviewAnswer({
  question,
  workspace,
}: {
  question: Question;
  workspace: ManualWorkspace;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const value = workspace.getAnswer(question.id);
  const note = workspace.getAnswerNote(question.id);
  const visibility = workspace.getVisibility(question);
  const labelId = `review-${question.id}-label`;
  const helperId = question.helperText ? `review-${question.id}-helper` : undefined;

  return (
    <article className="space-y-4 rounded-sm border border-parichay-paper-border bg-parichay-paper p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <h5 id={labelId} className="type-body font-semibold text-parichay-heading">
            {question.label}
          </h5>
          {question.helperText && (
            <p id={helperId} className="type-caption text-parichay-muted">
              {question.helperText}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={() => setIsEditing((current) => !current)}
          className="type-ui-label flex min-h-11 items-center gap-2 rounded-sm border border-parichay-border bg-parichay-control px-3 py-1.5 text-parichay-text transition-colors hover:bg-parichay-control-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2"
          aria-expanded={isEditing}
        >
          <PencilSimple size={16} weight="light" />
          {isEditing ? "Done" : "Edit answer"}
        </button>
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <AnswerInput
            question={question}
            value={value}
            onChange={(nextValue) => workspace.updateAnswer(question.id, nextValue)}
            labelledBy={labelId}
            describedBy={helperId}
          />
          <textarea
            value={note}
            onChange={(event) => workspace.updateAnswerNote(question.id, event.target.value)}
            rows={2}
            placeholder="Optional nuance"
            className="type-body w-full resize-none rounded-sm border border-parichay-paper-border bg-parichay-paper-muted p-4 text-parichay-text placeholder:text-parichay-muted/60 transition-colors focus:border-parichay-accent focus:outline-none focus-visible:ring-1 focus-visible:ring-parichay-focus"
            aria-label={`Optional nuance for ${question.label}`}
          />
          <ReviewVisibility
            questionId={question.id}
            visibility={visibility}
            onVisibilityChange={(nextVisibility) => workspace.updateVisibility(question.id, nextVisibility)}
          />
        </div>
      ) : (
        <div className="space-y-3">
          <p className="type-body text-parichay-text">{formatAnswer(value, question)}</p>
          {note && <p className="type-caption text-parichay-muted">In my words: {note}</p>}
          <VisibilityBadge visibility={visibility} />
        </div>
      )}
    </article>
  );
}

function ReviewVisibility({
  questionId,
  visibility,
  onVisibilityChange,
}: {
  questionId: string;
  visibility: Visibility;
  onVisibilityChange: (visibility: Visibility) => void;
}) {
  return (
    <div>
      <p className="type-ui-label mb-2 text-parichay-text" id={`review-visibility-${questionId}-label`}>Visibility</p>
      <RadioGroup.Root
        value={visibility}
        onValueChange={(value) => onVisibilityChange(value as Visibility)}
        aria-labelledby={`review-visibility-${questionId}-label`}
        className="flex w-full flex-wrap gap-2 rounded-sm border border-parichay-border bg-parichay-control-selected p-1 sm:w-fit"
      >
        {[
          { id: "share" as const, label: "Share", icon: <Eye size={16} weight={visibility === "share" ? "fill" : "light"} /> },
          { id: "private" as const, label: "Private", icon: <LockKey size={16} weight={visibility === "private" ? "fill" : "light"} /> },
          { id: "hide" as const, label: "Hide", icon: <EyeSlash size={16} weight={visibility === "hide" ? "fill" : "light"} /> },
        ].map((option) => (
          <RadioGroup.Item
            key={option.id}
            value={option.id}
            className={cn(
              "type-ui-label min-h-11 flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-sm border border-transparent px-3 py-1.5 transition-all sm:flex-none",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2",
              visibility === option.id
                ? "border-parichay-border bg-parichay-control text-parichay-text shadow-sm"
                : "text-parichay-muted hover:bg-parichay-control-hover hover:text-parichay-text"
            )}
          >
            {option.icon}
            {option.label}
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>
    </div>
  );
}

function VisibilityBadge({ visibility }: { visibility: Visibility }) {
  const details = {
    share: { label: "Included", icon: <Eye size={16} weight="light" /> },
    private: { label: "Private", icon: <LockKey size={16} weight="light" /> },
    hide: { label: "Omitted", icon: <EyeSlash size={16} weight="light" /> },
  }[visibility];

  return (
    <span className="type-caption inline-flex min-h-11 items-center gap-2 rounded-sm border border-parichay-border bg-parichay-paper-muted px-3 py-1.5 text-parichay-muted">
      {details.icon}
      {details.label}
    </span>
  );
}

function formatAnswer(value: unknown, question?: Question): string {
  if (Array.isArray(value)) {
    return value.map((item) => formatAnswer(item, question)).join(", ");
  }

  if (value === undefined || value === null || value === "") {
    return "No answer yet.";
  }

  const stringValue = String(value);
  const option = question ? findQuestionOption(question, stringValue) : undefined;
  return option ? getOptionLabel(option) : stringValue;
}
