import { useNotifications } from '@/hooks';
import { ROUTES } from '@/route';
import { useRouter } from 'expo-router';
import React from 'react';
import WebViewScreenPresentation from './WebViewScreenPresentation';

const WebViewScreenContainer = () => {
    const router = useRouter();
    const { scheduleNotification: scheduleNotification1 } = useNotifications({
        title: 'You\'ve got mail! 📬',
        body: 'Check out your new messages from the portfolio website!',
        data: { notificationType: 'mail', source: 'webview' },
        seconds: 2,
    });
    const { scheduleNotification: scheduleNotification2 } = useNotifications({
        title: 'Portfolio Update! 🚀',
        body: 'New projects and achievements have been added to the portfolio.',
        data: { notificationType: 'update', source: 'webview' },
        seconds: 5,
    });
    const { scheduleNotification: scheduleWebViewFinishedLoading } = useNotifications({
        title: 'WebView Finished Loading!',
        body: 'WebView has finished loading!',
        data: { notificationType: 'webviewFinishedLoading', source: 'webview' },
    });

    const { scheduleNotification: makeVideoPlayerScreenNotification } = useNotifications({
        title: 'Open Video Player Screen!',
        body: 'You have opened the video player screen!',
        data: { notificationType: 'videoPlayerScreen', source: 'webview' },
    });

    const handleVideoPlayerScreen = () => {
        setTimeout(() => {
            router.push(ROUTES.VIDEO_PLAYER);
        }, 2000);
        makeVideoPlayerScreenNotification();
    }

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