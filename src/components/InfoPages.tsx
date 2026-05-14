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
      titleLines={{ main: "Nothing leaves", emphasis: "until you choose" }}
      lead="Ankahe runs in the browser. You decide which answers become included, which stay private, and which are left out entirely."
    >
      <div className="grid gap-5 md:grid-cols-2">
        <InfoCard icon={<LockKey size={24} weight="light" />} title="Memory Only">
          Answers live in this tab’s React memory. Close or refresh the tab and they are gone.
        </InfoCard>
        <InfoCard icon={<LinkSimple size={24} weight="light" />} title="Save in Link">
          Included answers can be compressed into the URL. Anyone with that link can open the included manual.
        </InfoCard>
      </div>

      <section className="border-y border-ankahe-border bg-ankahe-surface/45 py-8">
        <h2 className="type-artifact-heading text-ankahe-text">What can leave the page</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
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

      <section className="grid gap-5 border-y border-ankahe-border py-8 md:grid-cols-[0.8fr_1.2fr] md:items-center">
        <h2 className="type-artifact-heading text-ankahe-text">The promise</h2>
        <p className="type-lead text-ankahe-muted">
          No accounts. No databases. No analytics. A manual becomes shareable only when you create a link, QR code, image, or PDF from the included view.
        </p>
      </section>
    </InfoShell>
  );
}

export function HowItWorksPage() {
  const items = [
    {
      title: "Where do my answers live",
      text: "In Memory Only mode, answers live in this tab. Refresh or close it and they are gone. Save in Link stores included answers inside the URL hash so the manual can reopen later.",
    },
    {
      title: "What does private mean",
      text: "Private answers stay local. They can help shape your own view, but they do not enter shared links, QR codes, or public exports.",
    },
    {
      title: "What gets shared",
      text: "Only answers marked Share become included. Those answers can appear in the public preview, exported files, QR code, and shared link.",
    },
    {
      title: "What does Hide do",
      text: "Hide leaves an answer out. It will not appear in the manual preview, shared link, QR code, or export.",
    },
    {
      title: "Do I need an account",
      text: "No. There is no account, database, or analytics layer unless you explicitly add one later.",
    },
  ];

  return (
    <InfoShell
      eyebrow="FAQ"
      titleLines={{ main: "Before you write", emphasis: "a few honest answers" }}
      lead="Ankahe is small on purpose. It helps you make a manual, choose what belongs in it, and send only the parts you marked included."
    >
      <div className="border-y border-ankahe-border">
        {items.map((item, index) => (
          <section
            key={item.title}
            className="grid gap-5 border-b border-ankahe-border py-7 last:border-b-0 md:grid-cols-[5rem_1fr] md:items-start md:py-8"
          >
            <span className="type-meta text-ankahe-accent">{String(index + 1).padStart(2, "0")}</span>
            <div className="space-y-2">
              <h2 className="type-artifact-heading text-ankahe-text">{item.title}</h2>
              <p className="type-lead text-ankahe-muted">{item.text}</p>
            </div>
          </section>
        ))}
      </div>

      <section className="border-y border-ankahe-border bg-sandal-soft/45 py-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl space-y-2">
            <p className="type-eyebrow text-sandal">Begin</p>
            <h2 className="type-artifact-heading text-ankahe-text">Start with the manual that fits the conversation</h2>
          </div>
          <Link
            to="/"
            className="type-ui-label inline-flex min-h-12 items-center justify-center gap-3 rounded-md bg-ankahe-accent px-6 py-3 text-ankahe-on-accent transition-colors hover:bg-ankahe-accent-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-accent focus-visible:ring-offset-2"
          >
            Choose a manual
            <ArrowRight size={18} weight="light" />
          </Link>
        </div>
      </section>
    </InfoShell>
  );
}

function InfoShell({
  eyebrow,
  title,
  titleLines,
  lead,
  children,
}: {
  eyebrow: string;
  title?: string;
  titleLines?: {
    main: string;
    emphasis: string;
  };
  lead: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-ankahe-bg">
      <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="mb-12 max-w-3xl space-y-5">
          <p className="type-eyebrow text-ankahe-accent">{eyebrow}</p>
          {titleLines ? (
            <h1 className="type-mixed-heading type-mixed-heading-page text-ankahe-text">
              <span className="type-mixed-heading-main">{titleLines.main}</span>
              <span className="type-mixed-heading-emphasis">{titleLines.emphasis}</span>
            </h1>
          ) : (
            <h1 className="type-display text-ankahe-text">{title}</h1>
          )}
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
    <section className="rounded-md border border-ankahe-border bg-ankahe-surface px-6 py-7">
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
    <div className="rounded-sm border border-ankahe-border bg-ankahe-bg px-4 py-5">
      <div className="mb-3 text-ankahe-accent">{icon}</div>
      <h3 className="type-panel-title text-ankahe-text">{title}</h3>
      <p className="type-caption mt-2 text-ankahe-muted">{children}</p>
    </div>
  );
}
