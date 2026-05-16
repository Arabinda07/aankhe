export const HOME_PATH = "/";
export const HOW_IT_WORKS_PATH = "/how-it-works";
export const PRIVACY_PATH = "/privacy";
export const MANUAL_PATH_PREFIX = "/manual/";

export const MANUAL_PATHS = {
  me: `${MANUAL_PATH_PREFIX}me`,
  work: `${MANUAL_PATH_PREFIX}work`,
  talk: `${MANUAL_PATH_PREFIX}talk`,
  us: `${MANUAL_PATH_PREFIX}us`,
} as const;

export function manualModePath(mode: string) {
  return `${MANUAL_PATH_PREFIX}${mode}`;
}
