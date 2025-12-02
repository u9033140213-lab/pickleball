import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Use relative base so assets load correctly on GitHub Pages project sites
export default defineConfig({
  base: './',
  plugins: [react()],
})
