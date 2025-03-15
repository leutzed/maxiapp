import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      '/athletes': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      '/calendar': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      '/team': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      '/healthcheck': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
