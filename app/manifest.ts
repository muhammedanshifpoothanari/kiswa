import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Kiswa Store',
        short_name: 'Kiswa',
        description: 'Premium Islamic Lifestyle | Prayer Rugs, Abayas & Gifts',
        start_url: '/',
        display: 'fullscreen',
        background_color: '#ffffff',
        theme_color: '#000000',
        orientation: 'portrait',
        icons: [
            {
                src: '/logo.png',
                sizes: 'any',
                type: 'image/png',
            }
        ],
    }
}
