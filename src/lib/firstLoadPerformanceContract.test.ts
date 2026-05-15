import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const app = readSource("../App.tsx");
const boot = readSource("../boot.ts");
const indexCss = readSource("../index.css");
const switchboard = readSource("../components/Switchboard.tsx");
const switchboardSetup = readSource("../components/SwitchboardSetup.tsx");
const mobileHeaderMenu = readSource("../components/MobileHeaderMenu.tsx");
const mobileNav = readSource("../components/MobileNav.tsx");
const serviceWorkerRegistration = readSource("./serviceWorkerRegistration.ts");
const viteConfig = readSource("../../vite.config.ts");

test("home route stays out of the initial motion bundle", () => {
  assert.ok(!app.includes("motion/react"), "App should not import motion/react");
  assert.ok(!app.includes("AnimatePresence"), "App should not wrap routes in AnimatePresence");
  assert.ok(!app.includes("useReducedMotion"), "App should not compute route motion preferences");
  assert.ok(!app.includes("useNavigationType"), "App should not animate by navigation direction");
  assert.ok(!app.includes("<motion."), "App should not render motion route wrappers");
});

test("home load does not schedule automatic manual preload", () => {
  assert.ok(!app.includes("from './lib/manualRoutePreload'"), "App should not statically import manual preload helpers");
  assert.ok(!app.includes("requestIdleCallback"), "App should not idle-preload ManualBuilder on home load");
  assert.ok(!app.includes("cancelIdleCallback"), "App should not schedule cancellable idle manual preload");
  assert.ok(!app.includes("setTimeout(() => preloadManualBuilder"), "App should not timeout-preload ManualBuilder");
});

test("manual preload remains tied to real start intent", () => {
  assert.match(switchboard, /onFocus=\{onManualIntentPreload\}/);
  assert.match(switchboard, /onPointerEnter=\{onManualIntentPreload\}/);
  assert.match(switchboard, /onTouchStart=\{onManualIntentPreload\}/);
  assert.match(switchboardSetup, /onManualIntentPreload\(\);[\s\S]*onStart\(recipient\.mode, onboarding\);/);
  assert.match(boot, /import\("\.\/lib\/manualRoutePreload"\)/);
  assert.match(boot, /bootApp\(\)\.then\(preloadManualAfterReadyAndScroll\)/);
});

test("home setup has no first-paint entrance animation", () => {
  assert.ok(!switchboardSetup.includes("parichay-enter"));
  assert.ok(!indexCss.includes(".parichay-enter"));
  assert.ok(!indexCss.includes("@keyframes parichay-enter"));
});

test("service worker registration stays off the critical head path", () => {
  assert.match(viteConfig, /injectRegister:\s*false/);
  assert.match(serviceWorkerRegistration, /import\.meta[\s\S]*env\?\.[\s\S]*PROD/);
  assert.match(serviceWorkerRegistration, /parichay:app-ready/);
  assert.match(serviceWorkerRegistration, /window\.addEventListener\("load"/);
  assert.match(serviceWorkerRegistration, /requestIdleCallback/);
  assert.match(serviceWorkerRegistration, /navigator\.serviceWorker\.register\("\/sw\.js", \{ scope: "\/" \}\)/);
});

test("mobile sheets load only after their controls are requested", () => {
  assert.ok(!mobileHeaderMenu.includes('from "./InstallSheet"'));
  assert.ok(!mobileHeaderMenu.includes('from "./ManualModeSheet"'));
  assert.ok(!mobileNav.includes('from "./InstallSheet"'));
  assert.ok(!mobileNav.includes('from "./ManualModeSheet"'));
  assert.match(mobileHeaderMenu, /const ManualModeSheet = lazy/);
  assert.match(mobileHeaderMenu, /const InstallSheet = lazy/);
  assert.match(mobileNav, /const ManualModeSheet = lazy/);
  assert.match(mobileNav, /const InstallSheet = lazy/);
});

function readSource(path: string) {
  return readFileSync(new URL(path, import.meta.url), "utf8");
}
