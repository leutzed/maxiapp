import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': {
        target: 'http://localhost:3000',
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
      '/calendar': {
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
      interval: 1000,
    },
    // Add historyApiFallback to handle client-side routing on reload
    historyApiFallback: true,
  }
})