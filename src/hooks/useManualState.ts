/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from "react";
import {
  ArtifactFormat,
  ComposedManual,
  ManualState,
  ModeConfig,
  ModeId,
  OnboardingContext,
  Question,
  StorageMode,
  TonePreference,
  Visibility,
} from "../lib/schemaTypes";
import { getModeConfigForDepth } from "../lib/protocolManifest";
import { composeManual as buildComposedManual, ManualComposeOptions } from "../lib/manualComposer";
import { createVisibilityPolicy, VisibilityCounts } from "../lib/visibilityPolicy";
import { generateSharedUrl } from "../lib/stateCompression";
import { createStorageProvider, StorageProvider } from "../lib/storageProvider";

type ManualAnswer = ManualState["answers"][string];

export interface ManualWorkspace {
  mode: ModeId;
  storageMode: StorageMode;
  config: ModeConfig;
  visibilityCounts: VisibilityCounts;
  getAnswer: (questionId: string) => ManualAnswer | undefined;
  getAnswerNote: (questionId: string) => string;
  getVisibility: (question: Question) => Visibility;
  composeManual: (options?: ManualComposeOptions) => ComposedManual;
  getShareUrl: () => string;
  activate: () => void;
  updateAnswer: (questionId: string, value: ManualAnswer) => void;
  clearAnswer: (questionId: string) => void;
  updateAnswerNote: (questionId: string, note: string) => void;
  updateVisibility: (questionId: string, visibility: Visibility) => void;
  updateArtifactFormat: (format: ArtifactFormat) => void;
  updateTone: (tone: TonePreference) => void;
  setStorageMode: (storageMode: StorageMode) => void;
}

function createDefaultState(mode: ModeId = "me", storageMode: StorageMode = "memory"): ManualState {
  return {
    mode,
    answers: {},
    answerNotes: {},
    visibilityByQuestion: {},
    storageMode,
    artifactFormat: "full",
    tone: "default",
    updatedAt: new Date().toISOString()
  };
}

function isSupportedManualMode(mode: string | undefined): mode is ModeId {
  return mode === "me" || mode === "work" || mode === "talk" || mode === "us";
}

export function useManualState() {
  const [state, setState] = useState<ManualState>(() => createDefaultState());
  const [isInitialized, setIsInitialized] = useState(false);

  const [hashError, setHashError] = useState(false);
  const [provider, setProvider] = useState<StorageProvider>(() => 
    createStorageProvider(state.storageMode, () => setHashError(true))
  );

  // ── Initialize from storage ──────────────────────────────────────
  useEffect(() => {
    if (!isInitialized) {
      // Create initial provider based on current hash state if it exists
      const initialProvider = createStorageProvider("url", () => setHashError(true));
      const saved = initialProvider.load();
      if (saved) {
        setState(saved);
        setProvider(createStorageProvider(saved.storageMode, () => setHashError(true)));
      }
      setIsInitialized(true);
    }
  }, [isInitialized]);

  // ── Sync state changes to storage ────────────────────────────────
  useEffect(() => {
    if (isInitialized) {
      provider.save(state);
    }
  }, [state, isInitialized, provider]);

  // ── Handle storage mode changes ──────────────────────────────────
  useEffect(() => {
    if (isInitialized) {
      setProvider(prev => {
        prev.clear(); // Clear old storage
        return createStorageProvider(state.storageMode, () => setHashError(true));
      });
    }
  }, [state.storageMode, isInitialized]);

  const clearHashError = useCallback(() => {
    setHashError(false);
    provider.clear();
  }, [provider]);

  const setMode = useCallback((mode: ModeId, onboarding?: OnboardingContext) => {
    setState(prev => ({
      ...prev,
      mode,
      answers: {}, // Clear answers when switching major modes
      answerNotes: {},
      visibilityByQuestion: {},
      onboarding,
      artifactFormat: defaultArtifactFormat(onboarding),
      tone: "default",
      updatedAt: new Date().toISOString()
    }));
  }, []);

  const updateAnswer = useCallback((questionId: string, value: ManualAnswer) => {
    setState(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: value },
      updatedAt: new Date().toISOString()
    }));
  }, []);

  const clearAnswer = useCallback((questionId: string) => {
    setState(prev => {
      const answers = { ...prev.answers };
      const answerNotes = { ...(prev.answerNotes || {}) };
      delete answers[questionId];
      delete answerNotes[questionId];

      return {
        ...prev,
        answers,
        answerNotes,
        updatedAt: new Date().toISOString()
      };
    });
  }, []);

  const updateAnswerNote = useCallback((questionId: string, note: string) => {
    setState(prev => ({
      ...prev,
      answerNotes: { ...(prev.answerNotes || {}), [questionId]: note },
      updatedAt: new Date().toISOString()
    }));
  }, []);

  const updateVisibility = useCallback((questionId: string, visibility: Visibility) => {
    setState(prev => ({
      ...prev,
      visibilityByQuestion: { ...prev.visibilityByQuestion, [questionId]: visibility },
      updatedAt: new Date().toISOString()
    }));
  }, []);

  const setStorageMode = useCallback((storageMode: StorageMode) => {
    setState(prev => ({ ...prev, storageMode, updatedAt: new Date().toISOString() }));
  }, []);

  const updateArtifactFormat = useCallback((artifactFormat: ArtifactFormat) => {
    setState(prev => ({ ...prev, artifactFormat, updatedAt: new Date().toISOString() }));
  }, []);

  const updateTone = useCallback((tone: TonePreference) => {
    setState(prev => ({ ...prev, tone, updatedAt: new Date().toISOString() }));
  }, []);

  const resetState = useCallback((newState?: ManualState) => {
    setState(newState || createDefaultState());
  }, []);


  const getManualForRoute = useCallback((routeMode: string | undefined): ManualWorkspace | null => {
    if (!isSupportedManualMode(routeMode)) return null;

    const workingState =
      state.mode === routeMode
        ? state
        : createDefaultState(routeMode, state.storageMode);
    const config = getModeConfigForDepth(routeMode, workingState.onboarding?.depth || "manual");
    const visibilityPolicy = createVisibilityPolicy(workingState);

    return {
      mode: workingState.mode,
      storageMode: workingState.storageMode,
      config,
      visibilityCounts: visibilityPolicy.getCounts(),
      getAnswer: (questionId) => workingState.answers[questionId],
      getAnswerNote: (questionId) => workingState.answerNotes?.[questionId] || "",
      getVisibility: visibilityPolicy.visibilityFor,
      composeManual: (options) => buildComposedManual(workingState, options),
      getShareUrl: () => generateSharedUrl(workingState),
      activate: () => {
        if (state.mode !== routeMode) {
          setMode(routeMode);
        }
      },
      updateAnswer,
      clearAnswer,
      updateAnswerNote,
      updateVisibility,
      updateArtifactFormat,
      updateTone,
      setStorageMode,
    };
  }, [clearAnswer, setMode, setStorageMode, state, updateAnswer, updateAnswerNote, updateArtifactFormat, updateTone, updateVisibility]);

  return {
    storageMode: state.storageMode,
    isInitialized,
    hashError,
    clearHashError,
    setMode,
    setStorageMode,
    resetState,
    getManualForRoute
  };
}

function defaultArtifactFormat(onboarding?: OnboardingContext): ArtifactFormat {
  if (!onboarding) return "full";
  if (onboarding.depth === "note") return "note";
  if (onboarding.recipient.includes("work") || onboarding.recipient.includes("manager") || onboarding.recipient.includes("teammate")) {
    return "work";
  }

  return "full";
}
