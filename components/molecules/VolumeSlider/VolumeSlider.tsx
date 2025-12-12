import { Icon } from '@/components/atoms';
import { Colors } from '@/constants';
import React, { memo, useEffect } from 'react';
import { View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { styles, THUMB_SIZE_EXPORT } from './styles';
import { VolumeSliderProps } from './types';


export const VolumeSlider = memo(({ volume, setVolume }: VolumeSliderProps) => {
    const SLIDER_WIDTH = 80;
    const THUMB_SIZE = THUMB_SIZE_EXPORT;
    const MAX_VALUE = SLIDER_WIDTH; // Thumb moves from 0 to MAX

    const offset = useSharedValue<number>(volume * MAX_VALUE);
    const isDragging = useSharedValue(false);
    const volumeShared = useSharedValue(volume);

    useEffect(() => {
        if (!isDragging.value) {
            offset.value = withTiming(volume * MAX_VALUE, { duration: 100 });
            volumeShared.value = volume;
        }
    }, [volume, MAX_VALUE]);

    const pan = Gesture.Pan()
        .onStart(() => {
            isDragging.value = true;
        })
        .onChange((event) => {
            const newOffset = offset.value + event.changeX;
            offset.value = Math.max(0, Math.min(MAX_VALUE, newOffset));
            const newVolume = offset.value / MAX_VALUE;
            volumeShared.value = newVolume;
        })
        .onEnd(() => {
            const newVolume = offset.value / MAX_VALUE;
            volumeShared.value = newVolume;
            scheduleOnRN(setVolume, newVolume);

            setTimeout(() => {
                isDragging.value = false;
            }, 200);
        });

    const tap = Gesture.Tap().onStart((event) => {
        // tap on track
        const tapX = event.x;
        const targetOffset = Math.max(0, Math.min(MAX_VALUE, tapX));
        offset.value = withSpring(targetOffset);
        const newVolume = targetOffset / MAX_VALUE;
        volumeShared.value = newVolume;
        scheduleOnRN(setVolume, newVolume);
    });

    const thumbStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: offset.value - (THUMB_SIZE / 2) }],
        };
    });

    const progressStyle = useAnimatedStyle(() => {
        return {
            width: offset.value,
        };
    });

    return (
        <View style={styles.container}>
            {/* Icon (Left) */}
            <Icon
                name={volume === 0 ? "volume-off" : volume < 0.5 ? "volume-down" : "volume-up"}
                type="MaterialIcons"
                size={20}
                color={Colors.light.textInverse}
                style={{ marginRight: 2 }}
            />

            {/* Slider Track */}
            <GestureDetector gesture={Gesture.Simultaneous(pan, tap)}>
                <View style={[styles.sliderTrack, { width: SLIDER_WIDTH }]}>
                    <Animated.View style={[styles.sliderProgress, progressStyle]} />
                    <Animated.View style={[styles.sliderThumb, thumbStyle]} />
                </View>
            </GestureDetector>
        </View>
    );
});

VolumeSlider.displayName = 'VolumeSlider';

