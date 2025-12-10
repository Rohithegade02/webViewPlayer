import { StyleProp, ViewStyle } from 'react-native';

/*
 * WebViewScreenProps Interface
 *
 * This interface defines the props for the WebViewScreen component.
 *
 * @property scheduleNotification1 - The function to schedule the first notification
 * @property scheduleNotification2 - The function to schedule the second notification
 * @property scheduleWebViewFinishedLoading - The function to schedule the webview finished loading notification
 * @property handleVideoPlayerScreen - The function to handle the video player screen
 * @property pressedButton - The function to handle the pressed button
 */
export interface WebViewScreenProps {
    scheduleNotification1: () => void;
    scheduleNotification2: () => void;
    scheduleWebViewFinishedLoading?: () => void;
    handleVideoPlayerScreen: () => void;
}

export interface WebViewScreenControlAreaProps extends WebViewScreenProps {
    pressedButton: (pressed: boolean, style: StyleProp<ViewStyle>) => StyleProp<ViewStyle>;
}
