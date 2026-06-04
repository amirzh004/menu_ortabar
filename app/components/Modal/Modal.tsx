'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { MenuItem } from '@/types/menu';
import styles from './Modal.module.css';
import QuantityStepper from "@/app/components/QuantityStepper/QuantityStepper";

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

    const hasDiscount =
        item.discountPrice != null && item.discountPrice < item.price;

    const hasNutrition =
        item.calories != null ||
        item.proteins != null ||
        item.fats != null ||
        item.carbs != null;

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
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none"
                         stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                         aria-hidden="true">
                        <line x1="6" y1="6" x2="18" y2="18" />
                        <line x1="18" y1="6" x2="6" y2="18" />
                    </svg>
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

                    {hasNutrition && (
                        <div className={styles.nutrition}>
                            {item.calories != null && (
                                <div className={styles.nutritionCard}>
                                    <span className={styles.nutritionValue}>{item.calories}</span>
                                    <span className={styles.nutritionLabel}>ккал</span>
                                </div>
                            )}
                            {item.proteins != null && (
                                <div className={styles.nutritionCard}>
                                    <span className={styles.nutritionValue}>{item.proteins} г</span>
                                    <span className={styles.nutritionLabel}>Белки</span>
                                </div>
                            )}
                            {item.fats != null && (
                                <div className={styles.nutritionCard}>
                                    <span className={styles.nutritionValue}>{item.fats} г</span>
                                    <span className={styles.nutritionLabel}>Жиры</span>
                                </div>
                            )}
                            {item.carbs != null && (
                                <div className={styles.nutritionCard}>
                                    <span className={styles.nutritionValue}>{item.carbs} г</span>
                                    <span className={styles.nutritionLabel}>Углеводы</span>
                                </div>
                            )}
                        </div>
                    )}

                    <div className={styles.footer}>
                        {item.weight && (
                            <span className={styles.weight}>{item.weight}</span>
                        )}

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
                            <span className={styles.price}>
                                {item.price.toLocaleString('ru-RU')} ₸
                            </span>
                        )}
                    </div>

                    <div className={styles.cartRow}>
                        <QuantityStepper item={item} size="block" />
                    </div>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}