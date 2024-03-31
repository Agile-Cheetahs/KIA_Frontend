import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {

  const env = loadEnv(mode, process.cwd());
  const BASE_API_URL = env.VITE_BASE_API_URL;
  return {
  plugins: [
    react(),
    legacy()
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: BASE_API_URL,
        changeOrigin: true
      }
    }
  }
};
});

