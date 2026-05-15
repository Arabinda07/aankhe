import { createPreloadOnce } from "./preloadOnce";

export const loadManualBuilder = createPreloadOnce(() => import("../components/ManualBuilder"));

export function preloadManualBuilder() {
  void loadManualBuilder();
}
