import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: parseInt(process.env.PORT) || 5173, // Use Render's port or fallback
    host: true,
  },
  plugins: [react()],
})
