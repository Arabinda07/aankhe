/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Shared option arrays and the `option()` helper used across all mode question banks.
 *
 * This module is the single source of truth for reusable answer options.
 * Individual mode files import from here to avoid duplication.
 */

import type { QuestionOption } from "../schemaTypes";

export function option(value: string, label: string, manualMeaning?: string): QuestionOption {
  return { value, label, manualMeaning };
}

export const supportOptions = [
  option("listen", "Listen without fixing", "listen without immediately fixing it"),
  option("practical_help", "Offer practical help", "offer practical help"),
  option("quiet_company", "Stay nearby quietly", "stay nearby quietly"),
  option("space", "Give me space", "give me space"),
  option("distract", "Offer a small distraction", "offer a small distraction"),
];

export const repairOptions = [
  option("clear_apology", "A clear apology", "a clear apology"),
  option("time_then_return", "Time, then a return to the topic", "time to settle, followed by a return to the topic"),
  option("specific_next_step", "A specific next step", "a specific next step"),
  option("reassurance", "Reassurance of care", "reassurance that the relationship is still steady"),
  option("own_the_part", "Each person naming their part", "each person naming their part"),
];

export const directnessOptions = [
  option("direct_private", "Tell me directly and privately", "direct private feedback"),
  option("context_first", "Start with context, then be direct", "context first, then direct feedback"),
  option("written_first", "Send it in writing first", "written feedback before live discussion"),
  option("ask_permission", "Ask if I have capacity first", "a capacity check before feedback"),
];
