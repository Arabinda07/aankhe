/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback } from "react";
import { ModeConfig, Question } from "../lib/schemaTypes";
import { useStepNavigation } from "./useStepNavigation";
import { ManualWorkspace } from "./useManualState";

export function useQuestionController(
  config: ModeConfig,
  workspace: ManualWorkspace,
  onFinish: () => void
) {
  const { currentStepIndex, progress, next, back, isFirst, isLast } = useStepNavigation(
    config.questions.length,
    onFinish
  );

  const currentQuestion = config.questions[currentStepIndex];
  const section = config.sections.find((s) => s.id === currentQuestion.sectionId);
  const sectionIndex = config.sections.findIndex((s) => s.id === section?.id);

  const handleAnswerChange = useCallback(
    (question: Question, value: string | string[] | number) => {
      workspace.updateAnswer(question.id, value);
    },
    [workspace]
  );

  const handleSensitiveSkip = useCallback(
    (question: Question, action: { shouldClearAnswer: boolean, visibility: any }) => {
      if (action.shouldClearAnswer) {
        workspace.clearAnswer(question.id);
        workspace.updateAnswerNote(question.id, "");
      }
      workspace.updateVisibility(question.id, action.visibility);
      next();
    },
    [workspace, next]
  );

  return {
    currentQuestion,
    section,
    sectionIndex,
    progress,
    currentStepIndex,
    totalSteps: config.questions.length,
    getStepProps: () => ({
      question: currentQuestion,
      value: workspace.getAnswer(currentQuestion.id),
      onChange: (val: string | string[] | number) => handleAnswerChange(currentQuestion, val),
      onClear: () => workspace.clearAnswer(currentQuestion.id),
      note: workspace.getAnswerNote(currentQuestion.id),
      onNoteChange: (note: string) => workspace.updateAnswerNote(currentQuestion.id, note),
      visibility: workspace.getVisibility(currentQuestion),
      onVisibilityChange: (vis: any) => workspace.updateVisibility(currentQuestion.id, vis),
      onSensitiveSkip: (action: { shouldClearAnswer: boolean, visibility: any }) => handleSensitiveSkip(currentQuestion, action),
      onNext: next,
      onBack: back,
      isFirst,
      isLast,
    }),
  };
}
