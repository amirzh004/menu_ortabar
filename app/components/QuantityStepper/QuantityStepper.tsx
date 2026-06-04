'use client';

import { MenuItem } from '@/types/menu';
import { useCart } from '@/context/CartContext';
import styles from './QuantityStepper.module.css';

interface Props {
    item: MenuItem;
    size?: 'sm' | 'lg' | 'block';
}

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
                {isBlock ? '+ Добавить к заказу' : '+'}
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
                −
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
                +
            </button>
        </div>
    );
}