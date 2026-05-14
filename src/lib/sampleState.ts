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

export const SAMPLE_WORK_STATE: ManualState = {
  mode: "work",
  storageMode: "memory",
  updatedAt: new Date().toISOString(),
  onboarding: {
    recipient: "a manager",
    misunderstanding: "how I work best",
    depth: "manual",
  },
  artifactFormat: "work",
  tone: "professional",
  answers: {
    "W_M_01": "pre_read",
    "W_M_02": "context_first",
    "W_M_03": "clear_brief",
    "W_M_05": ["quiet", "narrow_focus"],
    "W_M_07": "long_blocks",
    "W_M_08": "call once, then send a short message with the deadline",
    "W_M_09": "quiet focus as disinterest",
  },
  answerNotes: {
    "W_M_02": "A little context upfront saves a lot of back-and-forth.",
  },
  visibilityByQuestion: {
    "W_M_01": "share",
    "W_M_02": "share",
    "W_M_03": "share",
    "W_M_05": "private",
    "W_M_07": "share",
    "W_M_08": "share",
    "W_M_09": "private"
  }
};
