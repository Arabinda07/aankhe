/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ArtifactFormat,
  ComposedManual,
  ComposedSection,
  ManualState,
  ModeId,
  Question,
  TonePreference,
} from "./schemaTypes";
import { PROTOCOL_MANIFEST } from "./protocolManifest";
import { createVisibilityPolicy } from "./visibilityPolicy";
import type { ManualViewMode } from "./visibilityPolicy";

export interface ManualComposeOptions {
  viewMode?: ManualViewMode;
  excludedSections?: string[];
}

export function composeManual(
  state: ManualState, 
  options: ManualComposeOptions = {}
): ComposedManual {
  const { viewMode = "private", excludedSections = [] } = options;
  const config = PROTOCOL_MANIFEST[state.mode];
  const answers = state.answers;
  const answerNotes = state.answerNotes || {};
  const artifactFormat = state.artifactFormat || "full";
  const tone = state.tone || "default";
  const visibilityPolicy = createVisibilityPolicy(state);

  const answeredQuestions = Object.keys(answers);
  const visibilityCounts = visibilityPolicy.getCounts();

  const sectionLimit = getFormatSectionLimit(artifactFormat);
  const composedSections: ComposedSection[] = config.sections
    .filter(section => !excludedSections.includes(section.id))
    .slice(0, sectionLimit)
    .map(section => {
      const sectionQuestions = config.questions.filter(q => q.sectionId === section.id);
      const sectionAnswers = sectionQuestions.filter(q => !!answers[q.id]);
      
      const details: string[] = [];
      
      sectionAnswers.forEach(q => {
        const val = answers[q.id];
        if (!visibilityPolicy.canAppearInManual(q, viewMode)) return;

        let formattedAnswer = formatAnswer(val);
        
        if (q.manualTemplate) {
          if (["select", "multiSelect", "yesNoMaybe", "pairedChoice"].includes(q.type)) {
            formattedAnswer = formattedAnswer.toLowerCase();
          }
          details.push(applyTone(q.manualTemplate.replace("{answer}", formattedAnswer), tone, q));
        } else {
          details.push(applyTone(`${q.label} ${formattedAnswer}`, tone, q));
        }

        const note = answerNotes[q.id]?.trim();
        if (note) {
          details.push(applyTone(`In my words: ${note}`, tone, q));
        }
      });

      return {
        id: section.id,
        title: section.title,
        description: section.description,
        details
      };
    }).filter(s => s.details.length > 0);

  const recognitionSummaries = buildRecognitionSummaries(state, viewMode);
  let atAGlance = recognitionSummaries[0] || "Your manual will start taking shape as you answer a few more questions.";
  if (answeredQuestions.length > 3) {
    atAGlance = recognitionSummaries[0] || defaultAtAGlance(state.mode, answers);
  }

  return {
    id: `manual-${Date.now()}`,
    mode: state.mode,
    title: titleForFormat(config.name, artifactFormat),
    subtitle: config.label,
    audience: state.onboarding?.recipient || defaultAudience(state.mode),
    artifactFormat,
    tone,
    recipientNote: buildRecipientNote(artifactFormat),
    atAGlance,
    recognitionSummaries,
    sections: composedSections,
    ...visibilityCounts
  };
}

function formatAnswer(value: ManualState["answers"][string]): string {
  if (Array.isArray(value)) {
    if (value.length === 1) return value[0];
    if (value.length === 2) return value.join(" and ");
    if (value.length > 2) return `${value.slice(0, -1).join(", ")}, and ${value[value.length - 1]}`;
    return "";
  }

  return String(value);
}

function defaultAudience(mode: ModeId): string {
  if (mode === "work") return "someone I work with";
  if (mode === "talk") return "someone I need to talk to";
  if (mode === "us") return "someone close to me";
  return "someone who wants to understand me";
}

function titleForFormat(baseTitle: string, format: ArtifactFormat): string {
  if (format === "onePage") return "One-page manual";
  if (format === "note") return "Conversation note";
  if (format === "conversation") return "Conversation brief";
  if (format === "work") return "Work version";
  if (format === "private") return "Private copy";
  return baseTitle;
}

function buildRecipientNote(format: ArtifactFormat): string {
  if (format === "note" || format === "conversation") {
    return "This is not a demand or a diagnosis. It is context for a conversation with more care and less guessing.";
  }

  if (format === "work") {
    return "This is not a performance profile. It is context for working with me clearly and respectfully.";
  }

  return "This is not a demand or a diagnosis. It is context: a way to understand me with more care and less guessing.";
}

function getFormatSectionLimit(format: ArtifactFormat): number {
  if (format === "note") return 2;
  if (format === "onePage" || format === "conversation" || format === "work") return 3;
  return Number.POSITIVE_INFINITY;
}

function defaultAtAGlance(mode: ModeId, answers: ManualState["answers"]): string {
  if (mode === "me") {
    const name = answers["M_01"];
    if (name) {
      return `${name} connects best through intentional communication and thoughtful attention. This manual reflects how to understand, care for, and collaborate with ${name}.`;
    }

    return "I connect best through intentional communication and thoughtful attention. This manual reflects how to understand, care for, and collaborate with me.";
  }

  if (mode === "work") {
    return "I do my best work when expectations are clear and communication is transparent. This guide outlines my professional rhythm, focus needs, and feedback preferences.";
  }

  if (mode === "talk") {
    return "I can have hard conversations more clearly when directness comes with enough room to respond carefully.";
  }

  return "We understand each other better when we make fewer assumptions and name the context underneath our reactions.";
}

function applyTone(text: string, tone: TonePreference, question: Question): string {
  if (tone === "default") return text;
  if (tone === "shorter") return shortenSentence(text);
  if (tone === "professional") return `I value clarity and follow-through. ${text}`;
  if (tone === "warmer") return `${text} A little warmth helps this land well.`;
  if (tone === "direct") return text.replace(/^Please /, "").replace("I usually need", "I need");
  if (tone === "softer" && question.defaultVisibility !== "share") {
    return `It may help to know that ${lowercaseFirst(text)}`;
  }

  if (tone === "softer") return `It helps when ${lowercaseFirst(text)}`;
  return text;
}

function lowercaseFirst(text: string): string {
  return text.charAt(0).toLowerCase() + text.slice(1);
}

function shortenSentence(text: string): string {
  const sentence = text.split(".")[0]?.trim();
  return sentence ? `${sentence}.` : text;
}

function buildRecognitionSummaries(state: ManualState, viewMode: ManualViewMode): string[] {
  const config = PROTOCOL_MANIFEST[state.mode];
  const visibilityPolicy = createVisibilityPolicy(state);
  const visibleAnswers = config.questions
    .filter((question) => state.answers[question.id] && visibilityPolicy.canAppearInManual(question, viewMode))
    .map((question) => formatAnswer(state.answers[question.id]).toLowerCase());
  const joined = visibleAnswers.join(" ");
  const summaries: string[] = [];

  if (state.onboarding?.misunderstanding) {
    summaries.push(`So far, your manual is saying this is about ${state.onboarding.misunderstanding}, not a generic profile.`);
  }

  if (joined.includes("direct") && (joined.includes("time to think") || joined.includes("room to pause") || joined.includes("process"))) {
    summaries.push("You seem to value direct communication, but you may need time before you can respond well. The manual should say both, so people do not mistake your pause for avoidance.");
  } else if (joined.includes("space") || joined.includes("quiet")) {
    summaries.push("You seem to do better when people leave room for your pace instead of filling the silence with guesses.");
  } else if (joined.includes("context") || joined.includes("clear")) {
    summaries.push("Your answers point toward a need for clear context before people expect a useful response.");
  }

  const firstSection = config.sections[0];
  if (firstSection && visibleAnswers.length > 0) {
    summaries.push(`In ${firstSection.title.toLowerCase()}, your answers are beginning to name what helps people understand you with less guessing.`);
  }

  return [...new Set(summaries)];
}
