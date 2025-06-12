import { defineConfig } from "vitest/config";

//* environment: 'jsdom' – Simulates a browser (needed for DOM testing)
//* setupFiles – This runs before every test file
//* globals: true – so we don’t have to import describe, test, etc. every time
export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: "./setupTests.ts",
    globals: true,
  },
});
