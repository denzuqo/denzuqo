import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    proxy: {
      '/api/zora': {
        target: 'https://api.zora.co',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/zora/, '/universal/graphql'),
      }
    }
  }
})
