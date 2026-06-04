import { Suspense } from 'react';
import OrderView from './OrderView';

export default function OrderPage() {
    return (
        <Suspense fallback={null}>
            <OrderView />
        </Suspense>
    );
}