/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useRef } from "react";
import { ModeConfig, Question } from "../lib/schemaTypes";
import { useStepNavigation } from "./useStepNavigation";
import { ManualWorkspace } from "./useManualState";
import { getAnswerComponentForQuestion } from "../lib/answerUiPolicy";

/** Single-select components that should auto-advance after choosing. */
const AUTO_ADVANCE_COMPONENTS = new Set([
  "radioCards",
  "pairedChoice",
  "segmentedTriState",
  "labeledScale",
  "nativeSelect",
]);

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

  const autoAdvanceTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    return () => {
      if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    };
  }, []);

  const handleAnswerChange = useCallback(
    (question: Question, value: string | string[] | number) => {
      workspace.updateAnswer(question.id, value);

      const component = getAnswerComponentForQuestion(question);
      if (AUTO_ADVANCE_COMPONENTS.has(component)) {
        if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
        autoAdvanceTimer.current = setTimeout(() => next(), 350);
      }
    },
    [workspace, next]
  );

  const handleSensitiveSkip = useCallback(
    (question: Question, action: { shouldClearAnswer: boolean, visibility: any }) => {
      if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
      
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
