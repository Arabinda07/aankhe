import { useCallback, useEffect, useState } from "react";
import {
  applyResolvedTheme,
  getStoredThemePreference,
  resolveThemePreference,
  THEME_STORAGE_KEY,
  ThemePreference,
  ResolvedTheme,
} from "../lib/appTheme";

export function useThemePreference() {
  const [preference, setPreferenceState] = useState<ThemePreference>(() => getStoredThemePreference());
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() =>
    resolveThemePreference(getStoredThemePreference())
  );

  useEffect(() => {
    const resolved = applyResolvedTheme(preference);
    setResolvedTheme(resolved);

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, preference);
    } catch {
      // Theme choice is progressive enhancement; failing storage should not block the app.
    }
  }, [preference]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const syncSystemTheme = () => {
      if (preference !== "system") return;

      setResolvedTheme(applyResolvedTheme(preference));
    };

    mediaQuery.addEventListener("change", syncSystemTheme);
    return () => mediaQuery.removeEventListener("change", syncSystemTheme);
  }, [preference]);

  const setPreference = useCallback((nextPreference: ThemePreference) => {
    setPreferenceState(nextPreference);
  }, []);

  return {
    preference,
    resolvedTheme,
    setPreference,
  };
}
