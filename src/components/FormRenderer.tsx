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
  getAnswerNote: (questionId: string) => string;
  getVisibility: (question: Question) => Visibility;
  updateAnswer: (id: string, val: any) => void;
  clearAnswer: (id: string) => void;
  updateAnswerNote: (id: string, note: string) => void;
  updateVisibility: (id: string, vis: Visibility) => void;
  recognitionSummaries: string[];
  onFinish: () => void;
}

export function FormRenderer({
  config,
  getAnswer,
  getAnswerNote,
  getVisibility,
  updateAnswer,
  clearAnswer,
  updateAnswerNote,
  updateVisibility,
  recognitionSummaries,
  onFinish
}: FormRendererProps) {
  const {
    currentStepIndex,
    progress,
    next,
    back,
    isFirst,
    isLast
  } = useStepNavigation(config.questions.length, onFinish);

  const currentQuestion = config.questions[currentStepIndex];
  const section = config.sections.find(s => s.id === currentQuestion.sectionId);
  const sectionIndex = config.sections.findIndex(s => s.id === section?.id);

  return (
    <div className="space-y-8 md:space-y-10">
      <div className="space-y-3 md:space-y-4">
        <div className="type-meta flex items-center justify-between text-ankahe-muted">
          <div className="flex items-center gap-2">
            <span className={cn("px-2 py-0.5 rounded bg-ankahe-surface-soft text-ankahe-text")}>
              Section {sectionIndex + 1}
            </span>
            <span>{section?.title}</span>
          </div>
          <span>{currentStepIndex + 1} / {config.questions.length}</span>
        </div>
        
        <div className="h-1.5 w-full overflow-hidden rounded-[3px] bg-ankahe-surface-soft">
          <motion.div 
            className={cn("h-full w-full bg-ankahe-accent origin-left")}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
            transition={{ type: "spring", bounce: 0, duration: 0.5 }}
          />
        </div>
      </div>

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
            onClear={() => clearAnswer(currentQuestion.id)}
            note={getAnswerNote(currentQuestion.id)}
            onNoteChange={(note) => updateAnswerNote(currentQuestion.id, note)}
            visibility={getVisibility(currentQuestion)}
            onVisibilityChange={(vis) => updateVisibility(currentQuestion.id, vis)}
            onNext={next}
            onBack={back}
            isFirst={isFirst}
            isLast={isLast}
          />
        </motion.div>
      </AnimatePresence>


    </div>
  );
}
