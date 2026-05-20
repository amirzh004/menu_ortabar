'use client';

import { useState } from 'react';
import { MenuCategory, MenuItem } from '@/types/menu';
import MenuCard from '../MenuCard/MenuCard';
import Modal from '../Modal/Modal';
import styles from './MenuSection.module.css';

interface MenuSectionProps {
    category: MenuCategory;
}

export default function MenuSection({ category }: MenuSectionProps) {
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

    const visibleSubs = category.subcategories.filter(
        (sub) => sub.items && sub.items.length > 0
    );

    if (visibleSubs.length === 0) return null;

    return (
        <section
            className={styles.section}
            data-category-id={category.id}
            aria-label={`Категория ${category.name}`}
        >
            <h2 className={styles.categoryTitle}>{category.name}</h2>

            {visibleSubs.map((sub) => (
                <div
                    key={sub.id}
                    id={sub.id}
                    data-subcategory-id={sub.id}
                    data-parent-category={category.id}
                    className={styles.subBlock}
                    aria-label={`Подкатегория ${sub.name}`}
                >
                    <h3 className={styles.subTitle}>{sub.name}</h3>
                    <ul className={styles.grid} role="list">
                        {sub.items.map((item) => (
                            <li key={item.id}>
                                <MenuCard
                                    item={item}
                                    onClick={() => setSelectedItem(item)}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            ))}

            {selectedItem && (
                <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />
            )}
        </section>
    );
}