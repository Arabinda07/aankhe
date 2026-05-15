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
import { User } from "@phosphor-icons/react/dist/csr/User";
import { UsersThree } from "@phosphor-icons/react/dist/csr/UsersThree";
import type React from "react";
import { useMemo, useState } from "react";
import { ManualDepth, ModeId, OnboardingContext } from "../lib/schemaTypes";
import { cn } from "../lib/utils";
import { SoftButton } from "./SoftButton";

interface SwitchboardSetupProps {
  onStart: (mode: ModeId, onboarding?: OnboardingContext) => void;
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
  { id: "manager", label: "Manager", description: "How you work, focus, and handle pressure.", mode: "work", icon: <Briefcase size={22} weight="light" /> },
  { id: "teammate", label: "Teammate", description: "Collaboration rhythm, handoffs, and what helps work move.", mode: "work", icon: <UsersThree size={22} weight="light" /> },
  { id: "partner", label: "Partner", description: "Care, boundaries, and what tends to get misread.", mode: "me", icon: <Handshake size={22} weight="light" /> },
  { id: "friend", label: "Friend", description: "What support looks like when guessing is getting old.", mode: "me", icon: <ChatCenteredText size={22} weight="light" /> },
  { id: "talk", label: "Difficult talk", description: "A small brief for a conversation you keep putting off.", mode: "talk", icon: <EnvelopeSimple size={22} weight="light" /> },
  { id: "self", label: "Myself", description: "A private place to get your thoughts out first.", mode: "me", icon: <User size={22} weight="light" /> },
  { id: "sync", label: "Shared note", description: "A note for getting on the same page without circling it.", mode: "us", icon: <UsersThree size={22} weight="light" /> },
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
  { id: "manual", label: "10-minute manual", description: "Enough context to be useful." },
  { id: "deep", label: "Deeper manual", description: "The full version. Go slowly." },
];

export function SwitchboardSetup({ onStart }: SwitchboardSetupProps) {
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

  return (
    <aside
      id="onboarding"
      aria-label="Manual setup"
      className="parichay-enter parichay-enter-aside w-full min-w-0 max-w-[600px] justify-self-start sm:justify-self-center lg:justify-self-end rounded-[2rem] border border-parichay-border bg-parichay-surface p-2 sm:p-3 md:p-3 shadow-sm scroll-mt-24 lg:scroll-mt-32"
    >
      <div className="rounded-[calc(2rem-0.75rem)] border border-parichay-paper-border bg-parichay-paper px-5 py-6 md:px-8 md:py-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
        <div className="space-y-12">
          <ChoiceGroup title="Who should understand you better">
            <div className="flex flex-col gap-2 sm:grid sm:grid-cols-2 sm:gap-3">
              {RECIPIENTS.map((item, index) => (
                <div key={item.id} className={cn(index === 6 ? "sm:col-span-2" : "")}>
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

          <div className="space-y-10">
            <ChoiceGroup title="What keeps getting misread" variant="secondary">
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

            <ChoiceGroup title="How much do you want to say" variant="secondary">
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
          </div>

          <PrivacyLedger />

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
  );
}

function PrivacyLedger() {
  const rows = [
    ["Included", "Can appear in the manual you share."],
    ["Private", "Stays in this tab."],
    ["Omitted", "Stays out of preview, links, and exports."],
  ];

  return (
    <section aria-label="Privacy rules" className="border-t border-parichay-paper-border pt-6">
      <div className="grid gap-3">
        {rows.map(([label, description]) => (
          <div key={label} className="grid grid-cols-[5.5rem_1fr] gap-3">
            <span className="type-caption font-semibold text-parichay-heading">{label}</span>
            <span className="type-caption text-parichay-muted">{description}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ChoiceGroup({ title, children, variant = "primary" }: { title: string; children: React.ReactNode; variant?: "primary" | "secondary" }) {
  return (
    <section className="space-y-5">
      <h2 className={cn(
        variant === "primary"
          ? "type-panel-title text-parichay-heading"
          : "type-eyebrow text-parichay-heading"
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
          : "bg-transparent text-parichay-text hover:bg-parichay-surface-halo-hover ring-1 ring-inset ring-transparent hover:ring-parichay-border"
      )}
    >
      <span className="mb-3 flex items-center justify-between gap-4">
        <span className="type-ui-label">{title}</span>
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
