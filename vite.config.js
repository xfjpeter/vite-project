import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import path from 'path'

/**
 * https://vitejs.dev/config/
 * @type {import('vite').UserConfig}
 */

export default defineConfig({
  alias: {
    '@': path.resolve(__dirname, 'src')
  },
  plugins: [vue(), vueJsx()],
  server: {
    proxy: {
      '/api': {
        ws: false,
        changeOrigin: true,
        target: 'http://127.0.0.1:8000',
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
