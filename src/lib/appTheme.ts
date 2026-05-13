export type ThemePreference = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "ankahe-theme-preference";

const THEME_PREFERENCES: ThemePreference[] = ["light", "dark", "system"];

export function isThemePreference(value: unknown): value is ThemePreference {
  return typeof value === "string" && THEME_PREFERENCES.includes(value as ThemePreference);
}

export function getStoredThemePreference(): ThemePreference {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isThemePreference(stored) ? stored : "system";
  } catch {
    return "system";
  }
}

export function resolveThemePreference(preference: ThemePreference): ResolvedTheme {
  if (preference !== "system") return preference;

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function applyResolvedTheme(
  preference: ThemePreference,
  root: HTMLElement = document.documentElement
): ResolvedTheme {
  const resolved = resolveThemePreference(preference);

  root.classList.toggle("dark", resolved === "dark");
  root.dataset.themePreference = preference;
  root.dataset.themeResolved = resolved;

  return resolved;
}
