import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import autoImport from 'unplugin-auto-import/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(), //
    vueDevTools(),
    autoImport({
      imports: [
        'vue', //
        'pinia',
        'vue-router',
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/assets/styles/scss-var.scss" as *;
          @use "@/assets/styles/mixin.scss" as *;
        `,
      },
    },
  },
});
