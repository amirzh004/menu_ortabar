'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { MenuItem } from '@/types/menu';
import styles from './Modal.module.css';

interface ModalProps {
    item: MenuItem;
    onClose: () => void;
}

export default function Modal({ item, onClose }: ModalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        // Сохраняем текущую позицию скролла и блокируем body
        const scrollY = window.scrollY;
        const originalStyle = {
            overflow: document.body.style.overflow,
            position: document.body.style.position,
            top: document.body.style.top,
            width: document.body.style.width,
        };
        const originalHtmlScrollBehavior = document.documentElement.style.scrollBehavior;

        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';

        document.addEventListener('keydown', handleEsc);

        return () => {
            document.removeEventListener('keydown', handleEsc);

            // Временно отключаем плавный скролл, чтобы возврат был мгновенным
            document.documentElement.style.scrollBehavior = 'auto';

            document.body.style.overflow = originalStyle.overflow;
            document.body.style.position = originalStyle.position;
            document.body.style.top = originalStyle.top;
            document.body.style.width = originalStyle.width;

            // Восстанавливаем позицию мгновенно
            window.scrollTo({ top: scrollY, left: 0, behavior: 'instant' as ScrollBehavior });

            // Возвращаем плавный скролл обратно — со следующего тика, чтобы
            // он не успел сработать на нашем scrollTo
            requestAnimationFrame(() => {
                document.documentElement.style.scrollBehavior = originalHtmlScrollBehavior;
            });
        };
    }, [onClose]);

    if (!mounted) return null;

    const modalContent = (
        <div className={styles.overlay} onClick={onClose}>
            <div
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
            >
                <button
                    className={styles.closeButton}
                    onClick={onClose}
                    aria-label="Закрыть"
                >
                    ×
                </button>

                {item.image && (
                    <div className={styles.imageWrapper}>
                        <img src={item.image} alt={item.name} className={styles.image} />
                    </div>
                )}

                <div className={styles.content}>
                    <h2 className={styles.name}>{item.name}</h2>

                    {item.description && (
                        <p className={styles.description}>{item.description}</p>
                    )}

                    <div className={styles.footer}>
                        {item.weight && (
                            <span className={styles.weight}>{item.weight}</span>
                        )}
                        <span className={styles.price}>
              {item.price.toLocaleString('ru-RU')} ₸
            </span>
                    </div>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}