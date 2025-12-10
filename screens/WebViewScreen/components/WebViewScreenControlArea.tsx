import { Button, Icon, Text, } from '@/components/atoms';
import { Colors } from '@/constants';
import React, { memo } from 'react';
import { View } from 'react-native';
import { CONSTANTS_TEXT } from '../constants';
import { styles } from '../styles';
import { WebViewScreenControlAreaProps } from '../types';

/*
 * WebViewScreenControlArea Component
 * 
 * This component is responsible for rendering the control area of the WebViewScreen.
 * It contains the notification buttons and the main action button.
 * 
 * @param scheduleNotification1 - Function to schedule the first notification
 * @param scheduleNotification2 - Function to schedule the second notification
 * @param handleVideoPlayerScreen - Function to handle the video player screen
 * @param pressedButton - Function to handle the pressed button
 */
export const WebViewScreenControlArea = memo(({
    scheduleNotification1,
    scheduleNotification2,
    handleVideoPlayerScreen,
    pressedButton
}: WebViewScreenControlAreaProps) => {
    return (
        <View style={styles.controlsContainer}>
            {/* Notification Buttons Row */}
            <View style={styles.rowContainer}>
                <Button
                    style={({ pressed }) => pressedButton(pressed, styles.actionButton)}
                    onPress={scheduleNotification1}
                >
                    <Icon name="notifications" type="MaterialIcons" size={20} color={Colors.light.textSecondary} />
                    <Text style={styles.buttonLabel}>{CONSTANTS_TEXT.BUTTONS.NOTIFICATION_2S}</Text>
                </Button>

                <Button
                    style={({ pressed }) => pressedButton(pressed, styles.actionButton)}
                    onPress={scheduleNotification2}
                >
                    <Icon name="notifications-paused" type="MaterialIcons" size={20} color={Colors.light.textSecondary} />
                    <Text style={styles.buttonLabel}>{CONSTANTS_TEXT.BUTTONS.NOTIFICATION_5S}</Text>
                </Button>
            </View>

            {/* Main Action Button */}
            <Button
                style={({ pressed }) => pressedButton(pressed, styles.primaryButton)}
                onPress={handleVideoPlayerScreen}
            >
                <Icon name="video-camera" type='AntDesign' size={24} color={Colors.light.textInverse} />
                <Text style={styles.primaryButtonLabel}>{CONSTANTS_TEXT.BUTTONS.OPEN_VIDEO_PLAYER}</Text>
            </Button>
        </View>
    )
})

WebViewScreenControlArea.displayName = 'WebViewScreenControlArea';