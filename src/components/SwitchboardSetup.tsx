/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight } from "@phosphor-icons/react/dist/csr/ArrowRight";
import { Briefcase } from "@phosphor-icons/react/dist/csr/Briefcase";
import { ChatCenteredText } from "@phosphor-icons/react/dist/csr/ChatCenteredText";
import { EnvelopeSimple } from "@phosphor-icons/react/dist/csr/EnvelopeSimple";
import { FileText } from "@phosphor-icons/react/dist/csr/FileText";
import { Handshake } from "@phosphor-icons/react/dist/csr/Handshake";
import { UsersThree } from "@phosphor-icons/react/dist/csr/UsersThree";
import { CheckCircle } from "@phosphor-icons/react/dist/csr/CheckCircle";
import type React from "react";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ManualDepth, ModeId, OnboardingContext } from "../lib/schemaTypes";
import { cn } from "../lib/utils";
import { SoftButton } from "./SoftButton";

interface SwitchboardSetupProps {
  onStart: (mode: ModeId, onboarding?: OnboardingContext) => void;
  onManualIntentPreload: () => void;
}

type RecipientId = "manager" | "teammate" | "partner" | "friend" | "talk" | "self" | "sync";
type SetupStep = 0 | 1 | 2;

interface RecipientOption {
  id: RecipientId;
  label: string;
  description: string;
  mode: ModeId;
  icon: React.ReactNode;
}

const RECIPIENTS: RecipientOption[] = [
  { id: "manager", label: "Work", description: "For a manager, teammate, client, or collaborator who needs the useful version.", mode: "work", icon: <Briefcase size={22} weight="light" /> },
  { id: "partner", label: "Someone close", description: "For someone who cares about you and wants fewer wrong guesses.", mode: "me", icon: <Handshake size={22} weight="light" /> },
  { id: "talk", label: "Hard conversation", description: "For a note before something you do not want to fumble.", mode: "talk", icon: <EnvelopeSimple size={22} weight="light" /> },
  { id: "sync", label: "Two of us", description: "For two people trying to stop explaining the same thing twice.", mode: "us", icon: <UsersThree size={22} weight="light" /> },
];

const MISREAD_TOPICS = [
  "how I communicate",
  "how I work best",
  "what I need when stressed",
  "how I show care",
  "what gets misread",
  "what helps things go better",
];

const DEPTHS: Array<{ id: ManualDepth; label: string; description: string }> = [
  { id: "note", label: "Quick intro", description: "Just the essentials for a fast read." },
  { id: "manual", label: "Standard intro", description: "Enough context to be useful without making it a project." },
  { id: "deep", label: "Deeper intro", description: "More room for care, context, and edge cases." },
];

export function SwitchboardSetup({ onStart, onManualIntentPreload }: SwitchboardSetupProps) {
  const [recipientId, setRecipientId] = useState<RecipientId>("manager");
  const [misunderstanding, setMisunderstanding] = useState(MISREAD_TOPICS[0]);
  const [depth, setDepth] = useState<ManualDepth>("manual");
  const [step, setStep] = useState<SetupStep>(0);

  const recipient = useMemo(
    () => RECIPIENTS.find((item) => item.id === recipientId) || RECIPIENTS[0],
    [recipientId]
  );

  const onboarding: OnboardingContext = {
    recipient: recipient.label.toLowerCase(),
    misunderstanding,
    depth,
  };

  return (
    <aside
      id="onboarding"
      aria-label="Intro setup"
      className="w-full min-w-0 max-w-[600px] justify-self-start sm:justify-self-center lg:justify-self-end rounded-lg sm:border sm:border-parichay-border sm:bg-parichay-surface py-6 sm:p-3 md:p-3 sm:shadow-sm scroll-mt-24 lg:scroll-mt-32"
    >
      <div className="rounded-md sm:border sm:border-parichay-paper-border sm:bg-parichay-paper sm:px-5 sm:py-6 md:px-8 md:py-10 sm:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
        <div className="space-y-8">
          <div className="flex items-center justify-between gap-4">
            <p className="type-meta text-parichay-muted">Step {step + 1} / 3</p>
            <div className="flex gap-1" aria-hidden="true">
              {[0, 1, 2].map((item) => (
                <span
                  key={item}
                  className={cn(
                    "block h-1.5 w-8 rounded-[3px]",
                    item <= step ? "bg-parichay-accent" : "bg-parichay-surface-soft"
                  )}
                />
              ))}
            </div>
          </div>

          {step === 0 && (
            <ChoiceGroup title="Who is this for?">
              <div className="grid gap-3 sm:grid-cols-2">
                {RECIPIENTS.map((item) => (
                  <div key={item.id}>
                    <ChoiceCard
                      active={recipientId === item.id}
                      title={item.label}
                      description={item.description}
                      icon={item.icon}
                      onClick={() => setRecipientId(item.id)}
                    />
                  </div>
                ))}
              </div>
            </ChoiceGroup>
          )}

          {step === 1 && (
            <ChoiceGroup title="What should they understand?">
              <div className="flex flex-wrap gap-3">
                {MISREAD_TOPICS.map((item) => (
                  <span key={item}>
                    <SmallChoice active={misunderstanding === item} onClick={() => setMisunderstanding(item)}>
                      {item}
                    </SmallChoice>
                  </span>
                ))}
              </div>
            </ChoiceGroup>
          )}

          {step === 2 && (
            <ChoiceGroup title="How long should it be?">
              <div className="grid gap-3">
                {DEPTHS.map((item) => (
                  <div key={item.id}>
                    <ChoiceCard
                      active={depth === item.id}
                      title={item.label}
                      description={item.description}
                      icon={<FileText size={22} weight="light" />}
                      onClick={() => setDepth(item.id)}
                    />
                  </div>
                ))}
              </div>
            </ChoiceGroup>
          )}

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep((current) => Math.max(0, current - 1) as SetupStep)}
                className="type-ui-label min-h-11 px-1 py-2 text-parichay-muted transition-colors hover:text-parichay-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2"
              >
                Back
              </button>
            )}
            <SoftButton
              size="md"
              onClick={() => {
                if (step < 2) {
                  setStep((current) => Math.min(2, current + 1) as SetupStep);
                  return;
                }

                onManualIntentPreload();
                onStart(recipient.mode, onboarding);
              }}
              onFocus={onManualIntentPreload}
              onPointerEnter={onManualIntentPreload}
              onTouchStart={onManualIntentPreload}
              icon={<ArrowRight size={16} />}
              className="ml-auto min-w-44"
            >
              {step < 2 ? "Continue" : "Start the questions"}
            </SoftButton>
          </div>
        </div>
      </div>
    </aside>
  );
}

function ChoiceGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-5">
      <h2 className="type-panel-title text-parichay-heading">{title}</h2>
      {children}
    </section>
  );
}

function ChoiceCard({
  active,
  title,
  description,
  icon,
  onClick,
}: {
  active: boolean;
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "group h-full min-h-24 w-full rounded-md p-4 text-left transition-all duration-300 ease-[var(--ease-out-expo)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2",
        active
          ? "bg-parichay-accent-soft text-parichay-accent-text ring-1 ring-inset ring-parichay-accent/20"
          : "bg-parichay-paper-muted/50 text-parichay-text ring-1 ring-inset ring-parichay-paper-border hover:bg-parichay-paper-muted hover:ring-parichay-border"
      )}
    >
      <span className="mb-3 flex items-center justify-between gap-4">
        <span className="type-ui-label flex items-center gap-2">
          {title}
          <AnimatePresence>
            {active && (
              <motion.span
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-parichay-accent flex items-center"
              >
                <CheckCircle size={16} weight="fill" aria-label="Selected" />
              </motion.span>
            )}
          </AnimatePresence>
        </span>
        <span aria-hidden="true" className={cn("transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1", active ? "text-parichay-accent" : "text-parichay-muted")}>{icon}</span>
      </span>
      <span className={cn(
        "type-caption block",
        active ? "text-parichay-accent-text-muted" : "text-parichay-muted"
      )}>{description}</span>
    </button>
  );
}

function SmallChoice({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "type-caption min-h-11 rounded-sm px-4 py-2 transition-all duration-300 ease-[var(--ease-out-expo)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2",
        active
          ? "bg-parichay-accent text-parichay-on-accent"
          : "bg-transparent text-parichay-text ring-1 ring-inset ring-parichay-border hover:bg-parichay-surface-halo-hover hover:ring-parichay-border-strong"
      )}
    >
      <span className="flex items-center gap-2">
        {children}
        <AnimatePresence>
          {active && (
            <motion.span
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center"
            >
              <CheckCircle size={14} weight="fill" aria-label="Selected" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </button>
  );
}
