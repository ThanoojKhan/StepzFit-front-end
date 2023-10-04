import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

const manifestForPlugin = {
  registerType: 'autoUpdate',
  devOptions: {
    enabled: true
  },
  includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
  manifest: {
    short_name: 'StepzFit',
    name: 'StepzFit',
    icons: [
      {
        src: '/src/assets/images/logo/cropped512x512.png',
        type: 'image/png',
        sizes: '512x512',
      },
      {
        src: '/src/assets/images/logo/cropped.png',
        type: 'image/png',
        sizes: '192x192',
      },
    ],
    id: '/?source=pwa',
    start_url: '/?source=pwa',
    background_color: 'black',
    display: 'standalone',
    scope: '/',
    theme_color: 'black',
    splashScreens: [
      {
        src: '/src/assets/images/logo/StepzFit-Logo-allscn.png',
        sizes: '1024x1024',
      },
    ],
  },
};

export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
});



