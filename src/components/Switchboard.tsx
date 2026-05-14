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
  { id: "manager", label: "A manager", description: "Work vibes, focus hours, and how you handle stress.", mode: "work", icon: <Briefcase size={22} weight="light" /> },
  { id: "teammate", label: "A teammate", description: "Collab rhythm and how to actually hand things off to you.", mode: "work", icon: <UsersThree size={22} weight="light" /> },
  { id: "partner", label: "A partner", description: "Care, boundaries, and the stuff they usually misread.", mode: "me", icon: <HandHeart size={22} weight="light" /> },
  { id: "friend", label: "A friend", description: "How to support you without having to guess.", mode: "me", icon: <ChatCenteredText size={22} weight="light" /> },
  { id: "talk", label: "Someone I need to talk to", description: "A cheat sheet for a conversation you're dreading.", mode: "talk", icon: <FileText size={22} weight="light" /> },
  { id: "self", label: "Myself", description: "Just a private brain dump to figure your own head out.", mode: "me", icon: <User size={22} weight="light" /> },
  { id: "sync", label: "Both of us", description: "A shared note so we can actually get on the same page.", mode: "us", icon: <UsersThree size={22} weight="light" /> },
];

const MISUNDERSTANDINGS = [
  "how I actually communicate",
  "what happens when I'm stressed",
  "how I fight",
  "how I show care",
  "how I actually work",
  "what I won't ask for",
];

const DEPTHS: Array<{ id: ManualDepth; label: string; description: string }> = [
  { id: "note", label: "5-minute note", description: "Just the essentials for a quick sync." },
  { id: "manual", label: "10-minute manual", description: "Enough detail to actually be useful." },
  { id: "deep", label: "Deeper manual", description: "The full deep dive. Take your time." },
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
      <section className="mx-auto grid max-w-[90rem] grid-cols-1 gap-12 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-[1.1fr_minmax(420px,1fr)] xl:grid-cols-[1.25fr_minmax(460px,1fr)] lg:items-start lg:gap-20 lg:py-32 xl:py-40">
        <div className="min-w-0 max-w-[760px] space-y-10 lg:space-y-12 lg:pt-8 xl:pt-12">
          <div className="ankahe-enter ankahe-enter-0 space-y-6 md:space-y-8">
            <h1 className="type-mixed-heading max-w-[min(100%,720px)] text-ankahe-text">
              <span className="type-mixed-heading-main">Everything</span>
              <span className="type-mixed-heading-emphasis">before you ask</span>
            </h1>
            <p className="type-lead max-w-xl text-ankahe-muted">
              Explaining your whole deal to new people is exhausting. Write it down once, keep the messy parts private, and just hand them the link. Skip the guessing games.
            </p>
          </div>

          <div className="ankahe-enter ankahe-enter-1 flex flex-col gap-4 sm:flex-row sm:items-center">
            <SoftButton size="md" onClick={() => onStart(recipient.mode, onboarding)} icon={<ArrowRight size={16} />}>
              Start writing
            </SoftButton>
            <SoftButton
              variant="secondary"
              size="md"
              onClick={onLearnMore}
            >
              How does this actually work?
            </SoftButton>
          </div>

          <div className="ankahe-enter ankahe-enter-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <div className="flex items-center gap-3">
              <ShieldCheck size={20} className="text-ankahe-muted" weight="light" />
              <p className="type-caption text-ankahe-muted">Nothing is saved to a server. This tab is a burner space.</p>
            </div>
            <StorageModeToggle value={storageMode} onChange={onStorageModeChange} />
          </div>
        </div>

        <aside
          aria-label="Manual setup"
          className="ankahe-enter ankahe-enter-aside min-w-0 rounded-[2rem] border border-ankahe-border bg-ankahe-surface p-2 sm:p-3 md:p-3 shadow-sm"
        >
          <div className="rounded-[calc(2rem-0.75rem)] border border-ankahe-paper-border bg-ankahe-paper px-5 py-6 md:px-8 md:py-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
            <div className="space-y-10">
              <ChoiceGroup title="Who should understand you better">
                <div className="grid gap-4 sm:grid-cols-2">
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

              <div className="space-y-10">
                <ChoiceGroup title="What keeps getting misread" variant="secondary">
                  <div className="flex flex-wrap gap-3">
                    {MISUNDERSTANDINGS.map((item) => (
                      <SmallChoice key={item} active={misunderstanding === item} onClick={() => setMisunderstanding(item)}>
                        {item}
                      </SmallChoice>
                    ))}
                  </div>
                </ChoiceGroup>

                <ChoiceGroup title="How much do you want to say" variant="secondary">
                  <div className="grid gap-4">
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
    <section className="space-y-4">
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
        "group min-h-24 rounded-sm border p-4 text-left transition-[background-color,border-color,color,transform] duration-200 ease-[var(--ease-out-expo)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2",
        active
          ? "border-ankahe-accent bg-ankahe-accent-soft text-ankahe-accent-text"
          : "border-ankahe-paper-border bg-ankahe-paper-muted text-ankahe-text hover:border-ankahe-border-strong hover:bg-ankahe-control-hover"
      )}
    >
      <span className="mb-3 flex items-center justify-between gap-4">
        <span className="type-ui-label">{title}</span>
        <span aria-hidden="true" className={cn("transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1", active ? "text-ankahe-accent" : "text-ankahe-muted")}>{icon}</span>
      </span>
      <span className={cn(
        "type-caption block",
        active ? "text-ankahe-accent-text-muted" : "text-ankahe-muted"
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
        "type-caption min-h-11 rounded-sm border px-3.5 py-2 transition-[background-color,border-color,color,transform] duration-200 ease-[var(--ease-out-expo)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2",
        active
          ? "border-ankahe-accent bg-ankahe-accent-soft text-ankahe-accent-text"
          : "border-ankahe-paper-border bg-ankahe-paper-muted text-ankahe-text hover:border-ankahe-border-strong"
      )}
    >
      {children}
    </button>
  );
}
