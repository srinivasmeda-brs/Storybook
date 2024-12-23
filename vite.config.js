import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: process.env.PORT || 4173, // Use the PORT environment variable or fall back to 5173
    host: true, // Allow external access
  },
  plugins: [react()],
})
