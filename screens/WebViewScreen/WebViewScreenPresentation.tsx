import { Button, Text } from '@/components/atoms';
import { useNotifications } from '@/hooks/useNotifications';
import React from 'react';
import { ActivityIndicator, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

const WebViewScreenPresentation = () => {
    const { height } = useWindowDimensions();
    const { scheduleNotification1, scheduleNotification2 } = useNotifications();

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
        </SafeAreaView>
    );
};

export default WebViewScreenPresentation