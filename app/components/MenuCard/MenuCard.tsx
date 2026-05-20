'use client';

import { MenuItem } from '@/types/menu';
import styles from './MenuCard.module.css';

interface MenuCardProps {
    item: MenuItem;
    onClick: () => void;
}

export default function MenuCard({ item, onClick }: MenuCardProps) {
    return (
        <button
            className={styles.card}
            onClick={onClick}
            aria-label={`${item.name}, ${item.price} тенге. Открыть подробности`}
        >
            {item.image && (
                <div className={styles.imageWrapper}>
                    <img
                        src={item.image}
                        alt={`${item.name} — ${item.description.slice(0, 80)}`}
                        className={styles.image}
                        loading="lazy"
                    />
                </div>
            )}
            <div className={styles.content}>
                <h4 className={styles.name}>{item.name}</h4>
                <p className={styles.price}>{item.price.toLocaleString('ru-RU')} ₸</p>
            </div>
        </button>
    );
}