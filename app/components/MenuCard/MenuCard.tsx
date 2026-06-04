'use client';

import { MenuItem } from '@/types/menu';
import styles from './MenuCard.module.css';

interface MenuCardProps {
    item: MenuItem;
    onClick: () => void;
}

export default function MenuCard({ item, onClick }: MenuCardProps) {
    const hasDiscount =
        item.discountPrice != null && item.discountPrice < item.price;

    const ariaPrice = hasDiscount
        ? `${item.discountPrice!.toLocaleString('ru-RU')} тенге со скидкой`
        : `${item.price.toLocaleString('ru-RU')} тенге`;

    return (
        <button
            className={styles.card}
            onClick={onClick}
            aria-label={`${item.name}, ${ariaPrice}. Открыть подробности`}
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

                {hasDiscount ? (
                    <div className={styles.priceWrapper}>
                        <span className={styles.oldPrice}>
                            {item.price.toLocaleString('ru-RU')} ₸
                        </span>
                        <span className={styles.price}>
                            {item.discountPrice!.toLocaleString('ru-RU')} ₸
                        </span>
                    </div>
                ) : (
                    <p className={styles.price}>
                        {item.price.toLocaleString('ru-RU')} ₸
                    </p>
                )}
            </div>
        </button>
    );
}