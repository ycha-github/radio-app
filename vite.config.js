import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
// const reactPlugin = react();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  },
  worker: {
    plugins: [react()],
    format: 'es',
  },
  // build: {
  //   target:'esnext'
  // },
  // resolve: {
  //   alias: {
  //     "/@": path.resolve(__dirname, "./src"),
  //     "@tests": path.resolve(__dirname, "./tests")
  //   }
  // },
  // build: {
  //   target: 'esnext', // you can also use 'es2020' here
  // },
  // optimizeDeps: {
  //   esbuildOptions: {
  //     target: 'esnext', // you can also use 'es2020' here
  //   },
  // },
  // build: {
  //   lib: {
  //     formats: ['es']
  //   }
  // }
  // build: {
  //   target: 'esnext',
  //   rollupOptions: {
  //     external: [
  //       "@react-refresh"
  //     ],
  //   },
  // },
 
})
