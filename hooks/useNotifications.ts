import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';
import { Platform } from 'react-native';

interface NotificationProps {
    title: string;
    body: string;
    data: Record<string, unknown> | undefined;
    seconds?: number;
}

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

/**
 * Register for push notifications
 * @returns {boolean} True if push notifications are enabled, false otherwise.
 */
async function registerForPushNotificationsAsync() {
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!');
        return false;
    }

    return true;
}

export const useNotifications = (
    { title,
        body,
        data,
        seconds,
    }: NotificationProps
) => {
    useEffect(() => {
        registerForPushNotificationsAsync();
    }, []);

    const scheduleNotification = async () => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title,
                body,
                data,
            },
            trigger: seconds ? {
                type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
                seconds,
            } : null,
        });
    };

    return {
        scheduleNotification,
    };
}