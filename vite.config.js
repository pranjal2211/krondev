import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,        // listen on all addresses, including LAN
    watch: {
      usePolling: true,   // forces Vite to poll for file changes
      interval: 50,      // checks every 50ms
    }
  }
})