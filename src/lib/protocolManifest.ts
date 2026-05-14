/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ModeConfig, ModeId } from "./schemaTypes";

export const PROTOCOL_MANIFEST: Record<ModeId, ModeConfig> = {
  me: {
    id: "me",
    name: "Me Manual",
    label: "How to understand me",
    description: "Write the things people should know before they guess wrong.",
    theme: "me",
    sections: [
      { id: "basics", title: "Basics", description: "Identity and core traits." },
      { id: "rhythm", title: "Rhythm", description: "Energy and presence." },
      { id: "communication", title: "Communication", description: "Styles and preferences." },
      { id: "support", title: "Support", description: "Needs and care." },
      { id: "boundaries", title: "Boundaries", description: "Limits and space." },
      { id: "tension", title: "Tension", description: "Handling difficult moments." }
    ],
    questions: [
      { id: "M_01", mode: "me", sectionId: "basics", type: "text", label: "What name do you go by?", defaultVisibility: "share", manualTemplate: "I go by {answer}." },
      { id: "M_02", mode: "me", sectionId: "basics", type: "text", label: "What are your pronouns?", defaultVisibility: "share", manualTemplate: "My pronouns are {answer}." },
      { id: "M_03", mode: "me", sectionId: "rhythm", type: "select", options: ["I lead", "I support", "I observe first", "I match the energy"], label: "In a new group, how do you usually act?", defaultVisibility: "share", manualTemplate: "In a group, I tend to: {answer}." },
      { id: "M_04", mode: "me", sectionId: "rhythm", type: "scale", min: 1, max: 5, helperText: "1 = Needs notice, 5 = Highly spontaneous", label: "How much notice do you need for plans?", defaultVisibility: "share", manualTemplate: "On a scale of 1 (needs notice) to 5 (spontaneous), I am a {answer}." },
      { id: "M_05", mode: "me", sectionId: "communication", type: "select", options: ["Process alone first", "Talk it through live", "Write it out", "Sleep on it"], label: "When something matters, how do you prefer to process it?", defaultVisibility: "share", manualTemplate: "When something is important, I prefer to {answer}." },
      { id: "M_06", mode: "me", sectionId: "communication", type: "textarea", label: "What tone of voice helps you stay open?", defaultVisibility: "share", manualTemplate: "I stay most receptive when spoken to with {answer}." },
      { id: "M_07", mode: "me", sectionId: "support", type: "multiSelect", options: ["Being listened to", "Practical help", "Quiet company", "Space", "Distraction"], label: "When you are overwhelmed, what actually helps?", defaultVisibility: "share", manualTemplate: "When I am overwhelmed, it helps if you offer {answer}." },
      { id: "M_08", mode: "me", sectionId: "support", type: "textarea", label: "What kind of help makes things worse, even if well-meant?", defaultVisibility: "private", manualTemplate: "Please avoid {answer} when I'm stressed. It usually makes things worse." },
      { id: "M_09", mode: "me", sectionId: "boundaries", type: "textarea", label: "What is a firm boundary you have?", defaultVisibility: "private", manualTemplate: "A firm boundary for me: {answer}." },
      { id: "M_10", mode: "me", sectionId: "boundaries", type: "textarea", label: "What do people sometimes take personally about you, that is not about them?", defaultVisibility: "private", manualTemplate: "Something to know: {answer}. It is never personal." },
      { id: "M_11", mode: "me", sectionId: "tension", type: "select", options: ["Go quiet", "Try to explain", "Get defensive", "Need space"], label: "When you feel criticized, what is your first reflex?", defaultVisibility: "private", manualTemplate: "When criticized, my immediate reflex is often to {answer}." },
      { id: "M_12", mode: "me", sectionId: "tension", type: "multiSelect", options: ["A little time", "A clear apology", "Reassurance", "Humor", "A gentle check-in"], label: "After tension, what helps you reconnect?", defaultVisibility: "private", manualTemplate: "To reconnect after tension, I usually need {answer}." }
    ]
  },
  work: {
    id: "work",
    name: "Work Manual",
    label: "How to work with me",
    description: "Share how you focus, decide, talk, and build trust.",
    theme: "work",
    sections: [
      { id: "focus", title: "Focus", description: "Deep work conditions." },
      { id: "communication", title: "Communication", description: "Channels and protocols." },
      { id: "meetings", title: "Meetings", description: "Sync vs async." },
      { id: "feedback", title: "Feedback", description: "Growth and critique." },
      { id: "pressure", title: "Pressure", description: "Handling urgency." }
    ],
    questions: [
      { id: "W_01", mode: "work", sectionId: "focus", type: "multiSelect", options: ["Early morning", "Late night", "Short bursts", "Long quiet blocks", "After a clear brief"], label: "When do you usually do your best deep work?", defaultVisibility: "share", manualTemplate: "I do my best deep work in {answer}." },
      { id: "W_02", mode: "work", sectionId: "focus", type: "textarea", label: "What breaks your focus fastest?", defaultVisibility: "share", manualTemplate: "My focus is most easily broken by {answer}." },
      { id: "W_03", mode: "work", sectionId: "communication", type: "select", options: ["Chat", "Email", "Shared doc", "Voice note", "Live check-in"], label: "What is the best way to send you routine updates?", defaultVisibility: "share", manualTemplate: "For routine updates, please use {answer}." },
      { id: "W_04", mode: "work", sectionId: "communication", type: "textarea", label: "What information do you need before you can respond well?", defaultVisibility: "share", manualTemplate: "Before I can respond effectively, I usually need {answer}." },
      { id: "W_05", mode: "work", sectionId: "meetings", type: "multiSelect", options: ["Agenda", "Context", "Clear decision needed", "Pre-reading"], label: "What do you need before a meeting to make it worth your time?", defaultVisibility: "share", manualTemplate: "To make a meeting effective, I need {answer} beforehand." },
      { id: "W_06", mode: "work", sectionId: "feedback", type: "select", options: ["Written", "Live", "In the moment", "During 1:1s"], label: "How do you best receive useful feedback?", defaultVisibility: "share", manualTemplate: "I best receive feedback when it is delivered {answer}." },
      { id: "W_07", mode: "work", sectionId: "feedback", type: "textarea", label: "What makes feedback land badly for you?", defaultVisibility: "private", manualTemplate: "Feedback tends to land poorly for me if {answer}." },
      { id: "W_08", mode: "work", sectionId: "pressure", type: "textarea", label: "What counts as truly urgent to you?", defaultVisibility: "share", manualTemplate: "I consider something truly urgent only if {answer}." },
      { id: "W_09", mode: "work", sectionId: "pressure", type: "text", label: "If something is truly urgent, how should someone reach you?", defaultVisibility: "share", manualTemplate: "If it's an absolute emergency, reach me via {answer}." },
      { id: "W_10", mode: "work", sectionId: "pressure", type: "textarea", label: "What does stress look like on you at work?", defaultVisibility: "private", manualTemplate: "When I'm stressed at work, I tend to {answer}." },
      { id: "W_11", mode: "work", sectionId: "pressure", type: "textarea", label: "What is the best way to disagree with you?", defaultVisibility: "share", manualTemplate: "The most effective way to disagree with me is to {answer}." }
    ]
  },
  talk: {
    id: "talk",
    name: "Conversation Manual",
    label: "How to talk with me",
    description: "Prepare a calmer conversation around what keeps getting missed.",
    theme: "talk",
    sections: [
      { id: "opening", title: "How to begin", description: "The conditions that help the conversation start well." },
      { id: "tension", title: "When tension appears", description: "What helps you stay open instead of guarded." },
      { id: "repair", title: "How to repair", description: "What makes reconnection feel possible." }
    ],
    questions: [
      { id: "T_01", mode: "talk", sectionId: "opening", type: "select", options: ["direct conversation", "gentle check-in", "written note first", "reassurance first"], label: "When something needs to be said, what kind of opening helps?", defaultVisibility: "share", manualTemplate: "I can usually stay more open when the conversation begins with {answer}." },
      { id: "T_02", mode: "talk", sectionId: "opening", type: "select", options: ["time to think", "a clear question", "a slower pace", "space to write"], label: "Before you respond, what do you often need?", defaultVisibility: "share", manualTemplate: "Before I respond clearly, I often need {answer}." },
      { id: "T_03", mode: "talk", sectionId: "tension", type: "multiSelect", options: ["urgency", "raised tone", "being interrupted", "too many questions", "assumptions about my intent"], label: "What makes it harder to stay open?", defaultVisibility: "private", manualTemplate: "It becomes harder for me to stay open when there is {answer}." },
      { id: "T_04", mode: "talk", sectionId: "tension", type: "multiSelect", options: ["calmer tone", "specific examples", "room to pause", "a shared goal", "practical next steps"], label: "When tension appears, what helps?", defaultVisibility: "share", manualTemplate: "When tension appears, it helps when we have {answer}." },
      { id: "T_05", mode: "talk", sectionId: "repair", type: "textarea", label: "What would make a hard conversation feel worth having?", defaultVisibility: "share", manualTemplate: "A hard conversation feels worth having when {answer}." },
      { id: "T_06", mode: "talk", sectionId: "repair", type: "multiSelect", options: ["a clear apology", "a next step", "less guessing", "a check-in later", "time to settle"], label: "Afterward, what helps repair?", defaultVisibility: "private", manualTemplate: "Afterward, repair usually needs {answer}." }
    ]
  },
  us: {
    id: "us",
    name: "Shared Manual",
    label: "How we understand each other",
    description: "Create a shared context note for two people trying to understand each other better.",
    theme: "us",
    sections: [
      { id: "rhythm", title: "Our rhythm", description: "How connection works best between us." },
      { id: "misreads", title: "What gets misread", description: "Patterns that deserve less guessing." },
      { id: "agreement", title: "What we can practice", description: "Simple ways to make care easier to use." }
    ],
    questions: [
      { id: "U_01", mode: "us", sectionId: "rhythm", type: "select", options: ["check in regularly", "give each other space", "write first", "talk things through live"], label: "What rhythm helps this relationship feel steady?", defaultVisibility: "share", manualTemplate: "We tend to do better when we {answer}." },
      { id: "U_02", mode: "us", sectionId: "rhythm", type: "multiSelect", options: ["clear plans", "soft starts", "direct honesty", "time to respond", "small gestures"], label: "What helps both of you feel considered?", defaultVisibility: "share", manualTemplate: "We both feel more considered when there is {answer}." },
      { id: "U_03", mode: "us", sectionId: "misreads", type: "multiSelect", options: ["silence", "speed", "tone", "forgetfulness", "needing space"], label: "What gets misread most often?", defaultVisibility: "private", manualTemplate: "We should be careful not to over-read {answer}." },
      { id: "U_04", mode: "us", sectionId: "misreads", type: "textarea", label: "What should be understood with more care?", defaultVisibility: "share", manualTemplate: "A place where we need more care: {answer}." },
      { id: "U_05", mode: "us", sectionId: "agreement", type: "multiSelect", options: ["ask before assuming", "pause before replying", "name the real need", "repair sooner", "make a smaller plan"], label: "What would be useful to practice?", defaultVisibility: "share", manualTemplate: "A useful practice for us is to {answer}." }
    ]
  }
};
