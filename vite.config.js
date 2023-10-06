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
        src: 'https://res.cloudinary.com/diov69qe2/image/upload/v1696492815/cslr3sga1gba6t8cvxop.png',
        type: 'image/png',
        sizes: '512x512',
      },
      {
        src: 'https://res.cloudinary.com/diov69qe2/image/upload/v1696491836/xnx2shupccdjrdjnyy4h.png',
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
        src: 'https://res.cloudinary.com/diov69qe2/image/upload/v1696492846/vuzgbqytujbepgkxpn9z.png',
        sizes: '1024x1024',
      },
    ],
  },
};

export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
});



