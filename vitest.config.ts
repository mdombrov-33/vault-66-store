import path from 'path'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

//* environment: 'jsdom' – Simulates a browser (needed for DOM testing)
//* setupFiles – This runs before every test file
//* globals: true – so we don’t have to import describe, test, etc. every time
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
    globals: true,
  },
})
