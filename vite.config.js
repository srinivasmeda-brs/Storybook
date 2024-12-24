import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // This allows the app to be accessible externally (useful for testing on different devices)
    port: process.env.PORT || 5173, // You can replace this with your desired port number
  },
});
