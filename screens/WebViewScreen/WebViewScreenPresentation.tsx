import { WebViewCard } from '@/components/molecules';
import { webviewUrl } from '@/constants';
import React, { useCallback, useRef } from 'react';
import { StyleProp, useWindowDimensions, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebViewScreenControlArea } from './components/WebViewScreenControlArea';
import { styles } from './styles';
import { WebViewScreenProps } from './types';

/*
 * WebViewScreenPresentation Component
 *
 * This component is responsible for rendering the WebViewScreenPresentation.
 *
 * @param scheduleNotification1 - The function to schedule the first notification
 * @param scheduleNotification2 - The function to schedule the second notification
 * @param scheduleWebViewFinishedLoading - The function to schedule the webview finished loading notification
 * @param handleVideoPlayerScreen - The function to handle the video player screen
 */
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
        // make sure the notification trigger only once after the webview finished loading
        if (!hasNotified.current) {
            hasNotified.current = true;
            scheduleWebViewFinishedLoading?.();
        }
    };

    // handle button press
    const pressedButton = useCallback((pressed: boolean, style: StyleProp<ViewStyle>) => {
        return [
            style,
            pressed && { opacity: 0.95, transform: [{ scale: 0.99 }] }
        ]
    }, []);


    return (
        <View style={[styles.container, { paddingTop: top }]}>
            {/* WebView Card */}
            <WebViewCard
                height={height * 0.70}
                webviewUrl={webviewUrl}
                onLoadEnd={handleLoadEnd}
                containerStyle={styles.webviewContainer}
            />

            {/* Controls Area */}
            <WebViewScreenControlArea
                scheduleNotification1={scheduleNotification1}
                scheduleNotification2={scheduleNotification2}
                handleVideoPlayerScreen={handleVideoPlayerScreen}
                pressedButton={pressedButton}
            />

        </View>
    );
};

export default WebViewScreenPresentation;