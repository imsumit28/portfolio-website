import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  ssr: {
    // These ship directory imports / ESM layouts that Node's own resolver
    // rejects when left external, which breaks the prerender step. Bundling
    // them into dist-ssr sidesteps resolution entirely.
    noExternal: ['react-icons', 'react-github-calendar'],
  },
})
