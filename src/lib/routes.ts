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

const INFO_PAGE_PATHS = new Set([HOW_IT_WORKS_PATH, PRIVACY_PATH]);

interface RouteLocation {
  pathname: string;
  hash: string;
}

export function hasSharedStateHash(hash: string) {
  return hash.startsWith("#s=") || hash.includes("s=");
}

export function manualModePath(mode: string) {
  return `${MANUAL_PATH_PREFIX}${mode}`;
}

export function shouldBootReactImmediately(location: RouteLocation) {
  return (
    location.pathname.startsWith(MANUAL_PATH_PREFIX) ||
    INFO_PAGE_PATHS.has(location.pathname) ||
    hasSharedStateHash(location.hash)
  );
}
