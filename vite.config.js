import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Mind the Gap',
        short_name: 'Mind the Gap',
        description: 'Short stories and essays sized to your Tube commute.',
        start_url: '.',
        scope: '.',
        display: 'standalone',
        theme_color: '#ffffff',
        background_color: '#0a0a0a',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        // Precache every built asset (JS, CSS, HTML, font, icons) so the
        // app is fully usable offline right after the first load.
        globPatterns: ['**/*.{js,css,html,woff2,svg,png,ico}'],
      },
    }),
  ],
})
