import { defineConfig } from 'vitest/config'
import preact from '@preact/preset-vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [preact(), tailwindcss()],
  build: { target: 'es2022', cssCodeSplit: true },
  test: { environment: 'node', include: ['src/**/*.test.ts'] },
})
