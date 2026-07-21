import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/open-learning-atlas/',
  plugins: [react()],
  build: {
    target: 'es2022',
    sourcemap: true,
  },
})
