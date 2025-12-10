import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // For GitHub Pages, set base to your repo name (e.g., '/glitch-lab/')
  // For custom domain or root deployment, use '/'
  base: '/',
})
