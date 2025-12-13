import { ROUTES } from '@/route';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

/**
 * @description: This hook is used to observe the notification response received
 * @returns {void}
 */
export function useNotificationObserver() {
    const router = useRouter();

    useEffect(() => {
        let isMounted = true;

        const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
            if (!isMounted) return;
            const data = response.notification.request.content.data;

            if (data?.notificationType === 'videoPlayerScreen') {
                router.push(ROUTES.VIDEO_PLAYER);
            }
        });

        return () => {
            isMounted = false;
            responseListener?.remove();
        };
    }, [router]);
}
