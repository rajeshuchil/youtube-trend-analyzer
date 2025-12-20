import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  /**
   * WHY: Dev proxy avoids CORS issues during local development
   * - Requests to /api/* are proxied to backend
   * - Browser sees same origin (localhost:5174)
   * - Backend still validates requests in production
   * 
   * USAGE: Set VITE_API_URL to '/api' in .env.local for proxy
   *        Or keep full URL for direct backend calls
   */
  server: {
    port: 5174,
    /**
     * Proxy config for when backend runs locally
     * If using remote backend (Render), set full URL in .env.local instead
     */
    proxy: {
      '/api': {
        target: process.env.VITE_PROXY_TARGET || 'https://youtube-trend-analyzer-ry6z.onrender.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  }
})
