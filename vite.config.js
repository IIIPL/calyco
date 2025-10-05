import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      mdx(),
    ],
    define: {
      'import.meta.env.VITE_SHOPIFY_STOREFRONT_DOMAIN': JSON.stringify(
        env.VITE_SHOPIFY_STOREFRONT_DOMAIN
      ),
      'import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN': JSON.stringify(
        env.VITE_SHOPIFY_STOREFRONT_TOKEN
      ),
    },
  }
})

