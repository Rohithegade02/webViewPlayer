
import { Skeleton } from '@/components/atoms/skeleton';
import React, { lazy, Suspense } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/*
@IndexLayout component
@description: This component is used to load the web view screen
*/
const LazyWebView = lazy(() => import('@/screens/WebViewScreen/WebViewScreenContainer'));

export default function IndexLayout() {
    return (
        <Suspense fallback={<FallBack />}>
            <LazyWebView />
        </Suspense>

    )

}

/*
@Fallback component
@description: This component is used to show the fallback screen when the web view screen is loading
*/
const FallBack = () => {
    return (
        <SafeAreaView className="flex bg-white px-5 flex-row items-center gap-4">
            <Skeleton className="h-[70vh]  mb-5" />
            <View className="flex flex-col gap-4">
                <Skeleton className="h-[10vh]" />
                <Skeleton className="h-[10vh]" />
            </View>
        </SafeAreaView>
    )
}