import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    warmup: {
      clientFiles: ['app/**/*.tsx'],
    },
  },
  optimizeDeps: {
    entries: ["src/**/*.tsx", "src/**/*.ts"],
  }
})
