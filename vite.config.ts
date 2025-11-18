import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { imagetools } from 'vite-imagetools'

import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/`
export default defineConfig({
  plugins: [TanStackRouterVite(), viteReact(), tailwindcss(), imagetools()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
