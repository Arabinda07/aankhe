/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ModeId = "me" | "work" | "talk" | "us";

export type QuestionType = "text" | "textarea" | "select" | "multiSelect" | "scale" | "rank" | "pairedChoice" | "yesNoMaybe";

export type Visibility = "share" | "private" | "hide";

export type StorageMode = "memory" | "url";

export type ManualDepth = "note" | "manual" | "deep";

export type ArtifactFormat = "full" | "onePage" | "note" | "conversation" | "work" | "private";

export type TonePreference = "default" | "softer" | "direct" | "warmer" | "professional" | "shorter";

/** Controls which answers are visible in manual preview: included (share-only) or private (local full view). */
export type ManualViewMode = "included" | "private";

export type QuestionDepth = "mvp" | "deep";

export interface QuestionOption {
  value: string;
  label: string;
  manualMeaning?: string;
}

export interface OnboardingContext {
  recipient: string;
  misunderstanding: string;
  depth: ManualDepth;
}

export interface Question {
  id: string;
  mode: ModeId;
  sectionId: string;
  label: string; // The UI question string
  helperText?: string;
  type: QuestionType;
  depth?: QuestionDepth;
  priority?: number;
  dimension?: string;
  answerIntent?: "reflective" | "administrative";
  options?: Array<string | QuestionOption>;
  min?: number;
  max?: number;
  leftLabel?: string;
  rightLabel?: string;
  defaultVisibility: Visibility;
  manualTemplate?: string;
  required?: boolean;
}

export interface Section {
  id: string;
  title: string;
  description: string;
}

export interface ModeConfig {
  id: ModeId;
  name: string;
  label: string;
  description: string;
  theme: ModeId;
  sections: Section[];
  questions: Question[];
}

export interface ManualState {
  mode: ModeId;
  answers: Record<string, string | string[] | number>;
  answerNotes?: Record<string, string>;
  visibilityByQuestion: Record<string, Visibility>;
  storageMode: StorageMode;
  onboarding?: OnboardingContext;
  artifactFormat?: ArtifactFormat;
  tone?: TonePreference;
  updatedAt: string;
}

export interface ComposedSection {
  id: string;
  title: string;
  description: string;
  details: string[];
}

export interface ComposedManual {
  id: string;
  mode: ModeId;
  title: string;
  subtitle: string;
  audience: string;
  artifactFormat: ArtifactFormat;
  tone: TonePreference;
  recipientNote: string;
  atAGlance: string;
  recognitionSummaries: string[];
  sections: ComposedSection[];
  answeredCount: number;
  shareableCount: number;
  privateCount: number;
  hiddenCount: number;
  hasPrivateItems: boolean;
}
