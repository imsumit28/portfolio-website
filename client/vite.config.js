import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { leetcodeApiPlugin } from './plugins/leetcodeApiPlugin.js'

export default defineConfig({
  plugins: [react(), leetcodeApiPlugin()],
  ssr: {
    // These ship directory imports / ESM layouts that Node's own resolver
    // rejects when left external, which breaks the prerender step. Bundling
    // them into dist-ssr sidesteps resolution entirely.
    noExternal: ['react-icons', 'react-github-calendar'],
  },
})
