import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Two landing-page variants: the original (index.html) and the
      // solar-themed one (solar.html, served at /solar on Cloudflare Pages).
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        solar: resolve(import.meta.dirname, 'solar.html'),
      },
    },
  },
})
