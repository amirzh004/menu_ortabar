'use client';

import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
    ReactNode,
} from 'react';
import { MenuItem } from '@/types/menu';

export interface CartLine {
    item: MenuItem;
    qty: number;
}

interface CartCtx {
    lines: CartLine[];
    addItem: (item: MenuItem) => void;
    increment: (id: string) => void;
    decrement: (id: string) => void;
    removeItem: (id: string) => void;
    clear: () => void;
    getQty: (id: string) => number;
    totalCount: number;
    totalPrice: number;
}

const Ctx = createContext<CartCtx | null>(null);
const STORAGE_KEY = 'orta-cart';

/** Актуальная цена позиции — со скидкой, если она есть */
export const priceOf = (i: MenuItem) =>
    i.discountPrice != null && i.discountPrice < i.price ? i.discountPrice : i.price;

export function CartProvider({ children }: { children: ReactNode }) {
    const [lines, setLines] = useState<CartLine[]>([]);
    const [hydrated, setHydrated] = useState(false);

    // загрузка из localStorage
    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) setLines(JSON.parse(raw));
        } catch {}
        setHydrated(true);
    }, []);

    // сохранение
    useEffect(() => {
        if (!hydrated) return;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
        } catch {}
    }, [lines, hydrated]);

    const addItem = useCallback((item: MenuItem) => {
        setLines((prev) => {
            const ex = prev.find((l) => l.item.id === item.id);
            if (ex)
                return prev.map((l) =>
                    l.item.id === item.id ? { ...l, qty: l.qty + 1 } : l
                );
            return [...prev, { item, qty: 1 }];
        });
    }, []);

    const increment = useCallback((id: string) => {
        setLines((prev) =>
            prev.map((l) => (l.item.id === id ? { ...l, qty: l.qty + 1 } : l))
        );
    }, []);

    const decrement = useCallback((id: string) => {
        setLines((prev) =>
            prev.flatMap((l) =>
                l.item.id === id
                    ? l.qty <= 1
                        ? []
                        : [{ ...l, qty: l.qty - 1 }]
                    : [l]
            )
        );
    }, []);

    const removeItem = useCallback((id: string) => {
        setLines((prev) => prev.filter((l) => l.item.id !== id));
    }, []);

    const clear = useCallback(() => setLines([]), []);

    const getQty = useCallback(
        (id: string) => lines.find((l) => l.item.id === id)?.qty ?? 0,
        [lines]
    );

    const totalCount = lines.reduce((s, l) => s + l.qty, 0);
    const totalPrice = lines.reduce((s, l) => s + priceOf(l.item) * l.qty, 0);

    return (
        <Ctx.Provider
            value={{
                lines,
                addItem,
                increment,
                decrement,
                removeItem,
                clear,
                getQty,
                totalCount,
                totalPrice,
            }}
        >
            {children}
        </Ctx.Provider>
    );
}

export function useCart() {
    const c = useContext(Ctx);
    if (!c) throw new Error('useCart must be used within CartProvider');
    return c;
}