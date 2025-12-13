import * as Linking from 'expo-linking';
import { useEffect } from 'react';

/**
 * Hook to handle deep linking manually if needed.
 * Expo Router handles most deep linking automatically based on file structure.
 * This hook can be used to debug incoming links or handle complex logic.
 */
export const useDeepLinking = () => {
    useEffect(() => {
        const handleUrl = (event: Linking.EventType) => {
            const parsed = Linking.parse(event.url);
        };

        // Handle the initial URL when the app starts
        Linking.getInitialURL().then((url) => {
            if (url) {
                const parsed = Linking.parse(url);
            }
        });

        // Add event listener for incoming URLs
        const subscription = Linking.addEventListener('url', handleUrl);

        return () => {
            subscription.remove();
        };
    }, []);
};