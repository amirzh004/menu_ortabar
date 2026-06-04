'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { decodeOrder, OrderLine } from '@/lib/order';
import styles from './order.module.css';

export default function OrderView() {
    const params = useSearchParams();
    const data = params.get('d');

    const [table, setTable] = useState('');
    const [showTableModal, setShowTableModal] = useState(false);
    const [tableInput, setTableInput] = useState('');

    const lines: OrderLine[] = useMemo(() => {
        if (!data) return [];
        try {
            return decodeOrder(data);
        } catch {
            return [];
        }
    }, [data]);

    const total = lines.reduce((s, l) => s + l.p * l.q, 0);

    const saveTable = () => {
        const v = tableInput.trim();
        if (v) {
            setTable(v);
            setShowTableModal(false);
        }
    };

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <h1 className={styles.heading}>Заказ</h1>
                <button
                    className={styles.tableBtn}
                    onClick={() => {
                        setTableInput(table);
                        setShowTableModal(true);
                    }}
                >
                    {table ? `${table} стол` : 'Стол'}
                </button>
            </header>

            {lines.length === 0 ? (
                <p className={styles.empty}>Заказ не найден или ссылка повреждена</p>
            ) : (
                <>
                    <ul className={styles.list}>
                        {lines.map((l, i) => (
                            <li key={i} className={styles.row}>
                                {l.img && (
                                    <img src={l.img} alt={l.n} className={styles.img} />
                                )}
                                <div className={styles.info}>
                                    <span className={styles.name}>{l.n}</span>
                                    <span className={styles.price}>
                                        {l.p.toLocaleString('ru-RU')} ₸
                                    </span>
                                </div>
                                <span className={styles.qty}>× {l.q}</span>
                            </li>
                        ))}
                    </ul>

                    <div className={styles.totalRow}>
                        <span>Итого</span>
                        <span className={styles.total}>
                            {total.toLocaleString('ru-RU')} ₸
                        </span>
                    </div>
                </>
            )}

            {showTableModal && (
                <div
                    className={styles.overlay}
                    onClick={() => setShowTableModal(false)}
                >
                    <div
                        className={styles.modal}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className={styles.modalTitle}>Номер стола</h2>
                        <input
                            className={styles.input}
                            type="number"
                            inputMode="numeric"
                            value={tableInput}
                            onChange={(e) => setTableInput(e.target.value)}
                            placeholder="Например, 8"
                            autoFocus
                            onKeyDown={(e) => e.key === 'Enter' && saveTable()}
                        />
                        <button className={styles.saveBtn} onClick={saveTable}>
                            Сохранить
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}