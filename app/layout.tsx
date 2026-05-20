import type { Metadata, Viewport } from 'next';
import { companyInfo, seoConfig } from '@/data/menu';
import './globals.css';

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    themeColor: '#1a1715',
};

export const metadata: Metadata = {
    metadataBase: new URL(seoConfig.siteUrl),
    title: {
        default: seoConfig.defaultTitle,
        template: seoConfig.titleTemplate,
    },
    description: seoConfig.description,
    keywords: seoConfig.keywords,
    authors: [{ name: companyInfo.name }],
    creator: companyInfo.name,
    publisher: companyInfo.name,
    applicationName: companyInfo.name,
    category: 'Restaurant',
    classification: 'Bar, Restaurant',

    alternates: {
        canonical: '/',
        languages: {
            'ru-KZ': '/',
            'ru': '/',
        },
    },

    openGraph: {
        type: 'website',
        locale: seoConfig.locale,
        url: seoConfig.siteUrl,
        siteName: seoConfig.siteName,
        title: seoConfig.defaultTitle,
        description: seoConfig.description,
        images: [
            {
                url: seoConfig.ogImage,
                width: 1200,
                height: 630,
                alt: `${companyInfo.name} — бар и кухня в Астане`,
            },
        ],
    },

    twitter: {
        card: 'summary_large_image',
        title: seoConfig.defaultTitle,
        description: seoConfig.description,
        images: [seoConfig.ogImage],
        creator: '@ortabar',
    },

    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },

    appleWebApp: {
        title: 'Orta Bar',
        statusBarStyle: 'black-translucent',
        capable: true,
    },

    icons: {
        icon: [
            { url: '/favicon.ico', sizes: 'any' },
            { url: '/favicon.svg', type: 'image/svg+xml' },
            { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
        ],
        apple: [
            { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        ],
        shortcut: '/favicon.ico',
    },

    manifest: '/site.webmanifest',

    verification: {
        // когда подключите Google Search Console и Яндекс.Вебмастер — добавьте сюда ключи
        // google: 'your-google-verification-code',
        // yandex: 'your-yandex-verification-code',
    },

    other: {
        'geo.region': seoConfig.geo.region,
        'geo.placename': seoConfig.geo.placename,
        'geo.position': seoConfig.geo.position,
        'ICBM': `${seoConfig.geo.latitude}, ${seoConfig.geo.longitude}`,
    },
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    // Schema.org structured data — это критично для локального бизнеса
    const restaurantSchema = {
        '@context': 'https://schema.org',
        '@type': ['Restaurant', 'BarOrPub', 'LocalBusiness'],
        '@id': seoConfig.siteUrl,
        name: companyInfo.name,
        alternateName: ['Орта Бар', 'Орта бар', 'ortabar', 'Orta Bar Astana', 'Орта Бар Астана'],
        description: seoConfig.description,
        url: seoConfig.siteUrl,
        telephone: companyInfo.phone,
        image: `${seoConfig.siteUrl}${seoConfig.ogImage}`,
        logo: `${seoConfig.siteUrl}${companyInfo.logo}`,
        priceRange: seoConfig.priceRange,
        servesCuisine: seoConfig.cuisine,
        areaServed: {
            '@type': 'City',
            name: 'Астана',
        },
        currenciesAccepted: 'KZT',
        paymentAccepted: 'Cash, Credit Card',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'ул. Мангилик Ел, 40',
            addressLocality: 'Астана',
            addressRegion: 'Астана',
            postalCode: '010000',
            addressCountry: 'KZ',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: seoConfig.geo.latitude,
            longitude: seoConfig.geo.longitude,
        },
        openingHoursSpecification: [
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                    'Sunday',
                ],
                opens: '13:00',
                closes: '03:00',
            },
        ],
        sameAs: [
            companyInfo.socials.instagram,
            companyInfo.socials.twogis,
        ].filter(Boolean),
        hasMenu: `${seoConfig.siteUrl}/#menu`,
        acceptsReservations: 'True',
        smokingAllowed: true,
        amenityFeature: [
            {
                '@type': 'LocationFeatureSpecification',
                name: 'Авторские коктейли',
                value: true,
            },
            {
                '@type': 'LocationFeatureSpecification',
                name: 'Бар',
                value: true,
            },
        ],
    };

    const websiteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: companyInfo.name,
        url: seoConfig.siteUrl,
        inLanguage: 'ru-KZ',
    };

    return (
        <html lang="ru">
        <head>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(restaurantSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(websiteSchema),
                }}
            />
        </head>
        <body>{children}</body>
        </html>
    );
}