import { Button, Text } from '@/components/atoms';
import React, { useRef } from 'react';
import { ActivityIndicator, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { WebViewScreenProps } from './types';

const WebViewScreenPresentation = ({
    scheduleNotification1,
    scheduleNotification2,
    scheduleWebViewFinishedLoading,
    handleVideoPlayerScreen
}: WebViewScreenProps) => {
    const { height } = useWindowDimensions();
    const hasNotified = useRef(false);

    const handleLoadEnd = () => {
        // Only send notification once
        if (!hasNotified.current) {
            hasNotified.current = true;
            scheduleWebViewFinishedLoading();
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ height: height * 0.8 }}>
                <WebView
                    source={{ uri: 'https://next-potfolio-zeta.vercel.app/' }}
                    startInLoadingState={true}
                    renderLoading={() => (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size="large" color="lightskyblue" />
                        </View>
                    )}
                    style={{ height: 400 }}
                    onLoadEnd={handleLoadEnd}
                />
            </View>
            <View className='flex flex-row justify-between px-6 bg-yellow-200'>
                <Button onPress={scheduleNotification1}>
                    <Text>Mail Notification (2s)</Text>
                </Button>
                <Button onPress={scheduleNotification2}>
                    <Text>Update Notification (5s)</Text>
                </Button>
            </View>
            <Button onPress={handleVideoPlayerScreen}>
                <Text>Open a Video Player Screen</Text>
            </Button>
        </SafeAreaView>
    );
};

export default WebViewScreenPresentation