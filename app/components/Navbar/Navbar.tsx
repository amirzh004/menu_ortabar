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

    // Состояние видимости верхнего ряда (категорий)
    const [isCategoryRowHidden, setIsCategoryRowHidden] = useState(false);

    const navbarRef = useRef<HTMLElement>(null);
    const categoryRowRef = useRef<HTMLDivElement>(null);
    const subcategoryRowRef = useRef<HTMLDivElement>(null);

    const isScrollingRef = useRef(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const currentCategory = visibleCategories.find(
        (c) => c.id === activeCategory
    );

    const getNavbarHeight = useCallback(() => {
        return navbarRef.current?.offsetHeight ?? 110;
    }, []);

    const scrollToElement = useCallback(
        (id: string) => {
            const el = document.getElementById(id);
            if (!el) return;

            isScrollingRef.current = true;
            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

            const navHeight = getNavbarHeight();
            const top = el.getBoundingClientRect().top + window.scrollY - navHeight - 8;

            window.scrollTo({ top, behavior: 'smooth' });

            scrollTimeoutRef.current = setTimeout(() => {
                isScrollingRef.current = false;
            }, 1000);
        },
        [getNavbarHeight]
    );

    // Определение активной подкатегории + скрытие/показ верхнего ряда
    // Скролл-обработчик: и скрытие категорий, и активная подкатегория
    useEffect(() => {
        let lastScrollY = window.scrollY;
        let ticking = false;

        const update = () => {
            const currentScrollY = window.scrollY;
            const diff = currentScrollY - lastScrollY;

            // 1) Скрытие/показ верхнего ряда категорий
            if (!isScrollingRef.current) {
                if (currentScrollY < 150) {
                    // У верха страницы — всегда показываем
                    setIsCategoryRowHidden(false);
                } else if (diff > 4) {
                    // Скролл вниз — прячем
                    setIsCategoryRowHidden(true);
                } else if (diff < -4) {
                    // Скролл вверх — показываем
                    setIsCategoryRowHidden(false);
                }
            }

            // 2) Определение активной подкатегории
            if (!isScrollingRef.current) {
                const navHeight = getNavbarHeight();
                const triggerPoint = navHeight + 50;

                const subBlocks = Array.from(
                    document.querySelectorAll<HTMLElement>('[data-subcategory-id]')
                );

                if (subBlocks.length > 0) {
                    let currentSubId = subBlocks[0].dataset.subcategoryId!;
                    let currentCatId = subBlocks[0].dataset.parentCategory!;

                    for (const block of subBlocks) {
                        const rect = block.getBoundingClientRect();
                        if (rect.top <= triggerPoint) {
                            currentSubId = block.dataset.subcategoryId!;
                            currentCatId = block.dataset.parentCategory!;
                        } else {
                            break;
                        }
                    }

                    setActiveSubcategory((prev) =>
                        prev !== currentSubId ? currentSubId : prev
                    );
                    setActiveCategory((prev) =>
                        prev !== currentCatId ? currentCatId : prev
                    );
                }
            }

            lastScrollY = currentScrollY;
            ticking = false;
        };

        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(update);
        };

        // Запускаем один раз при монтировании
        update();

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, [getNavbarHeight]);

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
            <div
                className={`${styles.row} ${styles.categoryRow} ${
                    isCategoryRowHidden ? styles.hidden : ''
                }`}
                ref={categoryRowRef}
            >
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