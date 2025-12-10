/*
 * CONSTANTS_TEXT Object
 *
 * This object contains the constants for the text used in the app.
 *
 * @property NOTIFICATIONS - Object containing the constants for the notifications
 * @property BUTTONS - Object containing the constants for the buttons
 */
export const CONSTANTS_TEXT = {
    NOTIFICATIONS: {
        NOTIFICATION_2S: {
            TITLE: "You've got new notification! 📬",
            BODY: 'Check out your new notification of delay of 2 seconds!',
        },
        NOTIFICATION_5S: {
            TITLE: "You've got new notification! 🚀",
            BODY: 'Check out your new notification of delay of 5 seconds!',
        },
        WEBVIEW_LOADED: {
            TITLE: 'WebView Finished Loading!',
            BODY: 'WebView has finished loading!',
        },
        VIDEO_PLAYER_OPEN: {
            TITLE: 'Open Video Player Screen!',
            BODY: 'You have opened the video player screen!',
        }
    },
    BUTTONS: {
        NOTIFICATION_2S: 'Notification (2s)',
        NOTIFICATION_5S: 'Notification (5s)',
        OPEN_VIDEO_PLAYER: 'Open Video Player',
    }
} as const;