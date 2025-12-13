
import { Skeleton } from '@/components/atoms/skeleton';
import React, { lazy, Suspense } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

/*
@IndexLayout component
@description: This component is used to load the video player screen
*/
const LazyVideoView = lazy(() => import('@/screens/VideoViewScreen/VideoViewScreenContainer'));

export default function IndexLayout() {
    return (
        <Suspense fallback={<FallBack />}>
            <LazyVideoView />
        </Suspense>
    )
}

/*
@Fallback component
@description: This component is used to show the fallback screen when the video player screen is loading
*/
const FallBack = () => {
    return (
        <SafeAreaView className="flex bg-white px-5 flex-row items-center gap-4">
            <Skeleton className="h-[80vh]  mb-5" />
        </SafeAreaView>
    )
}