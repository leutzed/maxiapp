import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': {
        target: 'http://localhost:3000', // Assuming your backend runs on port 3000
        changeOrigin: true
      },
      '/athletes': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/athlete': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/healthcheck': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    },
    watch: {
      usePolling: true,
      interval: 1000, // You can adjust polling interval as needed (in milliseconds)
    },
  }
})
