/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ManualState } from "./schemaTypes";

export const SAMPLE_PERSONAL_STATE: ManualState = {
  mode: "me",
  storageMode: "memory",
  updatedAt: new Date().toISOString(),
  onboarding: {
    recipient: "a partner",
    misunderstanding: "how I communicate",
    depth: "manual",
  },
  artifactFormat: "full",
  tone: "warmer",
  answers: {
    "M_M_01": ["space", "quiet_company"],
    "M_M_03": ["time_then_return", "reassurance"],
    "M_M_05": "I linger nearby or send something small instead of asking directly",
    "M_M_06": "quiet as distance",
    "M_M_10": "write_first",
    "M_D_18": "a calm tone and enough time to finish the thought",
  },
  answerNotes: {
    "M_D_18": "If I pause, it usually means I am trying to answer carefully.",
    "M_M_06": "This is okay for my private copy, but I may omit it when sharing."
  },
  visibilityByQuestion: {
    "M_M_01": "share",
    "M_M_03": "share",
    "M_M_05": "share",
    "M_M_06": "private",
    "M_M_10": "share",
    "M_D_18": "hide"
  }
};
