/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ModeId } from "./schemaTypes";

export interface Theme {
  bgGradient: string;
  accent: string;
  cardBg: string;
  progressRail: string;
  buttonAccent: string;
  textDisplay: string;
}

export const THEME_ENGINE: Record<ModeId, Theme> = {
  me: {
    bgGradient: "bg-ankahe-bg",
    accent: "text-ankahe-accent",
    cardBg: "bg-ankahe-surface",
    progressRail: "bg-ankahe-surface-soft",
    buttonAccent: "bg-ankahe-accent hover:bg-ankahe-accent-dark",
    textDisplay: "font-display text-ankahe-text"
  },
  work: {
    bgGradient: "bg-ankahe-bg",
    accent: "text-sandal",
    cardBg: "bg-ankahe-surface",
    progressRail: "bg-ankahe-surface-soft",
    buttonAccent: "bg-sandal hover:bg-ankahe-accent-dark",
    textDisplay: "font-display text-ankahe-text"
  },
  talk: {
    bgGradient: "bg-ankahe-bg",
    accent: "text-ankahe-muted",
    cardBg: "bg-ankahe-surface",
    progressRail: "bg-ankahe-surface-soft",
    buttonAccent: "bg-ankahe-muted hover:bg-opacity-90",
    textDisplay: "font-display text-ankahe-text"
  },
  us: {
    bgGradient: "bg-ankahe-bg",
    accent: "text-ankahe-accent",
    cardBg: "bg-ankahe-surface",
    progressRail: "bg-ankahe-surface-soft",
    buttonAccent: "bg-ankahe-accent hover:bg-opacity-90",
    textDisplay: "font-display text-ankahe-text"
  }
};
