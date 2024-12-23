import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/login',
  server: {
    port: parseInt(process.env.PORT) || 5173,
    host: "0.0.0.0",
  },
  plugins: [react()],
})