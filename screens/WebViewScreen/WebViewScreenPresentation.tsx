import { Button, Text } from '@/components/atoms';
import { webviewUrl } from '@/constants';
import React, { useRef } from 'react';
import { ActivityIndicator, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { styles } from './styles';
import { WebViewScreenProps } from './types';

const WebViewScreenPresentation = ({
    scheduleNotification1,
    scheduleNotification2,
    scheduleWebViewFinishedLoading,
    handleVideoPlayerScreen
}: WebViewScreenProps) => {
    const { height, width } = useWindowDimensions();
    const { top } = useSafeAreaInsets();
    const hasNotified = useRef(false);

    const handleLoadEnd = () => {
        if (!hasNotified.current) {
            hasNotified.current = true;
            scheduleWebViewFinishedLoading();
        }
    };

    return (
        <View style={{ flex: 1, paddingTop: top }}>
            <View style={{ height: height * 0.78 }}>
                <WebView
                    source={{ uri: webviewUrl }}
                    startInLoadingState={true}
                    renderLoading={() => (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size="large" color="lightskyblue" />
                        </View>
                    )}
                    onLoadEnd={handleLoadEnd}
                />
            </View>
            <View className='flex flex-row gap-4 mt-5 justify-between'>
                <Button style={styles.button} onPress={scheduleNotification1}>
                    <Text style={styles.buttonText}>Mail Notification (2s)</Text>
                </Button>
                <Button style={styles.button} onPress={scheduleNotification2}>
                    <Text style={styles.buttonText}>Update Notification (5s)</Text>
                </Button>
            </View>
            <Button style={styles.buttonContainer} onPress={handleVideoPlayerScreen}>
                <Text style={[styles.buttonText, { fontSize: 16, color: '#000' }]}>Open a Video Player Screen</Text>
            </Button>
        </View>
    );
};

export default WebViewScreenPresentation