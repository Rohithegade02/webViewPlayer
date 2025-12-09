
import { Text } from '@/components/atoms';
import React, { lazy, Suspense } from 'react';

const LazyVideoView = lazy(() => import('@/screens/VideoViewScreen/VideoViewScreenContainer'));

export default function IndexLayout() {
    return (
        <Suspense fallback={<Text>loading Video View...</Text>}>
            <LazyVideoView />
        </Suspense>
    )
}