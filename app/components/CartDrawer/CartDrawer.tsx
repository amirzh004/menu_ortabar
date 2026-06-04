'use client';

import {useEffect, useState} from 'react';
import {createPortal} from 'react-dom';
import {useCart, priceOf} from '@/context/CartContext';
import {companyInfo} from '@/data/menu';
import WaiterModal from '../WaiterModal/WaiterModal';
import styles from './CartDrawer.module.css';

const WHATSAPP_PHONE = '77055252350';
const SERVICE_PERCENT = companyInfo.serviceChargePercent; // 10

export default function CartDrawer({onClose}: { onClose: () => void }) {
    const {lines, increment, decrement, totalPrice, totalCount} = useCart();
    const [mounted, setMounted] = useState(false);
    const [showWaiter, setShowWaiter] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEsc);
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = prev;
        };
    }, [onClose]);

    if (!mounted) return null;

    const service = Math.round((totalPrice * SERVICE_PERCENT) / 100);
    const grandTotal = totalPrice + service;

    const waText = encodeURIComponent(
        'Заказ Orta Bar:\n' +
        lines
            .map(
                (l) =>
                    `• ${l.item.name} × ${l.qty} — ${(
                        priceOf(l.item) * l.qty
                    ).toLocaleString('ru-RU')} ₸`
            )
            .join('\n') +
        `\n\nСумма: ${totalPrice.toLocaleString('ru-RU')} ₸` +
        `\nОбслуживание (${SERVICE_PERCENT}%): ${service.toLocaleString('ru-RU')} ₸` +
        `\nИтого: ${grandTotal.toLocaleString('ru-RU')} ₸`
    );
    const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${waText}`;

    const content = (
        <div className={styles.overlay} onClick={onClose}>
            <div
                className={styles.drawer}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label="Корзина"
            >
                <div className={styles.header}>
                    <h2 className={styles.title}>Корзина</h2>
                    <button
                        className={styles.closeButton}
                        onClick={onClose}
                        aria-label="Закрыть"
                    >
                        ×
                    </button>
                </div>

                {lines.length === 0 ? (
                    <p className={styles.empty}>Корзина пуста</p>
                ) : (
                    <>
                        <ul className={styles.list}>
                            {lines.map((l) => (
                                <li key={l.item.id} className={styles.line}>
                                    {l.item.image && (
                                        <img
                                            src={l.item.image}
                                            alt={l.item.name}
                                            className={styles.lineImg}
                                        />
                                    )}
                                    <div className={styles.lineInfo}>
                                        <span className={styles.lineName}>{l.item.name}</span>
                                        <span className={styles.linePrice}>
                                            {(priceOf(l.item) * l.qty).toLocaleString('ru-RU')} ₸
                                        </span>
                                    </div>
                                    <div className={styles.lineStepper}>
                                        <button
                                            className={styles.stepBtn}
                                            onClick={() => decrement(l.item.id)}
                                            aria-label="Уменьшить"
                                        >
                                            −
                                        </button>
                                        <span className={styles.qty}>{l.qty}</span>
                                        <button
                                            className={styles.stepBtn}
                                            onClick={() => increment(l.item.id)}
                                            aria-label="Увеличить"
                                        >
                                            +
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className={styles.footer}>
                            <div className={styles.sumRow}>
                                <span>Сумма ({totalCount})</span>
                                <span>{totalPrice.toLocaleString('ru-RU')} ₸</span>
                            </div>
                            <div className={styles.sumRow}>
                                <span>Обслуживание {SERVICE_PERCENT}%</span>
                                <span>{service.toLocaleString('ru-RU')} ₸</span>
                            </div>
                            <div className={styles.totalRow}>
                                <span>Итого</span>
                                <span className={styles.total}>
                                    {grandTotal.toLocaleString('ru-RU')} ₸
                                </span>
                            </div>

                            <div className={styles.actions}>
                                <button
                                    className={styles.primaryBtn}
                                    onClick={() => setShowWaiter(true)}
                                >
                                    Показать официанту
                                </button>
                                <a
                                    className={styles.waBtn}
                                    href={waUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Отправить в WhatsApp
                                </a>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {showWaiter && <WaiterModal onClose={() => setShowWaiter(false)}/>}
        </div>
    );

    return createPortal(content, document.body);
}