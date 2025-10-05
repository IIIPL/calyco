import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mdx(),
  ],
  define: {
    'import.meta.env.VITE_SHOPIFY_STOREFRONT_DOMAIN': JSON.stringify(process.env.VITE_SHOPIFY_STOREFRONT_DOMAIN),
    'import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN': JSON.stringify(process.env.VITE_SHOPIFY_STOREFRONT_TOKEN),
  },
})

