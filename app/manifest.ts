import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Maison Cocktail - Art de la Mixologie Française',
    short_name: 'Maison Cocktail',
    description: 'Découvrez l\'art de la mixologie française avec notre collection exclusive de cocktails artisanaux.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0A0A',
    theme_color: '#D4B896',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['food', 'drink', 'lifestyle'],
    lang: 'fr',
    orientation: 'portrait-primary',
  }
}