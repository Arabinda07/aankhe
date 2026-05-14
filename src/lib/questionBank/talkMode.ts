/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Conversation Manual — "How to talk with me"
 */

import type { ModeConfig } from "../schemaTypes";

export const TALK_MODE: ModeConfig = {
    id: "talk",
    name: "Conversation Manual",
    label: "How to talk with me",
    description: "Prepare a calmer conversation around what keeps getting missed.",
    theme: "talk",
    sections: [
      { id: "preparation", title: "Preparation", description: "What this conversation is for." },
      { id: "perspective", title: "Perspective", description: "What each person may be carrying." },
      { id: "message", title: "Message", description: "Facts, feelings, needs, and requests." },
      { id: "safety", title: "Safety", description: "How to keep the conversation usable." },
      { id: "followup", title: "Follow-up", description: "What happens after the talk." },
    ],
    questions: [
      { id: "T_M_01", mode: "talk", sectionId: "preparation", depth: "mvp", priority: 1, dimension: "Goal", type: "text", label: "What is your single most important goal for this conversation?", defaultVisibility: "share", manualTemplate: "My main goal for this conversation is {answer}." },
      { id: "T_M_02", mode: "talk", sectionId: "perspective", depth: "mvp", priority: 5, dimension: "Empathy", type: "textarea", label: "What do you think is the other person's most valid concern?", defaultVisibility: "private", manualTemplate: "I want to recognize that the other person's valid concern may be {answer}." },
      { id: "T_M_03", mode: "talk", sectionId: "message", depth: "mvp", priority: 2, dimension: "Observation", type: "textarea", label: "What are the exact facts of what happened, without adding judgment?", defaultVisibility: "private", manualTemplate: "The facts I want to name are {answer}." },
      { id: "T_M_04", mode: "talk", sectionId: "message", depth: "mvp", priority: 3, dimension: "Feeling", type: "text", label: "What did those facts bring up for you?", defaultVisibility: "private", manualTemplate: "What came up for me was {answer}." },
      { id: "T_M_05", mode: "talk", sectionId: "message", depth: "mvp", priority: 4, dimension: "Need", type: "text", label: "What need or value is underneath your reaction?", defaultVisibility: "private", manualTemplate: "The need or value underneath this is {answer}." },
      { id: "T_M_06", mode: "talk", sectionId: "message", depth: "mvp", priority: 6, dimension: "Request", type: "textarea", label: "What specific, actionable thing are you asking for?", defaultVisibility: "share", manualTemplate: "My request is {answer}." },
      { id: "T_M_07", mode: "talk", sectionId: "safety", depth: "mvp", priority: 7, dimension: "Misread patterns", type: "text", label: "What is the worst way they could misread your intent?", defaultVisibility: "private", manualTemplate: "I do not want my intent misread as {answer}." },
      { id: "T_M_08", mode: "talk", sectionId: "safety", depth: "mvp", priority: 8, dimension: "De-escalation", type: "textarea", label: "If the other person becomes defensive, what will you do to make the conversation safer?", defaultVisibility: "private", manualTemplate: "If defensiveness appears, I will try to {answer}." },
      { id: "T_M_09", mode: "talk", sectionId: "perspective", depth: "mvp", priority: 9, dimension: "Accountability", type: "textarea", label: "What is your own part in this situation?", defaultVisibility: "private", manualTemplate: "My own part in this situation is {answer}." },
      { id: "T_M_10", mode: "talk", sectionId: "safety", depth: "mvp", priority: 10, dimension: "Boundaries", type: "textarea", label: "If your request is not accepted, what boundary or next step would you choose?", defaultVisibility: "private", manualTemplate: "If my request is not accepted, my next step is {answer}." },
      { id: "T_M_11", mode: "talk", sectionId: "preparation", depth: "mvp", priority: 11, dimension: "Timing", type: "text", label: "When and where is the best time to have this conversation?", defaultVisibility: "share", manualTemplate: "The best time and place for this conversation is {answer}." },
      { id: "T_M_12", mode: "talk", sectionId: "followup", depth: "mvp", priority: 12, dimension: "Follow-up", type: "text", label: "How will you follow up after the conversation ends?", defaultVisibility: "share", manualTemplate: "After the conversation, I will follow up by {answer}." },
      { id: "T_D_01", mode: "talk", sectionId: "perspective", depth: "deep", dimension: "Story check", type: "textarea", label: "What story are you telling yourself about their motives?", defaultVisibility: "private", manualTemplate: "The story I am telling myself is {answer}." },
      { id: "T_D_02", mode: "talk", sectionId: "preparation", depth: "deep", dimension: "Shared purpose", type: "text", label: "What shared goal do you both care about?", defaultVisibility: "share", manualTemplate: "A shared goal we both care about is {answer}." },
      { id: "T_D_03", mode: "talk", sectionId: "perspective", depth: "deep", dimension: "Pressure", type: "textarea", label: "What pressure might they be under that you may not be seeing?", defaultVisibility: "private", manualTemplate: "They may be under pressure around {answer}." },
      { id: "T_D_04", mode: "talk", sectionId: "safety", depth: "deep", dimension: "Readiness", type: "text", label: "What does your body or attention tell you about your readiness right now?", defaultVisibility: "private", manualTemplate: "My readiness signal right now is {answer}." },
      { id: "T_D_05", mode: "talk", sectionId: "preparation", depth: "deep", dimension: "Scope", type: "pairedChoice", leftLabel: "A single event", rightLabel: "A recurring pattern", label: "Is this mostly a single event or a recurring pattern?", defaultVisibility: "share", manualTemplate: "This conversation is about {answer}." },
      { id: "T_D_06", mode: "talk", sectionId: "message", depth: "deep", dimension: "Tone", type: "text", label: "What tone do you want to bring into the conversation?", defaultVisibility: "share", manualTemplate: "The tone I want to bring is {answer}." },
      { id: "T_D_07", mode: "talk", sectionId: "perspective", depth: "deep", dimension: "Listening", type: "textarea", label: "What questions will you ask to understand their side?", defaultVisibility: "private", manualTemplate: "To understand their side, I can ask {answer}." },
      { id: "T_D_08", mode: "talk", sectionId: "safety", depth: "deep", dimension: "Strong emotion", type: "textarea", label: "If strong emotion appears, what immediate response would help you stay respectful?", defaultVisibility: "private", manualTemplate: "If strong emotion appears, I will try to {answer}." },
      { id: "T_D_09", mode: "talk", sectionId: "followup", depth: "deep", dimension: "Negotiation", type: "text", label: "What are you willing to be flexible about?", defaultVisibility: "private", manualTemplate: "I am willing to be flexible about {answer}." },
      { id: "T_D_10", mode: "talk", sectionId: "safety", depth: "deep", dimension: "Non-negotiable", type: "text", label: "What are you not willing to negotiate?", defaultVisibility: "private", manualTemplate: "I am not willing to negotiate {answer}." },
      { id: "T_D_11", mode: "talk", sectionId: "message", depth: "deep", dimension: "Careful opening", type: "textarea", label: "What truthful appreciation or respect can you include before the hard part?", defaultVisibility: "private", manualTemplate: "I can begin with this truthful appreciation: {answer}." },
      { id: "T_D_12", mode: "talk", sectionId: "message", depth: "deep", dimension: "Facts check", type: "pairedChoice", leftLabel: "Observable facts", rightLabel: "Interpretations mixed in", label: "Are your facts observable, or are interpretations mixed in?", defaultVisibility: "private", manualTemplate: "My facts check says: {answer}." },
      { id: "T_D_13", mode: "talk", sectionId: "message", depth: "deep", dimension: "Request check", type: "pairedChoice", leftLabel: "It is a request", rightLabel: "It may sound like a demand", label: "Does your request leave room for a real response?", defaultVisibility: "private", manualTemplate: "My request check says: {answer}." },
      { id: "T_D_14", mode: "talk", sectionId: "safety", depth: "deep", dimension: "Energy", type: "pairedChoice", leftLabel: "I have capacity now", rightLabel: "I should wait", label: "Do you have enough capacity to have this conversation now?", defaultVisibility: "private", manualTemplate: "My capacity check says: {answer}." },
      { id: "T_D_15", mode: "talk", sectionId: "perspective", depth: "deep", dimension: "Respect", type: "text", label: "What respect or care do you want them to feel from you?", defaultVisibility: "share", manualTemplate: "I want them to feel this respect or care: {answer}." },
      { id: "T_D_16", mode: "talk", sectionId: "followup", depth: "deep", dimension: "Outcome", type: "text", label: "What would a workable outcome look like for them?", defaultVisibility: "private", manualTemplate: "A workable outcome for them may look like {answer}." },
      { id: "T_D_17", mode: "talk", sectionId: "preparation", depth: "deep", dimension: "Trust context", type: "pairedChoice", leftLabel: "There is enough trust to talk", rightLabel: "Trust is already thin", label: "What is the trust context going into this conversation?", defaultVisibility: "private", manualTemplate: "The trust context is: {answer}." },
      { id: "T_D_18", mode: "talk", sectionId: "followup", depth: "deep", dimension: "Support", type: "text", label: "If the talk goes poorly, who or what will help you steady yourself afterward?", defaultVisibility: "private", manualTemplate: "If the talk goes poorly, I can steady myself with {answer}." },
      { id: "T_D_19", mode: "talk", sectionId: "message", depth: "deep", dimension: "Language check", type: "pairedChoice", leftLabel: "Mostly specific language", rightLabel: "Some sweeping language to revise", label: "Are you using specific language instead of sweeping claims?", defaultVisibility: "private", manualTemplate: "My language check says: {answer}." },
      { id: "T_D_20", mode: "talk", sectionId: "message", depth: "deep", dimension: "Pacing", type: "text", label: "How long will you speak before pausing for their response?", defaultVisibility: "share", manualTemplate: "I will pause for their response after {answer}." },
      { id: "T_D_21", mode: "talk", sectionId: "followup", depth: "deep", dimension: "Stakes", type: "text", label: "If no agreement is reached, what changes next?", defaultVisibility: "private", manualTemplate: "If no agreement is reached, the next change is {answer}." },
      { id: "T_D_22", mode: "talk", sectionId: "perspective", depth: "deep", dimension: "Active listening", type: "textarea", label: "How will you show that you are listening while they speak?", defaultVisibility: "share", manualTemplate: "I will show I am listening by {answer}." },
      { id: "T_D_23", mode: "talk", sectionId: "perspective", depth: "deep", dimension: "Outside view", type: "text", label: "What might a fair outside observer say about this situation?", defaultVisibility: "private", manualTemplate: "A fair outside observer might say {answer}." },
      { id: "T_D_24", mode: "talk", sectionId: "followup", depth: "deep", dimension: "Closure", type: "text", label: "How will you close the conversation with care, even if it is not fully resolved?", defaultVisibility: "share", manualTemplate: "I can close the conversation with care by {answer}." },
    ],
};
