/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { ModeConfig, ManualState, Visibility } from "../lib/schemaTypes";
import { QuestionStep } from "./QuestionStep";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { useStepNavigation } from "../hooks/useStepNavigation";

interface FormRendererProps {
  config: ModeConfig;
  state: ManualState;
  updateAnswer: (id: string, val: any) => void;
  updateVisibility: (id: string, vis: Visibility) => void;
  onFinish: () => void;
}

export function FormRenderer({
  config,
  state,
  updateAnswer,
  updateVisibility,
  onFinish
}: FormRendererProps) {
  const {
    currentStepIndex,
    progress,
    next,
    back,
    jumpToStep,
    isFirst,
    isLast
  } = useStepNavigation(config.questions.length, onFinish);

  const currentQuestion = config.questions[currentStepIndex];
  const section = config.sections.find(s => s.id === currentQuestion.sectionId);
  const sectionIndex = config.sections.findIndex(s => s.id === section?.id);

  return (
    <div className="space-y-12">
      {/* Header / Section Indicator */}
      <div className="space-y-4">
        <div className="type-meta flex items-center justify-between text-ankahe-muted">
          <div className="flex items-center gap-2">
            <span className={cn("px-2 py-0.5 rounded bg-ankahe-surface-soft text-ankahe-text")}>
              Section {sectionIndex + 1}
            </span>
            <span>{section?.title}</span>
          </div>
          <span>{currentStepIndex + 1} / {config.questions.length}</span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-ankahe-surface-soft rounded-full overflow-hidden">
          <motion.div 
            className={cn("h-full bg-ankahe-accent")}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", bounce: 0, duration: 0.5 }}
          />
        </div>
      </div>

      {/* Main Form Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <QuestionStep
            question={currentQuestion}
            value={state.answers[currentQuestion.id]}
            onChange={(val) => updateAnswer(currentQuestion.id, val)}
            visibility={state.visibilityByQuestion[currentQuestion.id] || currentQuestion.defaultVisibility}
            onVisibilityChange={(vis) => updateVisibility(currentQuestion.id, vis)}
            onNext={next}
            onBack={back}
            isFirst={isFirst}
            isLast={isLast}
          />
        </motion.div>
      </AnimatePresence>

      {/* Quick Nav */}
      <div className="hidden md:flex flex-wrap gap-2 pt-12 border-t border-ankahe-border" aria-label="Question shortcuts">
        {config.questions.map((q, i) => (
          <button
            key={q.id}
            onClick={() => jumpToStep(i)}
            className="group min-w-11 min-h-11 inline-flex items-center justify-center rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-accent focus-visible:ring-offset-2"
            aria-label={`Go to question ${i + 1}: ${q.label}`}
            aria-current={i === currentStepIndex ? "step" : undefined}
          >
            <span
              className={cn(
                "block h-2 rounded-full transition-all",
                i === currentStepIndex ? "w-6 bg-ankahe-accent-dark" : (state.answers[q.id] ? "w-2 bg-ankahe-accent/60" : "w-2 bg-ankahe-surface-soft group-hover:bg-ankahe-border")
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
