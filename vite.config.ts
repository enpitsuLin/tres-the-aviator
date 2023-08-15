import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { templateCompilerOptions } from '@tresjs/core'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(templateCompilerOptions)],
  resolve: {
    alias: {
      '@tresjs/core': '/home/enpitsulin/projects/tres/src/index.ts',
    },
  },
})
