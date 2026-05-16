/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from "react";
import {
  ArtifactFormat,
  ManualState,
  ModeId,
  OnboardingContext,
  StorageMode,
  TonePreference,
  Visibility,
} from "../lib/schemaTypes";
import { createStorageProvider, StorageProvider } from "../lib/storageProvider";
import {
  createDefaultManualState,
  createManualWorkspace,
  defaultArtifactFormat,
  isSupportedManualMode,
  type ManualAnswer,
} from "../lib/manualWorkspace";
export type { ManualWorkspace } from "../lib/manualWorkspace";

export function shouldShowHashRestoreError(
  hash: string | undefined,
  savedState: ManualState | null
): boolean {
  return Boolean(hash?.startsWith("#s=") && !savedState);
}

export interface UseManualStateOptions {
  initialMode?: string;
  initialOnboarding?: OnboardingContext;
  initialStorageMode?: StorageMode;
}

export function useManualState(options: UseManualStateOptions = {}) {
  const initialMode = isSupportedManualMode(options.initialMode) ? options.initialMode : "me";
  const initialStorageMode = options.initialStorageMode || "memory";
  const [state, setState] = useState<ManualState>(() =>
    createDefaultManualState(initialMode, initialStorageMode, options.initialOnboarding)
  );
  const [isInitialized, setIsInitialized] = useState(false);

  const [hashError, setHashError] = useState(false);
  const [provider, setProvider] = useState<StorageProvider>(() => 
    createStorageProvider(initialStorageMode, () => setHashError(true))
  );

  // ── Initialize from storage ──────────────────────────────────────
  useEffect(() => {
    if (!isInitialized) {
      // Create initial provider based on current hash state if it exists
      const initialProvider = createStorageProvider("url", () => setHashError(true));
      const saved = initialProvider.load();
      if (shouldShowHashRestoreError(window.location.hash, saved)) {
        setHashError(true);
      }
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
    createStorageProvider("url").clear();
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
    setState(newState || createDefaultManualState());
  }, []);


  const getManualForRoute = useCallback((routeMode: string | undefined) =>
    createManualWorkspace(state, routeMode, {
      activate: setMode,
      updateAnswer,
      clearAnswer,
      updateAnswerNote,
      updateVisibility,
      updateArtifactFormat,
      updateTone,
      setStorageMode,
    }), [clearAnswer, setMode, setStorageMode, state, updateAnswer, updateAnswerNote, updateArtifactFormat, updateTone, updateVisibility]);

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
