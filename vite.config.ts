import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      outDir: 'docs',
      injectRegister: 'auto',
      workbox: {
        globDirectory: 'docs',
        globPatterns: ['**/*.{js,css,html,png,webmanifest}'],
        navigateFallback: '/hotlist/index.html',
        navigateFallbackDenylist: [/^\/hotlist\/assets\//],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/firestore\.googleapis\.com\//,
            handler: 'NetworkFirst',
            options: { cacheName: 'firestore-cache' },
          },
          {
            urlPattern: /^https:\/\/lh3\.googleusercontent\.com\//,
            handler: 'CacheFirst',
            options: { cacheName: 'avatar-cache', expiration: { maxEntries: 10, maxAgeSeconds: 604800 } },
          },
        ],
      },
      manifest: {
        name: 'Hotlist',
        short_name: 'Hotlist',
        description: 'Checklist de coleções Hot Wheels.',
        start_url: '/hotlist/',
        scope: '/hotlist/',
        id: '/hotlist/',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#0d1117',
        theme_color: '#0d1117',
        icons: [
          { src: './icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: './icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
          { src: './icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: './icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
    }),
  ],
  base: mode === 'development' ? '/' : '/hotlist/',
  build: { outDir: 'docs' },
}))
