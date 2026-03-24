import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { cloudflare } from "@cloudflare/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), cloudflare()],
  server: {
    warmup: {
      clientFiles: ['app/**/*.tsx'],
    },
  },
  optimizeDeps: {
    entries: ["src/**/*.tsx", "src/**/*.ts"],
  }
})