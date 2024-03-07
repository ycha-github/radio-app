import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const reactPlugin = react();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  },
  worker: {
    plugins: [reactPlugin],
    format: 'es',
  },
})
