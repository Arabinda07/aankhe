/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback } from "react";
import { ShieldCheck } from "@phosphor-icons/react/dist/csr/ShieldCheck";
import type { ModeId, OnboardingContext } from "../lib/schemaTypes";
import { SoftButton } from "./SoftButton";
import { SwitchboardSetup } from "./SwitchboardSetup";

interface SwitchboardProps {
  onStart: (mode: ModeId, onboarding?: OnboardingContext) => void;
  onLearnMore: () => void;
}

export function Switchboard({
  onStart,
  onLearnMore,
}: SwitchboardProps) {
  const scrollToOnboarding = useCallback(() => {
    document.getElementById("onboarding")?.scrollIntoView({ behavior: "smooth", block: "start" });
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
            <ShieldCheck
              size={18}
              weight="light"
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-parichay-muted"
            />
            <p className="type-caption min-w-0 text-wrap text-parichay-muted">Nothing is stored. Nothing is uploaded. You choose what leaves the page.</p>
          </div>
        </div>

        <SwitchboardSetup onStart={onStart} />
      </section>
    </div>
  );
}
