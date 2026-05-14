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
    "M_01": "Alex",
    "M_03": "I observe first",
    "M_05": "Write it out",
    "M_06": "a calm tone and enough time to finish the thought",
    "M_07": ["Space", "Quiet company"],
    "M_10": "quiet usually means I am processing, not withdrawing",
    "M_12": ["A little time", "A gentle check-in"]
  },
  answerNotes: {
    "M_06": "If I pause, it usually means I am trying to answer carefully.",
    "M_10": "This is okay for my private copy, but I may omit it when sharing."
  },
  visibilityByQuestion: {
    "M_01": "share",
    "M_03": "share",
    "M_05": "share",
    "M_06": "share",
    "M_07": "share",
    "M_10": "private",
    "M_12": "hide"
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
    "W_01": ["Early morning", "Long quiet blocks", "After a clear brief"],
    "W_02": "unexpected rapid-fire messages when I am head-down",
    "W_03": "Shared doc",
    "W_04": "the problem, the decision needed, and the deadline",
    "W_06": "Written",
    "W_08": "the work is blocked or a decision will become expensive",
    "W_10": "go quiet and narrow my attention"
  },
  answerNotes: {
    "W_04": "A little context upfront saves a lot of back-and-forth.",
  },
  visibilityByQuestion: {
    "W_01": "share",
    "W_02": "share",
    "W_03": "share",
    "W_04": "share",
    "W_06": "share",
    "W_08": "share",
    "W_10": "private"
  }
};
