import { Button, Icon } from '@/components/atoms';
import { webviewUrl } from '@/constants';
import React, { useRef } from 'react';
import { ActivityIndicator, Text, useWindowDimensions, View } from 'react-native';
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
    const { height } = useWindowDimensions();
    const { top } = useSafeAreaInsets();
    const hasNotified = useRef(false);

    const handleLoadEnd = () => {
        if (!hasNotified.current) {
            hasNotified.current = true;
            scheduleWebViewFinishedLoading();
        }
    };

    return (
        <View style={[styles.container, { paddingTop: top }]}>
            {/* WebView Card */}
            <View style={[styles.webviewContainer, { height: height * 0.70 }]}>
                <WebView
                    source={{ uri: webviewUrl }}
                    startInLoadingState={true}
                    renderLoading={() => (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#0f172a" />
                        </View>
                    )}
                    onLoadEnd={handleLoadEnd}
                />
            </View>

            {/* Controls Area */}
            <View style={styles.controlsContainer}>
                {/* Notification Buttons Row */}
                <View style={styles.rowContainer}>
                    <Button
                        style={({ pressed }) => [
                            styles.actionButton,
                            pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] }
                        ]}
                        onPress={scheduleNotification1}
                    >
                        <Icon name="notifications" type="MaterialIcons" size={20} color="#334155" />
                        <Text style={styles.buttonLabel}>Notification (2s)</Text>
                    </Button>

                    <Button
                        style={({ pressed }) => [
                            styles.actionButton,
                            pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] }
                        ]}
                        onPress={scheduleNotification2}
                    >
                        <Icon name="notifications-paused" type="MaterialIcons" size={20} color="#334155" />
                        <Text style={styles.buttonLabel}>Notification (5s)</Text>
                    </Button>
                </View>

                {/* Main Action Button */}
                <Button
                    style={({ pressed }) => [
                        styles.primaryButton,
                        pressed && { opacity: 0.95, transform: [{ scale: 0.99 }] }
                    ]}
                    onPress={handleVideoPlayerScreen}
                >
                    <Icon name="play-circle" size={24} color="#fff" />
                    <Text style={styles.primaryButtonLabel}>Open Video Player</Text>
                </Button>
            </View>
        </View>
    );
};

export default WebViewScreenPresentation;