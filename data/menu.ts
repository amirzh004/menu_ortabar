import { MenuCategory } from '@/types/menu';

export const companyInfo = {
    name: 'Orta Bar',
    logo: '/logo.webp',
    address: 'г. Астана, ул. Мангилик Ел, 40',
    phone: '+7 (705) 525-23-50',
    workingHours: 'Ежедневно с 13:00 до 03:00',
    socials: {
        instagram: 'https://www.instagram.com/orta_bar_astana?igsh=NnlhZWozaGJkcG1w',
        twogis: 'https://2gis.kz/astana/geo/70000001087741298',
    },
    serviceCharge: '+10% обслуживание',
};

export const seoConfig = {
    siteUrl: 'https://ortabar.kz', // замените на ваш реальный домен
    siteName: 'Orta Bar',
    defaultTitle: 'Orta Bar — бар, дымные коктейли и кухня в Астане | Меню заведения',
    titleTemplate: '%s | Orta Bar',
    description:
        'Orta Bar — атмосферный бар в Астане. Авторские коктейли, дымные коктейли и вкусная кухня. Меню с ценами, фото и описанием блюд. Бронирование столиков.',
    keywords: [
        'Orta Bar',
        'Орта бар',
        'Орта Бар Астана',
        'бар Астана',
        'меню бара',
        'авторские коктейли',
        'дымные коктейли',
        'дымный коктейль Астана',
        'крафтовые коктейли',
        'коктейльный бар',
        'кухня бара',
        'бар с дымным коктейлем',
        'бар с кухней',
        'где попить коктейли в Астане',
        'лучший бар Астана',
        'караоке Астана',
        'забронировать столик',
        'меню Orta Bar',
        'ресторан Астана',
        'лаунж бар',
        'ortabar',
    ],
    ogImage: '/og-image.jpg', // создайте картинку 1200x630 в public/
    locale: 'ru_KZ',
    geo: {
        region: 'KZ-AST',
        placename: 'Астана',
        position: '51.103418, 71.43075',
        latitude: '51.103418',
        longitude: '71.43075',
    },
    priceRange: '$$',
    cuisine: ['Европейская', 'Авторская', 'Коктейли', 'Дымные коктейли'],
};

export const banners: string[] = [
    // '/banner1.jpg',
];

export const menuData: MenuCategory[] = [
    {
        id: 'bar',
        name: 'Бар',
        subcategories: [
            // ===== ПИВО =====
            {
                id: 'bar-draft-beer',
                name: 'Разливное пиво',
                items: [
                    {
                        id: 'bar-draft-german-300',
                        name: 'Немецкое, 300 мл',
                        description: 'Разливное немецкое пиво',
                        price: 990,
                        weight: '300 мл',
                    },
                    {
                        id: 'bar-draft-german-500',
                        name: 'Немецкое, 500 мл',
                        description: 'Разливное немецкое пиво',
                        price: 1350,
                        weight: '500 мл',
                    },
                    {
                        id: 'bar-draft-german-3l',
                        name: 'Немецкое, 3 литра',
                        description: 'Разливное немецкое пиво',
                        price: 7750,
                        weight: '3 л',
                    },
                    {
                        id: 'bar-draft-holsten-300',
                        name: 'Holsten, 300 мл',
                        description: 'Разливное пиво Holsten',
                        price: 1250,
                        weight: '300 мл',
                    },
                    {
                        id: 'bar-draft-holsten-500',
                        name: 'Holsten, 500 мл',
                        description: 'Разливное пиво Holsten',
                        price: 1750,
                        weight: '500 мл',
                    },
                    {
                        id: 'bar-draft-holsten-3l',
                        name: 'Holsten, 3 литра',
                        description: 'Разливное пиво Holsten',
                        price: 10000,
                        weight: '3 л',
                    },
                    {
                        id: 'bar-draft-blanc-300',
                        name: 'BLANC, 300 мл',
                        description: 'Разливное пшеничное пиво BLANC',
                        price: 1550,
                        weight: '300 мл',
                    },
                    {
                        id: 'bar-draft-blanc-500',
                        name: 'BLANC, 500 мл',
                        description: 'Разливное пшеничное пиво BLANC',
                        price: 1950,
                        weight: '500 мл',
                    },
                    {
                        id: 'bar-draft-blanc-3l',
                        name: 'BLANC, 3 литра',
                        description: 'Разливное пшеничное пиво BLANC',
                        price: 11300,
                        weight: '3 л',
                    },
                ],
            },
            {
                id: 'bar-bottle-beer',
                name: 'Бутылочное пиво',
                items: [
                    {
                        id: 'bar-bottle-linebrew',
                        name: 'Line Brew',
                        description: 'Бутылочное пиво Line Brew',
                        price: 2000,
                        weight: '0.5 л',
                    },
                    {
                        id: 'bar-bottle-tsintao',
                        name: 'Tsintao',
                        description: 'Китайское бутылочное пиво',
                        price: 2500,
                        weight: '0.33 л',
                    },
                    {
                        id: 'bar-bottle-garage',
                        name: 'Garage 400',
                        description: 'Слабоалкогольный напиток Garage',
                        price: 1700,
                        weight: '0.4 л',
                    },
                    {
                        id: 'bar-bottle-somersby',
                        name: 'Somersby',
                        description: 'Сидр Somersby',
                        price: 1700,
                        weight: '0.4 л',
                    },
                    {
                        id: 'bar-bottle-carlsberg-0',
                        name: 'Carlsberg Pilsner 0',
                        description: 'Безалкогольное пиво Carlsberg Pilsner',
                        price: 2000,
                        weight: '0.45 л',
                    },
                ],
            },

            // ===== КРЕПКИЙ АЛКОГОЛЬ =====
            {
                id: 'bar-whiskey',
                name: 'Виски',
                items: [
                    {
                        id: 'bar-whiskey-ballantines',
                        name: 'Ballantines',
                        description: 'Шотландский купажированный виски',
                        price: 1990,
                        weight: '50 мл',
                    },
                    {
                        id: 'bar-whiskey-jameson',
                        name: 'Jameson Original',
                        description: 'Ирландский купажированный виски',
                        price: 2200,
                        weight: '50 мл',
                    },
                    {
                        id: 'bar-whiskey-chivas',
                        name: 'Chivas 12',
                        description: 'Шотландский виски 12-летней выдержки',
                        price: 3290,
                        weight: '50 мл',
                    },
                ],
            },
            {
                id: 'bar-vodka',
                name: 'Водка',
                items: [
                    {
                        id: 'bar-vodka-nemiroff',
                        name: 'Nemiroff',
                        description: 'Украинская водка Nemiroff',
                        price: 1700,
                        weight: '50 мл',
                    },
                    {
                        id: 'bar-vodka-absolut',
                        name: 'Absolut',
                        description: 'Шведская водка Absolut',
                        price: 1990,
                        weight: '50 мл',
                    },
                    {
                        id: 'bar-vodka-grey-goose',
                        name: 'Grey Goose',
                        description: 'Французская премиум-водка Grey Goose',
                        price: 2590,
                        weight: '50 мл',
                    },
                ],
            },
            {
                id: 'bar-cognac',
                name: 'Коньяк / Brandy',
                items: [
                    {
                        id: 'bar-cognac-ararat',
                        name: 'ARARAT 5 y.o.',
                        description: 'Армянский коньяк 5-летней выдержки',
                        price: 1800,
                        weight: '50 мл',
                    },
                    {
                        id: 'bar-cognac-martell',
                        name: 'Martell VS',
                        description: 'Французский коньяк Martell VS',
                        price: 3400,
                        weight: '50 мл',
                    },
                    {
                        id: 'bar-cognac-hennessy',
                        name: 'Hennessy VS',
                        description: 'Французский коньяк Hennessy VS',
                        price: 4890,
                        weight: '50 мл',
                    },
                    {
                        id: 'bar-cognac-zhenis',
                        name: 'Женис',
                        description: 'Казахстанский коньяк Женис',
                        price: 3300,
                        weight: '50 мл',
                    },
                ],
            },
            {
                id: 'bar-rum',
                name: 'Ром',
                items: [
                    {
                        id: 'bar-rum-bacardi-blanco',
                        name: 'Bacardi Carta Blanca',
                        description: 'Белый ром Bacardi',
                        price: 1990,
                        weight: '50 мл',
                    },
                    {
                        id: 'bar-rum-bacardi-negra',
                        name: 'Bacardi Carta Negra',
                        description: 'Тёмный ром Bacardi',
                        price: 1990,
                        weight: '50 мл',
                    },
                    {
                        id: 'bar-rum-oakhert',
                        name: 'Oakhert',
                        description: 'Ром Oakhert',
                        price: 2190,
                        weight: '50 мл',
                    },
                ],
            },
            {
                id: 'bar-tequila',
                name: 'Текила',
                items: [
                    {
                        id: 'bar-tequila-olmeca-blanco',
                        name: 'Olmeca Blanco',
                        description: 'Серебряная текила Olmeca',
                        price: 1900,
                        weight: '50 мл',
                    },
                    {
                        id: 'bar-tequila-olmeca-gold',
                        name: 'Olmeca Gold',
                        description: 'Золотая текила Olmeca',
                        price: 1900,
                        weight: '50 мл',
                    },
                ],
            },
            {
                id: 'bar-gin',
                name: 'Джин',
                items: [
                    {
                        id: 'bar-gin-beefeater',
                        name: 'Beefeater',
                        description: 'Лондонский сухой джин Beefeater',
                        price: 2100,
                        weight: '50 мл',
                    },
                ],
            },
            {
                id: 'bar-liqueur',
                name: 'Ликёры',
                items: [
                    {
                        id: 'bar-liqueur-baileys',
                        name: 'Baileys',
                        description: 'Ирландский сливочный ликёр Baileys',
                        price: 2000,
                        weight: '50 мл',
                    },
                    {
                        id: 'bar-liqueur-jager',
                        name: 'Jägermeister',
                        description: 'Немецкий травяной ликёр Jägermeister',
                        price: 2100,
                        weight: '50 мл',
                    },
                ],
            },
            {
                id: 'bar-vermouth',
                name: 'Вермуты',
                items: [
                    {
                        id: 'bar-vermouth-bianco',
                        name: 'Martini Bianco',
                        description: 'Итальянский белый вермут Martini Bianco',
                        price: 1900,
                        weight: '100 мл',
                    },
                    {
                        id: 'bar-vermouth-rosso',
                        name: 'Martini Rosso',
                        description: 'Итальянский красный вермут Martini Rosso',
                        price: 1900,
                        weight: '100 мл',
                    },
                ],
            },

            // ===== ВИНО =====
            {
                id: 'bar-sparkling',
                name: 'Игристые вина',
                items: [
                    {
                        id: 'bar-sparkling-martini-asti',
                        name: 'Martini Asti',
                        description: 'Итальянское сладкое игристое вино',
                        price: 16490,
                        weight: 'бутылка',
                    },
                    {
                        id: 'bar-sparkling-lambrusco',
                        name: 'Lambrusco',
                        description: 'Итальянское полусладкое игристое вино',
                        price: 8000,
                        weight: 'бутылка',
                    },
                ],
            },
            {
                id: 'bar-wine',
                name: 'Вино',
                items: [
                    {
                        id: 'bar-wine-sanvalentin-white',
                        name: 'San Valentin White Wine',
                        description: 'Белое вино San Valentin',
                        price: 18400,
                        weight: 'бутылка',
                    },
                    {
                        id: 'bar-wine-sanvalentin-red',
                        name: 'San Valentin Red Wine',
                        description: 'Красное вино San Valentin',
                        price: 18400,
                        weight: 'бутылка',
                    },
                ],
            },

            // ===== КОКТЕЙЛИ =====
            {
                id: 'bar-cocktails',
                name: 'Алкогольные коктейли',
                items: [
                    {
                        id: 'bar-cocktails-aperol',
                        name: 'Aperol Spritz',
                        description: 'Aperol, просекко, содовая, апельсин',
                        price: 3600,
                        weight: '150 мл',
                    },
                    {
                        id: 'bar-cocktails-tequila-sunrise',
                        name: 'Tequila Sunrise',
                        description: 'Текила, апельсиновый сок, гренадин',
                        price: 3600,
                        weight: '150 мл',
                    },
                    {
                        id: 'bar-cocktails-white-russa',
                        name: 'White Russia',
                        description: 'Водка, кофейный ликёр, сливки',
                        price: 3600,
                        weight: '150 мл',
                    },
                    {
                        id: 'bar-cocktails-long-island',
                        name: 'Long Island Iced Tea',
                        description: 'Водка, ром, джин, текила, трипл сек, лимонный сок, кола',
                        price: 3600,
                        weight: '150 мл',
                    },
                ],
            },

            // ===== ЗАКУСКИ К ПИВУ =====
            {
                id: 'bar-beer-snacks',
                name: 'Закуски к пиву',
                items: [
                    {
                        id: 'bar-snack-suhari',
                        name: 'Сухари',
                        description: 'Хрустящие сухарики к пиву',
                        price: 1190,
                        weight: '100 г',
                    },
                    {
                        id: 'bar-snack-kurt',
                        name: 'Курт, 4 шт',
                        description: 'Традиционный казахский сушёный сыр',
                        price: 1190,
                        weight: '4 шт',
                    },
                    {
                        id: 'bar-snack-chips',
                        name: 'Чипсы',
                        description: 'Картофельные чипсы',
                        price: 1290,
                        weight: '100 г',
                    },
                    {
                        id: 'bar-snack-chechil',
                        name: 'Чечил',
                        description: 'Копчёный сыр-косичка',
                        price: 1500,
                        weight: '100 г',
                    },
                    {
                        id: 'bar-snack-pistachio',
                        name: 'Фисташки',
                        description: 'Жареные солёные фисташки',
                        price: 1990,
                        weight: '100 г',
                    },
                    {
                        id: 'bar-snack-peanut',
                        name: 'Арахис',
                        description: 'Жареный солёный арахис',
                        price: 1390,
                        weight: '100 г',
                    },
                    {
                        id: 'bar-snack-peanut-wasabi',
                        name: 'Арахис в панировке васаби',
                        description: 'Арахис в острой панировке с васаби',
                        price: 1500,
                        weight: '100 г',
                    },
                    {
                        id: 'bar-snack-beer-set',
                        name: 'Пивной сет',
                        description: 'Чипсы, фисташки, арахис, чечил, арахис в острой панировке васаби',
                        price: 6200,
                        weight: 'сет',
                    },
                ],
            },

            // ===== ЧАЙ =====
            {
                id: 'bar-tea',
                name: 'Авторские чаи',
                items: [
                    {
                        id: 'bar-tea-black',
                        name: 'Чёрный чай',
                        description: 'Классический чёрный чай',
                        price: 2200,
                        weight: 'чайник',
                    },
                    {
                        id: 'bar-tea-green',
                        name: 'Зелёный чай',
                        description: 'Классический зелёный чай',
                        price: 2200,
                        weight: 'чайник',
                    },
                    {
                        id: 'bar-tea-oblepiha',
                        name: 'Облепиховый',
                        description: 'Авторский чай с облепихой',
                        price: 2500,
                        weight: 'чайник',
                    },
                    {
                        id: 'bar-tea-berry',
                        name: 'Ягодный',
                        description: 'Авторский чай с ягодным миксом',
                        price: 2400,
                        weight: 'чайник',
                    },
                    {
                        id: 'bar-tea-tashkent',
                        name: 'Ташкентский',
                        description: 'Авторский ташкентский чай',
                        price: 2400,
                        weight: 'чайник',
                    },
                    {
                        id: 'bar-tea-marrakesh',
                        name: 'Мараканский',
                        description: 'Авторский мараканский чай',
                        price: 2500,
                        weight: 'чайник',
                    },
                ],
            },
            {
                id: 'bar-tea-extras',
                name: 'К чаю',
                items: [
                    {
                        id: 'bar-tea-honey',
                        name: 'Мёд',
                        description: 'Натуральный мёд к чаю',
                        price: 690,
                        weight: '50 г',
                    },
                    {
                        id: 'bar-tea-lemon',
                        name: 'Лимон',
                        description: 'Свежий лимон',
                        price: 590,
                        weight: '100 г',
                    },
                    {
                        id: 'bar-tea-chocolate',
                        name: 'Шоколад Kazakhstan',
                        description: 'Казахстанский шоколад к чаю',
                        price: 1800,
                        weight: '100 г',
                    },
                    {
                        id: 'bar-tea-sweets',
                        name: 'Восточные сладости',
                        description: 'Ассорти восточных сладостей',
                        price: 4700,
                        weight: 'ассорти',
                    },
                ],
            },

            // ===== НАПИТКИ =====
            {
                id: 'bar-drinks',
                name: 'Напитки',
                items: [
                    {
                        id: 'bar-drink-rish',
                        name: 'Сок Rich',
                        description: 'Натуральный сок Rich',
                        price: 3490,
                        weight: '1 л',
                    },
                    {
                        id: 'bar-drink-tassay-025',
                        name: 'Вода Tassay с газом / без газа, 0.25',
                        description: 'Минеральная вода Tassay',
                        price: 1200,
                        weight: '0.25 л',
                    },
                    {
                        id: 'bar-drink-tassay-05',
                        name: 'Вода Tassay с газом / без газа, 0.5',
                        description: 'Минеральная вода Tassay',
                        price: 1500,
                        weight: '0.5 л',
                    },
                    {
                        id: 'bar-drink-borjomi',
                        name: 'Borjomi',
                        description: 'Грузинская минеральная вода Borjomi',
                        price: 2100,
                        weight: '500 мл',
                    },
                    {
                        id: 'bar-drink-redbull',
                        name: 'Red Bull',
                        description: 'Энергетический напиток Red Bull',
                        price: 2100,
                        weight: '0.25 л',
                    },
                    {
                        id: 'bar-drink-coca-025',
                        name: 'Coca-Cola 0.25',
                        description: 'Газированный напиток Coca-Cola',
                        price: 1200,
                        weight: '0.25 л',
                    },
                    {
                        id: 'bar-drink-coca-05',
                        name: 'Coca-Cola 0.5',
                        description: 'Газированный напиток Coca-Cola',
                        price: 1450,
                        weight: '0.5 л',
                    },
                    {
                        id: 'bar-drink-schweppes',
                        name: 'Schweppes Tonic',
                        description: 'Тоник Schweppes',
                        price: 1400,
                        weight: '0.45 л',
                    },
                ],
            },

            // ===== ЛИМОНАДЫ =====
            {
                id: 'bar-lemonades',
                name: 'Лимонады',
                items: [
                    {
                        id: 'bar-lemonade-mango',
                        name: 'Манго-маракуйя',
                        description: 'Авторский лимонад манго-маракуйя',
                        price: 3200,
                        weight: '1 л',
                    },
                    {
                        id: 'bar-lemonade-berry',
                        name: 'Ягодный микс',
                        description: 'Авторский лимонад с ягодным миксом',
                        price: 3200,
                        weight: '1 л',
                    },
                    {
                        id: 'bar-lemonade-pineapple',
                        name: 'Ананасовый',
                        description: 'Авторский ананасовый лимонад',
                        price: 3200,
                        weight: '1 л',
                    },
                    {
                        id: 'bar-lemonade-kiwi',
                        name: 'Киви-лайм',
                        description: 'Авторский лимонад киви-лайм',
                        price: 3200,
                        weight: '1 л',
                    },
                    {
                        id: 'bar-lemonade-peach',
                        name: 'Персик-апельсин',
                        description: 'Авторский лимонад персик-апельсин',
                        price: 3200,
                        weight: '1 л',
                    },
                    {
                        id: 'bar-lemonade-mojito',
                        name: 'Мохито',
                        description: 'Безалкогольный лимонад мохито',
                        price: 3200,
                        weight: '1 л',
                    },
                ],
            },
        ],
    },

    // ===== ДЫМНЫЕ КОКТЕЙЛИ =====
    {
        id: 'hookah',
        name: 'Дымные коктейли',
        subcategories: [
            {
                id: 'hookah-flavors',
                name: 'Вкусы',
                items: [
                    {
                        id: 'hookah-flavors-fruit',
                        name: 'Фруктовый',
                        description: 'Дымный коктейль с фруктовым вкусом',
                        price: 6000,
                        weight: '50 г',
                    },
                    {
                        id: 'hookah-flavors-berry',
                        name: 'Ягодный',
                        description: 'Дымный коктейль с ягодным вкусом',
                        price: 6000,
                        weight: '50 г',
                    },
                    {
                        id: 'hookah-flavors-citrus',
                        name: 'Цитрусовый',
                        description: 'Дымный коктейль с цитрусовым вкусом',
                        price: 6000,
                        weight: '50 г',
                    },
                ],
            },
        ],
    },

    // ===== КУХНЯ =====
    {
        id: 'kitchen',
        name: 'Кухня',
        subcategories: [
            {
                id: 'kitchen-hot',
                name: 'Горячее',
                items: [
                    // добавите позиции по фото меню кухни
                ],
            },
            {
                id: 'kitchen-salads',
                name: 'Салаты',
                items: [],
            },
            {
                id: 'kitchen-snacks',
                name: 'Закуски',
                items: [],
            },
        ],
    },
];