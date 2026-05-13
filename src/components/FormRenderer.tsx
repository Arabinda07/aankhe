/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ModeConfig, Question, Visibility } from "../lib/schemaTypes";
import { QuestionStep } from "./QuestionStep";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { useStepNavigation } from "../hooks/useStepNavigation";

interface FormRendererProps {
  config: ModeConfig;
  getAnswer: (questionId: string) => string | string[] | number | undefined;
  getVisibility: (question: Question) => Visibility;
  updateAnswer: (id: string, val: any) => void;
  updateVisibility: (id: string, vis: Visibility) => void;
  onFinish: () => void;
}

export function FormRenderer({
  config,
  getAnswer,
  getVisibility,
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
        <div className="h-1.5 w-full overflow-hidden rounded-[3px] bg-ankahe-surface-soft">
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
            value={getAnswer(currentQuestion.id)}
            onChange={(val) => updateAnswer(currentQuestion.id, val)}
            visibility={getVisibility(currentQuestion)}
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
                "block h-2 rounded-[3px] transition-all",
                i === currentStepIndex ? "w-6 bg-ankahe-accent-dark" : (getAnswer(q.id) ? "w-2 bg-ankahe-accent/60" : "w-2 bg-ankahe-surface-soft group-hover:bg-ankahe-border")
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
