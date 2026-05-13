/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from "react";
import { ComposedManual, ManualState, ModeConfig, ModeId, Question, StorageMode, Visibility } from "../lib/schemaTypes";
import { PROTOCOL_MANIFEST } from "../lib/protocolManifest";
import { composeManual as buildComposedManual, ManualComposeOptions } from "../lib/manualComposer";
import { createVisibilityPolicy, VisibilityCounts } from "../lib/visibilityPolicy";
import { readStateFromHash, writeStateToHash, clearStateFromHash, generateSharedUrl } from "../lib/stateCompression";

type ManualAnswer = ManualState["answers"][string];

export interface ManualWorkspace {
  mode: ModeId;
  storageMode: StorageMode;
  config: ModeConfig;
  visibilityCounts: VisibilityCounts;
  getAnswer: (questionId: string) => ManualAnswer | undefined;
  getVisibility: (question: Question) => Visibility;
  composeManual: (options?: ManualComposeOptions) => ComposedManual;
  getShareUrl: () => string;
  activate: () => void;
  updateAnswer: (questionId: string, value: ManualAnswer) => void;
  updateVisibility: (questionId: string, visibility: Visibility) => void;
  setStorageMode: (storageMode: StorageMode) => void;
}

function createDefaultState(mode: ModeId = "me", storageMode: StorageMode = "memory"): ManualState {
  return {
    mode,
    answers: {},
    visibilityByQuestion: {},
    storageMode,
    updatedAt: new Date().toISOString()
  };
}

function isSupportedManualMode(mode: string | undefined): mode is "me" | "work" {
  return mode === "me" || mode === "work";
}

export function useManualState() {
  const [state, setState] = useState<ManualState>(() => createDefaultState());
  const [isInitialized, setIsInitialized] = useState(false);
  const [hashError, setHashError] = useState(false);

  // Initialize from hash
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith("#s=")) {
      const saved = readStateFromHash();
      if (saved) {
        setState(saved);
      } else {
        setHashError(true);
      }
    }
    setIsInitialized(true);
  }, []);

  // Sync with hash if storage mode is URL
  useEffect(() => {
    if (!isInitialized) return;

    if (state.storageMode === "url") {
      writeStateToHash(state);
    } else {
      clearStateFromHash();
    }
  }, [state, isInitialized]);

  const setMode = useCallback((mode: ModeId) => {
    setState(prev => ({
      ...prev,
      mode,
      answers: {}, // Clear answers when switching major modes
      visibilityByQuestion: {},
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

  const resetState = useCallback((newState?: ManualState) => {
    setState(newState || createDefaultState());
  }, []);

  const clearHashError = useCallback(() => {
    setHashError(false);
    clearStateFromHash();
  }, []);

  const getManualForRoute = useCallback((routeMode: string | undefined): ManualWorkspace | null => {
    if (!isSupportedManualMode(routeMode)) return null;

    const workingState =
      state.mode === routeMode
        ? state
        : createDefaultState(routeMode, state.storageMode);
    const config = PROTOCOL_MANIFEST[routeMode];
    const visibilityPolicy = createVisibilityPolicy(workingState);

    return {
      mode: workingState.mode,
      storageMode: workingState.storageMode,
      config,
      visibilityCounts: visibilityPolicy.getCounts(),
      getAnswer: (questionId) => workingState.answers[questionId],
      getVisibility: visibilityPolicy.visibilityFor,
      composeManual: (options) => buildComposedManual(workingState, options),
      getShareUrl: () => generateSharedUrl(workingState),
      activate: () => {
        if (state.mode !== routeMode) {
          setMode(routeMode);
        }
      },
      updateAnswer,
      updateVisibility,
      setStorageMode,
    };
  }, [setMode, setStorageMode, state, updateAnswer, updateVisibility]);

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
