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
  SealCheck,
  ShieldCheck,
  User,
  UsersThree,
} from "@phosphor-icons/react";
import type React from "react";
import { useMemo, useState } from "react";
import { ManualDepth, ModeId, OnboardingContext, StorageMode } from "../lib/schemaTypes";
import { cn } from "../lib/utils";
import { SAMPLE_PERSONAL_STATE } from "../lib/sampleState";
import { SoftButton } from "./SoftButton";
import { StorageModeToggle } from "./StorageModeToggle";

interface SwitchboardProps {
  onStart: (mode: ModeId, onboarding?: OnboardingContext) => void;
  onTrySample: (sample: any) => void;
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
  onTrySample,
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
      <section className="mx-auto grid min-h-[calc(100dvh-4rem)] max-w-7xl grid-cols-1 gap-12 px-6 py-10 md:py-14 lg:grid-cols-[minmax(0,0.82fr)_minmax(420px,1fr)] lg:items-center lg:gap-16">
        <div className="min-w-0 max-w-[680px] space-y-9">
          <div className="ankahe-enter ankahe-enter-0 space-y-6">
            <h1 className="type-mixed-heading max-w-[680px] text-ankahe-text">
              <span className="type-mixed-heading-main">Say it once</span>
              <span className="type-mixed-heading-emphasis">be understood</span>
            </h1>
            <p className="type-lead max-w-xl text-ankahe-muted">
              Write the things people usually have to guess. Ankahe turns them into a private manual you can keep for yourself or share on purpose.
            </p>
          </div>

          <div className="ankahe-enter ankahe-enter-1 space-y-5 rounded-lg border border-ankahe-border bg-ankahe-surface px-5 py-5 md:px-6">
            <div className="flex items-start gap-3">
              <ShieldCheck size={22} className="mt-0.5 text-ankahe-muted" weight="light" />
              <div className="space-y-1">
                <p className="type-ui-label text-ankahe-text">Nothing is saved here</p>
                <p className="type-caption text-ankahe-muted">Answers stay in this tab unless you choose Save in Link</p>
              </div>
            </div>
            <StorageModeToggle value={storageMode} onChange={onStorageModeChange} />
          </div>

          <div className="ankahe-enter ankahe-enter-2 flex flex-col gap-3 sm:flex-row">
            <SoftButton size="md" onClick={() => onStart(recipient.mode, onboarding)} icon={<ArrowRight size={16} />}>
              Begin privately
            </SoftButton>
            <SoftButton size="md" variant="secondary" onClick={() => onTrySample(SAMPLE_PERSONAL_STATE)}>
              Read a sample
            </SoftButton>
            <SoftButton size="md" variant="secondary" onClick={onLearnMore}>
              FAQ
            </SoftButton>
          </div>

          <ul className="ankahe-enter ankahe-enter-3 flex flex-col gap-5 pt-2 sm:flex-row sm:flex-wrap sm:gap-x-10 sm:gap-y-5">
            <PromiseItem icon={<SealCheck size={22} weight="light" />} title="You choose what leaves" text="Included answers can travel. Private answers stay here. Omitted answers are left out." />
          </ul>
        </div>

        <aside
          aria-label="Manual setup"
          className="ankahe-enter ankahe-enter-aside min-w-0 rounded-lg border border-ankahe-border bg-ankahe-surface p-4 md:p-6"
        >
          <div className="rounded-md border border-ankahe-paper-border bg-ankahe-paper px-5 py-6 md:px-7 md:py-8">
            <div className="space-y-8">
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

              <ChoiceGroup title="What keeps getting misread">
                <div className="flex flex-wrap gap-2.5">
                  {MISUNDERSTANDINGS.map((item) => (
                    <SmallChoice key={item} active={misunderstanding === item} onClick={() => setMisunderstanding(item)}>
                      {item}
                    </SmallChoice>
                  ))}
                </div>
              </ChoiceGroup>

              <ChoiceGroup title="How much do you want to say">
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
        </aside>
      </section>
    </div>
  );
}

function PromiseItem({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <li className="flex items-start gap-3.5">
      <div className="mt-0.5 text-ankahe-muted">{icon}</div>
      <div>
        <p className="type-ui-label text-ankahe-text">{title}</p>
        <p className="type-caption text-ankahe-muted">{text}</p>
      </div>
    </li>
  );
}

function ChoiceGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="type-panel-title text-ankahe-text">{title}</h2>
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
      <span className="type-caption block text-ankahe-muted">{description}</span>
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
