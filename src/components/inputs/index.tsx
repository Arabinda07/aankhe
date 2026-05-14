/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Answer Input — the public seam for rendering any question's answer control.
 *
 * This module is the only interface callers need. It dispatches to the correct
 * input component based on `answerUiPolicy.getAnswerComponentForQuestion()`.
 *
 * Individual input components live in sibling files:
 *   TextInputs.tsx    — ShortTextInput, TextareaInput
 *   ChoiceInputs.tsx  — RadioCardsInput, MultiSelectCardsInput, NativeSelectInput, PairedChoiceInput
 *   SegmentedInput.tsx — SegmentedTriStateInput
 *   ScaleInput.tsx    — ScaleInput
 *   RankedInput.tsx   — RankedInput
 */

import { getAnswerComponentForQuestion } from "../../lib/answerUiPolicy";
import type { AnswerInputProps } from "./shared";
import { ShortTextInput, TextareaInput } from "./TextInputs";
import { RadioCardsInput, MultiSelectCardsInput, NativeSelectInput, PairedChoiceInput } from "./ChoiceInputs";
import { SegmentedTriStateInput } from "./SegmentedInput";
import { ScaleInput } from "./ScaleInput";
import { RankedInput } from "./RankedInput";

// Re-export shared types for consumers
export type { AnswerValue, AnswerInputProps } from "./shared";

export function AnswerInput(props: AnswerInputProps) {
  const component = getAnswerComponentForQuestion(props.question);

  switch (component) {
    case "shortText":
      return <ShortTextInput {...props} />;
    case "textarea":
      return <TextareaInput {...props} />;
    case "radioCards":
      return <RadioCardsInput {...props} />;
    case "multiSelectCards":
      return <MultiSelectCardsInput {...props} />;
    case "nativeSelect":
      return <NativeSelectInput {...props} />;
    case "pairedChoice":
      return <PairedChoiceInput {...props} />;
    case "segmentedTriState":
      return <SegmentedTriStateInput {...props} />;
    case "labeledScale":
      return <ScaleInput {...props} />;
    case "rankedChoice":
      return <RankedInput {...props} />;
    default:
      return null;
  }
}
