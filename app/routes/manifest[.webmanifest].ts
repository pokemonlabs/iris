import type { WebAppManifest } from '@remix-pwa/dev';
import { json } from '@remix-run/node';

export const loader = () => {
  return json(
    {
      short_name: 'medx1',
      name: 'Medx1',
      start_url: '/',
      display: 'standalone',
      background_color: '#d3d7dd',
      theme_color: '#c34138',
      icons: [
        {
          src: '/icons/web-app-manifest-192x192.png', // 192x192 px icon for smaller devices
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/icons/web-app-manifest-512x512.png', // 512x512 px icon for larger devices
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    } as WebAppManifest,
    {
      headers: {
        'Cache-Control': 'public, max-age=600',
        'Content-Type': 'application/manifest+json',
      },
    }
  );
};
