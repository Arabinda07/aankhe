/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight, Eye, EyeSlash, LinkSimple, LockKey } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import type React from "react";

export function PrivacyPage() {
  return (
    <InfoShell
      eyebrow="Privacy"
      title="Nothing is stored. Nothing is uploaded."
      lead="You choose what leaves the page."
    >
      <div className="grid gap-5 md:grid-cols-2">
        <InfoCard icon={<LockKey size={22} />} title="Memory only">
          Answers live in this tab's React memory. Refresh or close the tab and they are gone.
        </InfoCard>
        <InfoCard icon={<LinkSimple size={22} />} title="Save in link">
          Included answers can be compressed into the URL. Anyone with that link can open the included manual.
        </InfoCard>
      </div>

      <section className="rounded-xl border border-ankahe-border bg-ankahe-surface px-6 py-7 md:px-8">
        <h2 className="type-artifact-heading text-ankahe-text">What can leave the page</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <VisibilityRule icon={<Eye size={20} />} title="Included">
            May appear in preview, export, QR code, and shared links.
          </VisibilityRule>
          <VisibilityRule icon={<LockKey size={20} />} title="Private">
            Stays local. It never enters shared links or public exports.
          </VisibilityRule>
          <VisibilityRule icon={<EyeSlash size={20} />} title="Omitted">
            Left out of preview, share, and export.
          </VisibilityRule>
        </div>
      </section>

      <section className="grid gap-5 border-y border-ankahe-border py-8 md:grid-cols-[0.8fr_1.2fr] md:items-center">
        <h2 className="type-artifact-heading text-ankahe-text">The promise</h2>
        <p className="type-lead text-ankahe-muted">
          No accounts. No databases. No analytics. Your manual only becomes shareable when you choose to create a link or export an artifact.
        </p>
      </section>
    </InfoShell>
  );
}

export function HowItWorksPage() {
  const steps = [
    {
      title: "Choose a manual",
      text: "Start with a Me Manual for personal context or a Work Manual for collaboration.",
    },
    {
      title: "Answer only what you want",
      text: "Skip anything that does not belong in the room yet.",
    },
    {
      title: "Set visibility",
      text: "Mark each answer included, private, or omitted before it becomes part of the artifact.",
    },
    {
      title: "Review the artifact",
      text: "Read the finished manual as a document, not a raw form summary.",
    },
    {
      title: "Share what you chose",
      text: "Copy a link, make a QR code, or export only the answers you marked included.",
    },
  ];

  return (
    <InfoShell
      eyebrow="How it works"
      title="A quiet way to make yourself easier to understand."
      lead="Ankahe turns careful answers into a personal manual you can keep, send, or revise."
    >
      <div className="grid gap-4">
        {steps.map((step, index) => (
          <section
            key={step.title}
            className="grid gap-5 rounded-xl border border-ankahe-border bg-ankahe-surface px-6 py-6 md:grid-cols-[5rem_1fr] md:items-start md:px-8"
          >
            <span className="type-meta text-ankahe-accent">{String(index + 1).padStart(2, "0")}</span>
            <div className="space-y-2">
              <h2 className="type-artifact-heading text-ankahe-text">{step.title}</h2>
              <p className="type-lead text-ankahe-muted">{step.text}</p>
            </div>
          </section>
        ))}
      </div>

      <section className="rounded-xl border border-ankahe-border bg-sandal-soft/55 px-6 py-7 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl space-y-2">
            <p className="type-eyebrow text-sandal">Begin</p>
            <h2 className="type-artifact-heading text-ankahe-text">Start with the manual that matches the conversation.</h2>
          </div>
          <Link
            to="/"
            className="type-ui-label inline-flex min-h-12 items-center justify-center gap-3 rounded-md bg-ankahe-accent px-6 py-3 text-ankahe-on-accent transition-colors hover:bg-ankahe-accent-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-accent focus-visible:ring-offset-2"
          >
            Choose a manual
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
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
      <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="mb-12 max-w-3xl space-y-5">
          <p className="type-eyebrow text-ankahe-accent">{eyebrow}</p>
          <h1 className="type-display text-ankahe-text">{title}</h1>
          <p className="type-lead text-ankahe-muted">{lead}</p>
        </div>
        <div className="space-y-6">{children}</div>
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
    <section className="rounded-xl border border-ankahe-border bg-ankahe-surface px-6 py-7">
      <div className="mb-5 text-ankahe-accent">{icon}</div>
      <h2 className="type-artifact-heading text-ankahe-text">{title}</h2>
      <p className="type-lead mt-3 text-ankahe-muted">{children}</p>
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
    <div className="rounded-lg border border-ankahe-border bg-ankahe-bg px-4 py-5">
      <div className="mb-3 text-ankahe-accent">{icon}</div>
      <h3 className="type-panel-title text-ankahe-text">{title}</h3>
      <p className="type-caption mt-2 text-ankahe-muted">{children}</p>
    </div>
  );
}
