import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import type { VitePWAOptions } from 'vite-plugin-pwa'

const PwaManifest: Partial<VitePWAOptions> = {
  registerType: 'autoUpdate',
  includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
  manifest: {
    name: 'Castar Web Port',
    short_name: 'Castar Port',
    description: 'Castar Portfolio App',
    icons: [
      {
        src: 'sword-chatgpt-removeBG.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: 'sword-chatgpt-removeBG.png', // Mainam kung may 512x512 ka rin
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      },
    ],
    theme_color: '#303030',
    background_color: '#303030',
    orientation: 'portrait',
  },
}


// https://vite.dev/config/
export default defineConfig({
  base: "/carl-main/",
  plugins: [react(),
  VitePWA(PwaManifest),
  tailwindcss()],
  build: {
    chunkSizeWarningLimit: 1000
  },

})
