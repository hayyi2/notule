import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { esbuildCommonjs } from '@originjs/vite-plugin-commonjs';

const basenameProd = '/react-shadcn-starter'

export default defineConfig(({ command }) => {
  const isProd = command === 'build'

  return {
    base: isProd ? basenameProd : '',
    plugins: [react()],
    optimizeDeps: {
      esbuildOptions: {
        plugins: [esbuildCommonjs(['react-moment'])],
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      global: {
        basename: isProd ? basenameProd : '',
      },
    },
  }
})