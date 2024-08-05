import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Express 伺服器的地址
        changeOrigin: true,//讓請求看起來統一由前端端口發出，避免CORS限制
        //CORS:跨來源資源共享（CORS）是一種基於 HTTP 標頭的機制，允許伺服器指示瀏覽器允許從除其自身以外的任何來源
        rewrite: (path) => path.replace(/^\/api/, ''),//將任何帶有URL/api的網址中，將URL替換成target
      },
    },
  },
})
