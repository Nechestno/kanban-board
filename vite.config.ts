import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sassDts from 'vite-plugin-sass-dts'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), sassDts()],
  server:{
    watch:{
      usePolling:true,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
})
