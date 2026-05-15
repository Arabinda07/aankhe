import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const app = readFileSync(new URL("../App.tsx", import.meta.url), "utf8");
const siteHeader = readFileSync(new URL("../components/SiteHeader.tsx", import.meta.url), "utf8");

test("mobile navigation lives behind the header hamburger, not a floating bottom bar", () => {
  assert.ok(!app.includes("MobileNav"), "App should not render the fixed bottom MobileNav");
  assert.ok(!app.includes("pb-mobile-nav"), "App should not reserve bottom padding for a removed floating nav");
  assert.match(siteHeader, /aria-label="Open menu"/);
  assert.match(siteHeader, /MobileHeaderMenu/);
});
