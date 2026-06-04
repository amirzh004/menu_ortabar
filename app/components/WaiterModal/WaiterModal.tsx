'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import QRCode from 'qrcode';
import { useCart, priceOf } from '@/context/CartContext';
import { encodeOrder, OrderLine } from '@/lib/order';
import styles from './WaiterModal.module.css';

export default function WaiterModal({ onClose }: { onClose: () => void }) {
    const { lines } = useCart();
    const [mounted, setMounted] = useState(false);
    const [qr, setQr] = useState<string>('');

    useEffect(() => {
        setMounted(true);
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    useEffect(() => {
        const order: OrderLine[] = lines.map((l) => ({
            n: l.item.name,
            q: l.qty,
            p: priceOf(l.item),
            ...(l.item.image && { img: l.item.image }),
        }));
        const url = `${window.location.origin}/order?d=${encodeOrder(order)}`;
        QRCode.toDataURL(url, { width: 360, margin: 1 }).then(setQr).catch(() => {});
    }, [lines]);

    if (!mounted) return null;

    const content = (
        <div className={styles.fullscreen}>
            <button className={styles.close} onClick={onClose} aria-label="Закрыть">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none"
                     stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                     aria-hidden="true">
                    <line x1="6" y1="6" x2="18" y2="18" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
            </button>

            <div className={styles.inner}>
                <h2 className={styles.title}>Покажите QR официанту</h2>

                {qr && (
                    <div className={styles.qrBox}>
                        <img src={qr} alt="QR-код заказа" className={styles.qr} />
                    </div>
                )}

                <ul className={styles.list}>
                    {lines.map((l) => (
                        <li key={l.item.id} className={styles.row}>
                            <span className={styles.name}>{l.item.name}</span>
                            <span className={styles.qty}>× {l.qty}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );

    return createPortal(content, document.body);
}