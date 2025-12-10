import React, { memo, useEffect } from 'react';
import { Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { SLIDER_WIDTH_EXPORT, styles, THUMB_SIZE_EXPORT } from './styles';
import { VolumeSliderProps } from './types';

const SLIDER_WIDTH = SLIDER_WIDTH_EXPORT;
const THUMB_SIZE = THUMB_SIZE_EXPORT;

export const VolumeSlider = memo(({ volume, setVolume }: VolumeSliderProps) => {
    const offset = useSharedValue<number>(0);
    const isDragging = useSharedValue(false);
    const MAX_VALUE = SLIDER_WIDTH - THUMB_SIZE;
    const volumeShared = useSharedValue(volume);

    // Update shared value when prop changes
    useEffect(() => {
        volumeShared.value = volume;
    }, [volume]);

    // Update slider position on UI thread (only when NOT dragging)
    useDerivedValue(() => {
        'worklet';
        if (!isDragging.value) {
            const targetOffset = volumeShared.value * MAX_VALUE;
            offset.value = withTiming(targetOffset, {
                duration: 100,
            });
        }
    });

    const pan = Gesture.Pan()
        .onStart(() => {
            'worklet';
            isDragging.value = true;
        })
        .onChange((event) => {
            'worklet';
            const newOffset = offset.value + event.changeX;
            offset.value = Math.max(0, Math.min(MAX_VALUE, newOffset));
            // Update volume in real-time as you drag
            volumeShared.value = offset.value / MAX_VALUE;
        })
        .onEnd(() => {
            'worklet';
            const newVolume = offset.value / MAX_VALUE;
            volumeShared.value = newVolume;

            // Set volume
            scheduleOnRN(setVolume, newVolume);

            setTimeout(() => {
                'worklet';
                isDragging.value = false;
            }, 200);
        });

    const tap = Gesture.Tap().onStart((event) => {
        'worklet';
        const tapX = event.x - THUMB_SIZE / 2;
        const targetOffset = Math.max(0, Math.min(MAX_VALUE, tapX));

        offset.value = withSpring(targetOffset, {
            damping: 20,
            stiffness: 90,
        });

        const newVolume = targetOffset / MAX_VALUE;
        volumeShared.value = newVolume;

        scheduleOnRN(setVolume, newVolume);
    });

    const composed = Gesture.Simultaneous(pan, tap);

    const thumbStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: offset.value }],
        };
    });

    const progressStyle = useAnimatedStyle(() => {
        return {
            width: offset.value + THUMB_SIZE / 2,
        };
    });

    return (
        <View style={styles.container}>
            <Text style={styles.label}> Volume: {Math.round(volume * 100)}%</Text>
            <View style={styles.sliderTrack}>
                <Animated.View style={[styles.sliderProgress, progressStyle]} />
                <GestureDetector gesture={composed}>
                    <Animated.View style={[styles.sliderThumb, thumbStyle]} />
                </GestureDetector>
            </View>
        </View>
    );
});

VolumeSlider.displayName = 'VolumeSlider';
