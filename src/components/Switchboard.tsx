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
  onManualIntentPreload: () => void;
}

export function Switchboard({
  onStart,
  onLearnMore,
  onManualIntentPreload,
}: SwitchboardProps) {
  const scrollToOnboarding = useCallback(() => {
    onManualIntentPreload();
    document.getElementById("onboarding")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [onManualIntentPreload]);

  return (
    <div className="bg-parichay-bg">
      <section className="mx-auto grid max-w-[1200px] grid-cols-1 gap-16 px-5 py-12 text-left sm:px-8 md:py-20 lg:grid-cols-[1fr_minmax(auto,600px)] lg:items-start lg:gap-12 xl:gap-24 lg:py-28 xl:py-32">
        <div className="flex w-full min-w-0 flex-col space-y-10 lg:space-y-12 lg:sticky lg:top-32 lg:pt-4">
          <div className="space-y-6 md:space-y-8">
            <h1 className="type-serif-title text-parichay-heading lg:max-w-xl">
              Create a private intro page before you need one.
            </h1>
            <p className="type-lead max-w-lg text-parichay-muted">
              Explain how you work, communicate, and want to be understood. Answer a few guided questions, choose what people can see, and send a short intro when it helps.
            </p>
          </div>

          <div className="flex w-full flex-col items-start gap-4 sm:w-auto sm:flex-row sm:items-center">
            <SoftButton
              size="md"
              onClick={scrollToOnboarding}
              onFocus={onManualIntentPreload}
              onPointerEnter={onManualIntentPreload}
              onTouchStart={onManualIntentPreload}
              className="w-full sm:w-auto"
            >
              Create your intro
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

        <SwitchboardSetup onStart={onStart} onManualIntentPreload={onManualIntentPreload} />
      </section>
    </div>
  );
}
