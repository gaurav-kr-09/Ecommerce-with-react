import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  //niche jo kar re hai usse ye hoga ki hamko bar bar pura web address nahi type karna padega. Agar Ye kar denge to
  //jyohi koi chiz /api se start hoga to ye automatic is link ko call kar dega.

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000'
      },
      '/images': {
        target: 'http://localhost:3000'
      }
    }
  }
})
