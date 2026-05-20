import Header from './components/Header/Header';
import Banner from './components/Banner/Banner';
import Navbar from './components/Navbar/Navbar';
import MenuSection from './components/MenuSection/MenuSection';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import { menuData, companyInfo, seoConfig } from '@/data/menu';

export default function Home() {
    const visibleCategories = menuData.filter((cat) =>
        cat.subcategories.some((sub) => sub.items && sub.items.length > 0)
    );

    // Schema.org для меню — Google понимает это как ресторанное меню
    const menuSchema = {
        '@context': 'https://schema.org',
        '@type': 'Menu',
        name: `Меню ${companyInfo.name}`,
        description: `Полное меню заведения ${companyInfo.name} — бар, коктейли, кухня`,
        inLanguage: 'ru-KZ',
        hasMenuSection: visibleCategories.map((category) => ({
            '@type': 'MenuSection',
            name: category.name,
            hasMenuSection: category.subcategories
                .filter((sub) => sub.items && sub.items.length > 0)
                .map((sub) => ({
                    '@type': 'MenuSection',
                    name: sub.name,
                    hasMenuItem: sub.items.map((item) => ({
                        '@type': 'MenuItem',
                        name: item.name,
                        description: item.description,
                        ...(item.image && {
                            image: `${seoConfig.siteUrl}${item.image}`,
                        }),
                        offers: {
                            '@type': 'Offer',
                            price: item.price,
                            priceCurrency: 'KZT',
                            availability: 'https://schema.org/InStock',
                        },
                        ...(item.weight && {
                            suitableForDiet: undefined,
                            menuAddOn: {
                                '@type': 'MenuItem',
                                name: item.weight,
                            },
                        }),
                    })),
                })),
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(menuSchema),
                }}
            />

            <h1 style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
                Orta Bar — бар, дымный коктейль и кухня в Астане.
            </h1>

            <Header />
            <Banner />
            <Navbar />
            <main id="menu">
                {visibleCategories.map((category) => (
                    <MenuSection key={category.id} category={category} />
                ))}
            </main>
            <Footer />
            <ScrollToTop />
        </>
    );
}