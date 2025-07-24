import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Enable Fast Refresh optimizations
      fastRefresh: true,
    }),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,jpg,jpeg,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'unsplash-images',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
        ],
      },
      manifest: {
        name: 'Akalewold Magera Portfolio',
        short_name: 'AK Portfolio',
        description: 'Full-stack developer portfolio showcasing projects and skills',
        theme_color: '#6366f1',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/vite.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
          },
        ],
      },
    }),
  ],
  build: {
    // Optimize chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          icons: ['react-icons/fa6', 'react-icons/si'],
        },
        // Add hash to filenames for better caching - force .js extension
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: (chunkInfo) => {
          // Force .js extension for all entry files, regardless of source extension
          const name = chunkInfo.name.replace(/\.(jsx|ts|tsx)$/, '');
          return `assets/${name}-[hash].js`;
        },
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Enhanced minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
        dead_code: true,
      },
      mangle: {
        safari10: true,
      },
    },
    // Target modern browsers for better performance
    target: ['es2020', 'chrome60', 'firefox60', 'safari11', 'edge79'],
    // Optimize CSS
    cssCodeSplit: true,
    cssMinify: true,
    // Reduce bundle size
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000,
    // Force cache invalidation
    assetsInlineLimit: 0,
  },
  // Optimize server performance
  server: {
    compress: true,
    force: true,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['@vite/client', '@vite/env'],
  },
  // Enable experimental features for better performance
  esbuild: {
    target: 'es2020',
    // Remove unused imports automatically
    treeShaking: true,
  },
})
