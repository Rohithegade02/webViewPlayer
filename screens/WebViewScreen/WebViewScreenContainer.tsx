import { useNotifications } from '@/hooks';
import { useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { CONSTANTS_TEXT } from './constants';
import WebViewScreenPresentation from './WebViewScreenPresentation';

/*
 * WebViewScreenContainer Component
 * Container component handling the business logic for the WebViewScreen.
 */

const WebViewScreenContainer = () => {
    const router = useRouter();

    // Notifications 2s delay
    const { scheduleNotification: scheduleNotification1 } = useNotifications({
        title: CONSTANTS_TEXT.NOTIFICATIONS.NOTIFICATION_2S.TITLE,
        body: CONSTANTS_TEXT.NOTIFICATIONS.NOTIFICATION_2S.BODY,
        data: { notificationType: 'notification', source: 'webview' },
        seconds: 2,
    });
    // Notifications 5s delay
    const { scheduleNotification: scheduleNotification2 } = useNotifications({
        title: CONSTANTS_TEXT.NOTIFICATIONS.NOTIFICATION_5S.TITLE,
        body: CONSTANTS_TEXT.NOTIFICATIONS.NOTIFICATION_5S.BODY,
        data: { notificationType: 'notification', source: 'webview' },
        seconds: 5,
    });
    // Webview finished loading notification
    const { scheduleNotification: scheduleWebViewFinishedLoading } = useNotifications({
        title: CONSTANTS_TEXT.NOTIFICATIONS.WEBVIEW_LOADED.TITLE,
        body: CONSTANTS_TEXT.NOTIFICATIONS.WEBVIEW_LOADED.BODY,
        data: { notificationType: 'webviewFinishedLoading', source: 'webview' },
    });
    // Video player screen notification
    const { scheduleNotification: makeVideoPlayerScreenNotification } = useNotifications({
        title: CONSTANTS_TEXT.NOTIFICATIONS.VIDEO_PLAYER_OPEN.TITLE,
        body: CONSTANTS_TEXT.NOTIFICATIONS.VIDEO_PLAYER_OPEN.BODY,
        data: { notificationType: 'videoPlayerScreen', source: 'webview' },
    });

    // Handle video player screen
    const handleVideoPlayerScreen = useCallback(() => {
        makeVideoPlayerScreenNotification();
    }, [makeVideoPlayerScreenNotification]);

    return (
        <WebViewScreenPresentation
            scheduleNotification2={scheduleNotification2}
            scheduleNotification1={scheduleNotification1}
            scheduleWebViewFinishedLoading={scheduleWebViewFinishedLoading}
            handleVideoPlayerScreen={handleVideoPlayerScreen}
        />
    )
}

export default WebViewScreenContainer