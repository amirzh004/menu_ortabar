'use client';

import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { menuData } from '@/data/menu';
import styles from './Navbar.module.css';

export default function Navbar() {
    const visibleCategories = useMemo(
        () =>
            menuData
                .map((cat) => ({
                    ...cat,
                    subcategories: cat.subcategories.filter(
                        (sub) => sub.items && sub.items.length > 0
                    ),
                }))
                .filter((cat) => cat.subcategories.length > 0),
        []
    );

    const [activeCategory, setActiveCategory] = useState<string>(
        visibleCategories[0]?.id || ''
    );
    const [activeSubcategory, setActiveSubcategory] = useState<string>(
        visibleCategories[0]?.subcategories[0]?.id || ''
    );

    const navbarRef = useRef<HTMLElement>(null);
    const categoryRowRef = useRef<HTMLDivElement>(null);
    const subcategoryRowRef = useRef<HTMLDivElement>(null);

    // Блокировка авто-определения во время программного скролла
    const isScrollingRef = useRef(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const currentCategory = visibleCategories.find(
        (c) => c.id === activeCategory
    );

    // Получаем актуальную высоту навбара для точного offset
    const getNavbarHeight = useCallback(() => {
        return navbarRef.current?.offsetHeight ?? 110;
    }, []);

    // Программный скролл к элементу
    const scrollToElement = useCallback(
        (id: string) => {
            const el = document.getElementById(id);
            if (!el) return;

            isScrollingRef.current = true;
            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

            const navHeight = getNavbarHeight();
            const top = el.getBoundingClientRect().top + window.scrollY - navHeight - 8;

            window.scrollTo({ top, behavior: 'smooth' });

            // Разблокируем определение активной секции после завершения скролла
            scrollTimeoutRef.current = setTimeout(() => {
                isScrollingRef.current = false;
            }, 1000);
        },
        [getNavbarHeight]
    );

    // Определение активной подкатегории при скролле страницы
    useEffect(() => {
        const handleScroll = () => {
            if (isScrollingRef.current) return;

            const navHeight = getNavbarHeight();
            const triggerPoint = navHeight + 50;

            // Собираем все блоки подкатегорий
            const subBlocks = Array.from(
                document.querySelectorAll<HTMLElement>('[data-subcategory-id]')
            );

            if (subBlocks.length === 0) return;

            let currentSubId = subBlocks[0].dataset.subcategoryId!;
            let currentCatId = subBlocks[0].dataset.parentCategory!;

            for (const block of subBlocks) {
                const rect = block.getBoundingClientRect();
                // Если верхняя граница блока выше точки триггера — он считается активным
                if (rect.top <= triggerPoint) {
                    currentSubId = block.dataset.subcategoryId!;
                    currentCatId = block.dataset.parentCategory!;
                } else {
                    break;
                }
            }

            setActiveSubcategory((prev) => (prev !== currentSubId ? currentSubId : prev));
            setActiveCategory((prev) => (prev !== currentCatId ? currentCatId : prev));
        };

        // Запускаем один раз при монтировании
        handleScroll();

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, [getNavbarHeight]);

    // Прокрутка активной кнопки категории в видимую область навбара
    useEffect(() => {
        const btn = categoryRowRef.current?.querySelector<HTMLElement>(
            `[data-id="${activeCategory}"]`
        );
        btn?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }, [activeCategory]);

    useEffect(() => {
        const btn = subcategoryRowRef.current?.querySelector<HTMLElement>(
            `[data-id="${activeSubcategory}"]`
        );
        btn?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }, [activeSubcategory]);

    const handleCategoryClick = (catId: string) => {
        const category = visibleCategories.find((c) => c.id === catId);
        if (!category) return;
        const firstSub = category.subcategories[0];
        if (!firstSub) return;

        setActiveCategory(catId);
        setActiveSubcategory(firstSub.id);
        scrollToElement(firstSub.id);
    };

    const handleSubcategoryClick = (subId: string, parentCatId: string) => {
        setActiveCategory(parentCatId);
        setActiveSubcategory(subId);
        scrollToElement(subId);
    };

    if (visibleCategories.length === 0) return null;

    return (
        <nav className={styles.navbar} ref={navbarRef}>
            <div className={styles.row} ref={categoryRowRef}>
                {visibleCategories.map((category) => (
                    <button
                        key={category.id}
                        data-id={category.id}
                        className={`${styles.button} ${styles.category} ${
                            activeCategory === category.id ? styles.active : ''
                        }`}
                        onClick={() => handleCategoryClick(category.id)}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            {currentCategory && currentCategory.subcategories.length > 0 && (
                <div className={styles.row} ref={subcategoryRowRef}>
                    {currentCategory.subcategories.map((sub) => (
                        <button
                            key={sub.id}
                            data-id={sub.id}
                            className={`${styles.button} ${styles.subcategory} ${
                                activeSubcategory === sub.id ? styles.activeSub : ''
                            }`}
                            onClick={() => handleSubcategoryClick(sub.id, currentCategory.id)}
                        >
                            {sub.name}
                        </button>
                    ))}
                </div>
            )}
        </nav>
    );
}