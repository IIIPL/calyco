import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')

  // Fallback to process.env for Vercel deployment (where .env files don't exist)
  const shopifyDomain = env.VITE_SHOPIFY_STOREFRONT_DOMAIN || process.env.VITE_SHOPIFY_STOREFRONT_DOMAIN
  const shopifyToken = env.VITE_SHOPIFY_STOREFRONT_TOKEN || process.env.VITE_SHOPIFY_STOREFRONT_TOKEN

  return {
    plugins: [
      react(),
      mdx(),
    ],
    define: {
      'import.meta.env.VITE_SHOPIFY_STOREFRONT_DOMAIN': JSON.stringify(shopifyDomain),
      'import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN': JSON.stringify(shopifyToken),
    },
    build: {
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'framer-motion': ['framer-motion'],
            'icons': ['lucide-react', 'react-icons'],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
    },
  }
})

