import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    strictPort: true,
    port: 8080,
    proxy: {
      '/auth': {
        target: 'http://backend:3000',
        changeOrigin: true,
        secure: false,
      },
      '/athletes': {
        target: 'http://backend:3000',
        changeOrigin: true,
        secure: false,
      },
      '/calendar': {
        target: 'http://backend:3000',
        changeOrigin: true,
        secure: false,
      },
      '/team': {
        target: 'http://backend:3000',
        changeOrigin: true,
        secure: false,
      },
      '/healthcheck': {
        target: 'http://backend:3000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
