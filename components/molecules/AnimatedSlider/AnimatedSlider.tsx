import { Colors } from '@/constants';
import React, { memo, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { styles } from './styles';
import { AnimatedSliderProps } from './types';

const THUMB_SIZE = 16;
// const AnimatedText = Animated.createAnimatedComponent(TextInput);
/**
 * AnimatedSlider component
 * @param {AnimatedSliderProps} props - The props for the animated slider component.
 * @returns {React.ReactNode} The animated slider component.
 */
export const AnimatedSlider = memo(({ currentTime, duration, seekTo, isLoading = false }: AnimatedSliderProps) => {
    const [sliderWidth, setSliderWidth] = React.useState(0);
    const offset = useSharedValue<number>(0);
    const isDragging = useSharedValue(false);

    const MAX_VALUE = sliderWidth > 0 ? sliderWidth - THUMB_SIZE : 0;

    const currentTimeShared = useSharedValue(currentTime);
    const durationShared = useSharedValue(duration);
    useEffect(() => {
        currentTimeShared.value = currentTime;
        durationShared.value = duration;
    }, [currentTime, duration]);

    useDerivedValue(() => {
        'worklet';
        if (!isDragging.value && durationShared.value > 0 && MAX_VALUE > 0) {
            const progress = currentTimeShared.value / durationShared.value;
            const targetOffset = progress * MAX_VALUE;

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
            if (MAX_VALUE === 0) return;
            const newOffset = offset.value + event.changeX;
            offset.value = Math.max(0, Math.min(MAX_VALUE, newOffset));
            currentTimeShared.value = newOffset / MAX_VALUE * durationShared.value;
        })
        .onEnd(() => {
            'worklet';
            if (MAX_VALUE === 0) return;
            const progress = offset.value / MAX_VALUE;
            const newTime = progress * durationShared.value;

            currentTimeShared.value = newTime;

            scheduleOnRN(seekTo, newTime);
            setTimeout(() => {
                'worklet';
                isDragging.value = false;
            }, 200);
        });

    const tap = Gesture.Tap().onStart((event) => {
        'worklet';
        if (MAX_VALUE === 0) return;
        const tapX = event.x - THUMB_SIZE / 2;
        const targetOffset = Math.max(0, Math.min(MAX_VALUE, tapX));

        offset.value = withSpring(targetOffset, {
            damping: 20,
            stiffness: 90,
        });

        const progress = targetOffset / MAX_VALUE;
        const newTime = progress * durationShared.value;

        currentTimeShared.value = newTime;

        scheduleOnRN(seekTo, newTime);
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
        <View
            style={styles.container}
            onLayout={(e) => setSliderWidth(e.nativeEvent.layout.width)}
        >
            <View style={[styles.sliderTrack, { width: '100%' }]}>
                <Animated.View style={[styles.sliderProgress, progressStyle]} />
                <GestureDetector gesture={composed}>
                    <Animated.View style={[styles.sliderThumb, thumbStyle]} />
                </GestureDetector>
                {isLoading && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="small" color={Colors.light.sliderThumb} />
                    </View>
                )}
            </View>
        </View>
    );
});
