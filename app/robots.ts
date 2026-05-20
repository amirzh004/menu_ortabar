import type { MetadataRoute } from 'next';
import { seoConfig } from '@/data/menu';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/_next/'],
            },
            {
                userAgent: 'Yandex',
                allow: '/',
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
            },
        ],
        sitemap: `${seoConfig.siteUrl}/sitemap.xml`,
        host: seoConfig.siteUrl,
    };
}