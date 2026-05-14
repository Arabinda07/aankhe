/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ArrowRight,
  Briefcase,
  CaretDown,
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
  { id: "manager", label: "Manager", description: "Work vibes, focus hours, and how you handle stress.", mode: "work", icon: <Briefcase size={22} weight="light" /> },
  { id: "teammate", label: "Teammate", description: "Collab rhythm and how to actually hand things off to you.", mode: "work", icon: <UsersThree size={22} weight="light" /> },
  { id: "partner", label: "Partner", description: "Care, boundaries, and the stuff they usually misread.", mode: "me", icon: <HandHeart size={22} weight="light" /> },
  { id: "friend", label: "Friend", description: "How to support you without having to guess.", mode: "me", icon: <ChatCenteredText size={22} weight="light" /> },
  { id: "talk", label: "Difficult talk", description: "A cheat sheet for a conversation you're dreading.", mode: "talk", icon: <FileText size={22} weight="light" /> },
  { id: "self", label: "Myself", description: "Just a private brain dump to figure your own head out.", mode: "me", icon: <User size={22} weight="light" /> },
  { id: "sync", label: "Shared note", description: "A shared note so we can actually get on the same page.", mode: "us", icon: <UsersThree size={22} weight="light" /> },
];

const MISREAD_TOPICS = [
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
  const [misunderstanding, setMisunderstanding] = useState(MISREAD_TOPICS[0]);
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

  const scrollToOnboarding = () => {
    document.getElementById("onboarding")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-ankahe-bg">
      <section className="mx-auto grid max-w-[1200px] grid-cols-1 gap-16 px-5 py-12 text-left sm:px-8 md:py-20 lg:grid-cols-[1fr_minmax(auto,600px)] lg:items-start lg:gap-12 xl:gap-24 lg:py-28 xl:py-32">
        <div className="flex w-full min-w-0 flex-col space-y-10 lg:space-y-12 lg:sticky lg:top-32 lg:pt-4">
          <div className="ankahe-enter ankahe-enter-0 space-y-6 md:space-y-8">
            <h1 className="type-mixed-heading text-ankahe-text">
              <span className="type-mixed-heading-main">Everything</span>
              <span className="type-mixed-heading-emphasis">before you ask</span>
            </h1>
            <p className="type-lead max-w-lg text-ankahe-muted">
              Explaining your whole deal to new people is exhausting. Write it down once. Keep the messy parts to yourself. Hand them the link. Skip the guessing games.
            </p>
          </div>

          <div className="ankahe-enter ankahe-enter-1 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <SoftButton size="md" onClick={scrollToOnboarding} icon={<CaretDown size={16} className="lg:hidden" />} className="w-full sm:w-auto">
              Start your manual
            </SoftButton>
            <SoftButton
              variant="secondary"
              size="md"
              onClick={onLearnMore}
              className="w-full sm:w-auto"
            >
              See how it works
            </SoftButton>
          </div>

          <div className="ankahe-enter ankahe-enter-2 flex flex-col items-start gap-5">
            <div className="flex items-center gap-3">
              <ShieldCheck size={20} className="text-ankahe-muted shrink-0" weight="light" />
              <p className="type-caption text-ankahe-muted">No servers. No accounts. This tab is a burner space.</p>
            </div>
            <StorageModeToggle value={storageMode} onChange={onStorageModeChange} />
          </div>
        </div>

        <aside
          id="onboarding"
          aria-label="Manual setup"
          className="ankahe-enter ankahe-enter-aside w-full min-w-0 max-w-[600px] justify-self-start sm:justify-self-center lg:justify-self-end rounded-[2rem] border border-ankahe-border bg-ankahe-surface p-2 sm:p-3 md:p-3 shadow-sm scroll-mt-24 lg:scroll-mt-32"
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
                    {MISREAD_TOPICS.map((item) => (
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

              <div className="border-t border-ankahe-paper-border" />

              <SoftButton
                size="md"
                onClick={() => onStart(recipient.mode, onboarding)}
                icon={<ArrowRight size={16} />}
                className="w-full"
              >
                {ctaTextForRecipient(recipientId)}
              </SoftButton>
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

function ctaTextForRecipient(id: RecipientId): string {
  const labels: Record<RecipientId, string> = {
    manager: "Build your work manual",
    teammate: "Build your work manual",
    partner: "Build your personal manual",
    friend: "Build your personal manual",
    talk: "Prep the talk",
    self: "Start your brain dump",
    sync: "Write your shared note",
  };
  return labels[id];
}
