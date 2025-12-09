
import { Text } from '@/components/atoms';
import React, { lazy, Suspense } from 'react';

const LazyWebView = lazy(() => import('@/screens/WebViewScreen/WebViewScreenContainer'));

export default function IndexLayout() {
    return (
        <Suspense fallback={<Text>loading...</Text>}>
            <LazyWebView />
        </Suspense>
    )
}