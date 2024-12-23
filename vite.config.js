import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  server: {
    port: parseInt(process.env.PORT) || 5173,
    host: true,
  },
  plugins: [react()],
})