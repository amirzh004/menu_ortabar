'use client';

import { MenuItem } from '@/types/menu';
import { useCart } from '@/context/CartContext';
import styles from './QuantityStepper.module.css';

interface Props {
    item: MenuItem;
    size?: 'sm' | 'lg' | 'block';
}

const PlusIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
         strokeLinecap="round" aria-hidden="true">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

const MinusIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
         strokeLinecap="round" aria-hidden="true">
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

export default function QuantityStepper({ item, size = 'sm' }: Props) {
    const { getQty, addItem, increment, decrement } = useCart();
    const qty = getQty(item.id);
    const isBlock = size === 'block';

    const stop = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
    };

    if (qty === 0) {
        return (
            <button
                type="button"
                className={`${styles.addBtn} ${styles[size]}`}
                onClick={(e) => {
                    stop(e);
                    addItem(item);
                }}
                aria-label={`Добавить ${item.name} в корзину`}
            >
                <span className={styles.icon}>
                    <PlusIcon />
                </span>
                {isBlock && <span className={styles.addText}>Добавить к заказу</span>}
            </button>
        );
    }

    return (
        <div className={`${styles.stepper} ${styles[size]}`} onClick={stop}>
            <button
                type="button"
                className={styles.stepBtn}
                onClick={(e) => {
                    stop(e);
                    decrement(item.id);
                }}
                aria-label="Уменьшить количество"
            >
                <span className={styles.icon}>
                    <MinusIcon />
                </span>
            </button>
            <span className={styles.qty}>{qty}</span>
            <button
                type="button"
                className={styles.stepBtn}
                onClick={(e) => {
                    stop(e);
                    increment(item.id);
                }}
                aria-label="Увеличить количество"
            >
                <span className={styles.icon}>
                    <PlusIcon />
                </span>
            </button>
        </div>
    );
}