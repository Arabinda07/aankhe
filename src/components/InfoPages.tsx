/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Eye } from "@phosphor-icons/react/dist/csr/Eye";
import { EyeSlash } from "@phosphor-icons/react/dist/csr/EyeSlash";
import { LinkSimpleHorizontal } from "@phosphor-icons/react/dist/csr/LinkSimpleHorizontal";
import { LockKey } from "@phosphor-icons/react/dist/csr/LockKey";
import type React from "react";

export function PrivacyPage() {
  return (
    <InfoShell
      eyebrow="Privacy"
      title="Nothing leaves until you say so"
      lead="No accounts. No database. Your tab is the room. You decide what stays and what goes."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <InfoCard icon={<LockKey size={24} weight="light" />} title="Memory Only">
          Your answers live in this tab. Close it or refresh it and they disappear. Generate a link or export before you leave if you want to keep them.
        </InfoCard>
        <InfoCard icon={<LinkSimpleHorizontal size={24} weight="light" />} title="Save in Link">
          Only answers marked Share are compressed into the link. Anyone with that link can read those included answers. Lose the link and it's gone.
        </InfoCard>
      </div>

      <section className="px-2 py-12 md:px-8">
        <h2 className="type-artifact-heading text-ankahe-heading">What can leave the page</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          <VisibilityRule icon={<Eye size={22} weight="light" />} title="Included">
            May appear in preview, export, QR code, and shared links.
          </VisibilityRule>
          <VisibilityRule icon={<LockKey size={22} weight="light" />} title="Private">
            Stays local. It never enters shared links or public exports.
          </VisibilityRule>
          <VisibilityRule icon={<EyeSlash size={22} weight="light" />} title="Omitted">
            Left out of preview, share, and export.
          </VisibilityRule>
        </div>
      </section>

      <section className="grid gap-6 py-12 md:grid-cols-[0.8fr_1.2fr] md:items-center">
        <h2 className="type-artifact-heading text-ankahe-heading">The promise</h2>
        <p className="type-lead text-ankahe-muted">
          You decide what goes into the final envelope. We don't add private answers behind your back. The boundary you wrote for yourself stays right where you put it.
        </p>
      </section>
    </InfoShell>
  );
}

export function HowItWorksPage() {
  const items = [
    {
      title: "Why actually use this?",
      text: "Because repeating yourself gets old. New manager, new partner, friend who reads your silence wrong, same problem: they need context, and you don't want to rebuild it from scratch every time.",
    },
    {
      title: "How do I use it?",
      text: "Pick a manual. Answer what fits. Mark each answer Share, Private, or Hide. The honest draft can stay local; the cleaner version becomes the link.",
    },
    {
      title: "Is this actually private?",
      text: "Yes. Nothing saves to a server. There's no account and no email. Close the tab and unsaved answers vanish. To keep a manual, generate a link or export it before you leave.",
    },
    {
      title: "What do the buttons do?",
      text: "'Share' goes into the final link or export. 'Private' stays visible only in your tab. 'Hide' leaves it out. You can change your mind before sending.",
    },
  ];

  return (
    <InfoShell
      eyebrow="Why & How"
      title="Why are we doing this?"
      lead="Repeating yourself is exhausting. Ankahe keeps the messy draft private and the finished version shareable."
    >
      <div className="divide-y divide-ankahe-border/60">
        {items.map((item, index) => (
          <section
            key={item.title}
            className="grid gap-6 py-12 md:grid-cols-[7rem_minmax(0,1fr)] md:items-start md:py-16"
          >
            <span className="type-meta text-ankahe-muted md:pt-2">{String(index + 1).padStart(2, "0")}</span>
            <div className="max-w-3xl space-y-3">
              <h2 className="type-artifact-heading text-ankahe-heading">{item.title}</h2>
              <p className="type-lead whitespace-pre-wrap text-ankahe-muted">{item.text}</p>
            </div>
          </section>
        ))}
      </div>
    </InfoShell>
  );
}

function InfoShell({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-ankahe-bg">
      <section className="mx-auto max-w-5xl px-6 py-24 md:py-32 lg:py-40">
        <div className="mb-12 max-w-3xl space-y-5">
          <p className="type-eyebrow text-ankahe-sandal">{eyebrow}</p>
          <h1 className="type-mixed-heading type-mixed-heading-page text-ankahe-heading">{title}</h1>
          <p className="type-lead text-ankahe-muted">{lead}</p>
        </div>
        <div className="space-y-10">{children}</div>
      </section>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-2 py-6 md:px-0 md:py-8">
      <div className="mb-6 text-ankahe-muted">{icon}</div>
      <h2 className="type-artifact-heading text-ankahe-heading">{title}</h2>
      <p className="type-lead mt-4 text-ankahe-muted">{children}</p>
    </section>
  );
}

function VisibilityRule({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="py-2">
      <div className="mb-4 text-ankahe-muted">{icon}</div>
      <h3 className="type-panel-title text-ankahe-heading">{title}</h3>
      <p className="type-caption mt-2 text-ankahe-muted">{children}</p>
    </div>
  );
}
