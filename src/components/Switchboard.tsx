/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SealCheck } from "@phosphor-icons/react/dist/csr/SealCheck";
import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import type { ModeId, OnboardingContext, StorageMode } from "../lib/schemaTypes";
import { SoftButton } from "./SoftButton";

const SwitchboardSetup = lazy(() =>
  import("./SwitchboardSetup").then((module) => ({
    default: module.SwitchboardSetup,
  }))
);

interface SwitchboardProps {
  onStart: (mode: ModeId, onboarding?: OnboardingContext) => void;
  onLearnMore: () => void;
  storageMode: StorageMode;
  onStorageModeChange: (mode: StorageMode) => void;
}

export function Switchboard({
  onStart,
  onLearnMore,
  storageMode,
  onStorageModeChange,
}: SwitchboardProps) {
  const [shouldLoadSetup, setShouldLoadSetup] = useState(false);

  useEffect(() => {
    if (shouldLoadSetup) return;

    const loadSetup = () => setShouldLoadSetup(true);
    const idleId = window.requestIdleCallback
      ? window.requestIdleCallback(loadSetup, { timeout: 1800 })
      : window.setTimeout(loadSetup, 900);

    return () => {
      if (window.cancelIdleCallback && typeof idleId === "number") {
        window.cancelIdleCallback(idleId);
      } else {
        window.clearTimeout(idleId);
      }
    };
  }, [shouldLoadSetup]);

  const scrollToOnboarding = useCallback(() => {
    setShouldLoadSetup(true);
    window.requestAnimationFrame(() => {
      document.getElementById("onboarding")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  return (
    <div className="bg-ankahe-bg">
      <section className="mx-auto grid max-w-[1200px] grid-cols-1 gap-16 px-5 py-12 text-left sm:px-8 md:py-20 lg:grid-cols-[1fr_minmax(auto,600px)] lg:items-start lg:gap-12 xl:gap-24 lg:py-28 xl:py-32">
        <div className="flex w-full min-w-0 flex-col space-y-10 lg:space-y-12 lg:sticky lg:top-32 lg:pt-4">
          <div className="space-y-6 md:space-y-8">
            <h1 className="type-mixed-heading text-ankahe-heading lg:max-w-xl">
              Your Story Always Ready
            </h1>
            <p className="type-lead max-w-lg text-ankahe-muted">
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

          <div className="flex items-center gap-3">
            <SealCheck size={20} className="text-ankahe-muted shrink-0" weight="light" />
            <p className="type-caption text-ankahe-muted">No servers. No accounts. This tab is a burner space.</p>
          </div>
        </div>

        {shouldLoadSetup ? (
          <Suspense fallback={<SetupFallback />}>
            <SwitchboardSetup
              storageMode={storageMode}
              onStorageModeChange={onStorageModeChange}
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
      className="w-full min-w-0 max-w-[600px] justify-self-start sm:justify-self-center lg:justify-self-end rounded-[2rem] border border-ankahe-border bg-ankahe-surface p-2 sm:p-3 md:p-3 shadow-sm scroll-mt-24 lg:scroll-mt-32"
    >
      <div className="min-h-[36rem] rounded-[calc(2rem-0.75rem)] border border-ankahe-paper-border bg-ankahe-paper px-5 py-6 md:px-8 md:py-10" />
    </aside>
  );
}
