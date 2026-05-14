/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ArrowRight,
  Briefcase,
  ChatCenteredText,
  FileText,
  HandHeart,
  ShieldCheck,
  User,
  UsersThree,
} from "@phosphor-icons/react";
import type React from "react";
import { useMemo, useState } from "react";
import { ManualDepth, ManualState, ModeId, OnboardingContext, StorageMode } from "../lib/schemaTypes";
import { cn } from "../lib/utils";
import { SoftButton } from "./SoftButton";
import { StorageModeToggle } from "./StorageModeToggle";

interface SwitchboardProps {
  onStart: (mode: ModeId, onboarding?: OnboardingContext) => void;
  onLearnMore: () => void;
  storageMode: StorageMode;
  onStorageModeChange: (mode: StorageMode) => void;
}

type RecipientId = "manager" | "teammate" | "partner" | "friend" | "talk" | "self" | "sync";

interface RecipientOption {
  id: RecipientId;
  label: string;
  description: string;
  mode: ModeId;
  icon: React.ReactNode;
}

const RECIPIENTS: RecipientOption[] = [
  { id: "manager", label: "A manager", description: "Work context, focus, feedback, and pressure.", mode: "work", icon: <Briefcase size={22} weight="light" /> },
  { id: "teammate", label: "A teammate", description: "Collaboration rhythm and clearer handoffs.", mode: "work", icon: <UsersThree size={22} weight="light" /> },
  { id: "partner", label: "A partner", description: "Care, silence, repair, and what gets misread.", mode: "me", icon: <HandHeart size={22} weight="light" /> },
  { id: "friend", label: "A friend", description: "How support reaches you without guessing.", mode: "me", icon: <ChatCenteredText size={22} weight="light" /> },
  { id: "talk", label: "Someone I need to talk to", description: "A smaller brief for a hard conversation.", mode: "talk", icon: <FileText size={22} weight="light" /> },
  { id: "self", label: "Myself", description: "A private copy for naming your own context.", mode: "me", icon: <User size={22} weight="light" /> },
  { id: "sync", label: "Both of us", description: "A shared note for understanding each other.", mode: "us", icon: <UsersThree size={22} weight="light" /> },
];

const MISUNDERSTANDINGS = [
  "how I communicate",
  "what I need under pressure",
  "how I handle conflict",
  "how I show care",
  "how I work best",
  "what I need but struggle to ask for",
];

const DEPTHS: Array<{ id: ManualDepth; label: string; description: string }> = [
  { id: "note", label: "5-minute note", description: "A compact version for one conversation." },
  { id: "manual", label: "10-minute manual", description: "The clearest balance of depth and speed." },
  { id: "deep", label: "Deeper manual", description: "More room for nuance and private context." },
];

export function Switchboard({
  onStart,
  onLearnMore,
  storageMode,
  onStorageModeChange,
}: SwitchboardProps) {
  const [recipientId, setRecipientId] = useState<RecipientId>("manager");
  const [misunderstanding, setMisunderstanding] = useState(MISUNDERSTANDINGS[0]);
  const [depth, setDepth] = useState<ManualDepth>("manual");

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
    <div className="bg-ankahe-bg">
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-8 sm:px-6 md:py-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(420px,1fr)] lg:items-start lg:gap-16 lg:py-14">
        <div className="min-w-0 max-w-[680px] space-y-7">
          <div className="ankahe-enter ankahe-enter-0 space-y-5">
            <h1 className="type-mixed-heading max-w-[min(100%,680px)] text-ankahe-text">
              <span className="type-mixed-heading-main">Say it once</span>
              <span className="type-mixed-heading-emphasis">be understood</span>
            </h1>
            <p className="type-lead max-w-xl text-ankahe-muted">
              Write the things people usually have to guess. Ankahe turns them into a private manual you can keep for yourself or share on purpose.
            </p>
          </div>

          <div className="ankahe-enter ankahe-enter-1 flex flex-col gap-3 sm:flex-row sm:items-center">
            <SoftButton size="md" onClick={() => onStart(recipient.mode, onboarding)} icon={<ArrowRight size={16} />}>
              Begin privately
            </SoftButton>
            <button
              type="button"
              onClick={onLearnMore}
              className="type-ui-label min-h-11 px-3 py-2 text-ankahe-muted transition-colors hover:text-ankahe-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2"
            >
              FAQ
            </button>
          </div>

          <div className="ankahe-enter ankahe-enter-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <div className="flex items-center gap-2.5">
              <ShieldCheck size={18} className="text-ankahe-muted" weight="light" />
              <p className="type-caption text-ankahe-muted">Nothing is saved here. Answers stay in this tab.</p>
            </div>
            <StorageModeToggle value={storageMode} onChange={onStorageModeChange} />
          </div>
        </div>

        <aside
          aria-label="Manual setup"
          className="ankahe-enter ankahe-enter-aside min-w-0 rounded-lg border border-ankahe-border bg-ankahe-surface p-3 sm:p-4 md:p-6"
        >
          <div className="rounded-md border border-ankahe-paper-border bg-ankahe-paper px-4 py-5 md:px-7 md:py-8">
            <div className="space-y-7">
              <ChoiceGroup title="Who should understand you better">
                <div className="grid gap-3 sm:grid-cols-2">
                  {RECIPIENTS.map((item) => (
                    <ChoiceCard
                      key={item.id}
                      active={recipientId === item.id}
                      title={item.label}
                      description={item.description}
                      icon={item.icon}
                      onClick={() => setRecipientId(item.id)}
                    />
                  ))}
                </div>
              </ChoiceGroup>

              <div className="border-t border-ankahe-paper-border" />

              <div className="space-y-6">
                <ChoiceGroup title="What keeps getting misread" variant="secondary">
                  <div className="flex flex-wrap gap-2.5">
                    {MISUNDERSTANDINGS.map((item) => (
                      <SmallChoice key={item} active={misunderstanding === item} onClick={() => setMisunderstanding(item)}>
                        {item}
                      </SmallChoice>
                    ))}
                  </div>
                </ChoiceGroup>

                <ChoiceGroup title="How much do you want to say" variant="secondary">
                  <div className="grid gap-3">
                    {DEPTHS.map((item) => (
                      <ChoiceCard
                        key={item.id}
                        active={depth === item.id}
                        title={item.label}
                        description={item.description}
                        icon={<FileText size={22} weight="light" />}
                        onClick={() => setDepth(item.id)}
                      />
                    ))}
                  </div>
                </ChoiceGroup>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}

function ChoiceGroup({ title, children, variant = "primary" }: { title: string; children: React.ReactNode; variant?: "primary" | "secondary" }) {
  return (
    <section className="space-y-3">
      <h2 className={cn(
        variant === "primary"
          ? "type-panel-title text-ankahe-text"
          : "type-caption font-semibold uppercase tracking-wider text-ankahe-muted"
      )}>{title}</h2>
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
  key?: React.Key;
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
        "min-h-24 rounded-sm border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2",
        active
          ? "border-ankahe-accent bg-ankahe-accent-soft text-ankahe-accent-dark"
          : "border-ankahe-paper-border bg-ankahe-paper-muted text-ankahe-text hover:border-ankahe-border-strong hover:bg-ankahe-control-hover"
      )}
    >
      <span className="mb-3 flex items-center justify-between gap-4">
        <span className="type-ui-label">{title}</span>
        <span aria-hidden="true" className={active ? "text-ankahe-accent" : "text-ankahe-muted"}>{icon}</span>
      </span>
      <span className={cn(
        "type-caption block",
        active ? "text-ankahe-accent-dark/70" : "text-ankahe-muted"
      )}>{description}</span>
    </button>
  );
}

function SmallChoice({ active, onClick, children }: { key?: React.Key; active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "type-caption min-h-11 rounded-sm border px-3.5 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2",
        active
          ? "border-ankahe-accent bg-ankahe-accent-soft text-ankahe-accent-dark"
          : "border-ankahe-paper-border bg-ankahe-paper-muted text-ankahe-text hover:border-ankahe-border-strong"
      )}
    >
      {children}
    </button>
  );
}
