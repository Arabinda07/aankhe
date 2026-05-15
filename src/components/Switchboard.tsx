/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { SETUP_SCROLL_LOAD_THRESHOLD_PX } from "../lib/performancePolicy";
import type { ModeId, OnboardingContext } from "../lib/schemaTypes";
import { SoftButton } from "./SoftButton";

const SwitchboardSetup = lazy(() =>
  import("./SwitchboardSetup").then((module) => ({
    default: module.SwitchboardSetup,
  }))
);

interface SwitchboardProps {
  onStart: (mode: ModeId, onboarding?: OnboardingContext) => void;
  onLearnMore: () => void;
}

export function Switchboard({
  onStart,
  onLearnMore,
}: SwitchboardProps) {
  const [shouldLoadSetup, setShouldLoadSetup] = useState(false);

  useEffect(() => {
    if (shouldLoadSetup) return;

    const loadSetupAfterScroll = () => {
      if (window.scrollY > SETUP_SCROLL_LOAD_THRESHOLD_PX) {
        setShouldLoadSetup(true);
      }
    };

    window.addEventListener("scroll", loadSetupAfterScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", loadSetupAfterScroll);
    };
  }, [shouldLoadSetup]);

  const scrollToOnboarding = useCallback(() => {
    setShouldLoadSetup(true);
    window.requestAnimationFrame(() => {
      document.getElementById("onboarding")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  return (
    <div className="bg-parichay-bg">
      <section className="mx-auto grid max-w-[1200px] grid-cols-1 gap-16 px-5 py-12 text-left sm:px-8 md:py-20 lg:grid-cols-[1fr_minmax(auto,600px)] lg:items-start lg:gap-12 xl:gap-24 lg:py-28 xl:py-32">
        <div className="flex w-full min-w-0 flex-col space-y-10 lg:space-y-12 lg:sticky lg:top-32 lg:pt-4">
          <div className="space-y-6 md:space-y-8">
            <h1 className="type-mixed-heading text-parichay-heading lg:max-w-xl">
              Your story always ready
            </h1>
            <p className="type-lead max-w-lg text-parichay-muted">
              Explaining yourself to new people gets old. Write down your story, keep the private parts to yourself, then share the sealed copy.
            </p>
          </div>

          <div className="flex w-full flex-col items-start gap-4 sm:w-auto sm:flex-row sm:items-center">
            <SoftButton size="md" onClick={scrollToOnboarding} className="w-full sm:w-auto">
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

          <div className="flex min-w-0 items-start gap-3">
            <span
              aria-hidden="true"
              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border border-parichay-border text-[0.625rem] font-semibold leading-none text-parichay-muted"
            >
              P
            </span>
            <p className="type-caption min-w-0 text-wrap text-parichay-muted">Nothing is stored. Nothing is uploaded. You choose what leaves the page.</p>
          </div>
        </div>

        {shouldLoadSetup ? (
          <Suspense fallback={<SetupFallback />}>
            <SwitchboardSetup
              onStart={onStart}
            />
          </Suspense>
        ) : (
          <SetupFallback />
        )}
      </section>
    </div>
  );
}

function SetupFallback() {
  return (
    <aside
      id="onboarding"
      aria-label="Manual setup loading"
      className="w-full min-w-0 max-w-[600px] justify-self-start sm:justify-self-center lg:justify-self-end rounded-[2rem] border border-parichay-border bg-parichay-surface p-2 sm:p-3 md:p-3 shadow-sm scroll-mt-24 lg:scroll-mt-32"
    >
      <div className="min-h-[36rem] rounded-[calc(2rem-0.75rem)] border border-parichay-paper-border bg-parichay-paper px-5 py-6 md:px-8 md:py-10">
        <div className="flex h-full min-h-[31rem] flex-col justify-between">
          <div className="space-y-6">
            <p className="type-eyebrow text-parichay-muted">Preparing your manual studio</p>
            <div className="space-y-3" aria-hidden="true">
              <div className="h-3 w-2/3 rounded-sm bg-parichay-surface-soft" />
              <div className="h-3 w-11/12 rounded-sm bg-parichay-surface-soft" />
              <div className="h-3 w-4/5 rounded-sm bg-parichay-surface-soft" />
            </div>
          </div>
          <div className="space-y-4" aria-hidden="true">
            <div className="h-24 rounded-md border border-parichay-paper-border bg-parichay-paper-muted" />
            <div className="h-24 rounded-md border border-parichay-paper-border bg-parichay-paper-muted" />
          </div>
        </div>
      </div>
    </aside>
  );
}
