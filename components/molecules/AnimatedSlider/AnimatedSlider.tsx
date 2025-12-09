import React, { memo, useEffect } from 'react';
import { ActivityIndicator, Dimensions, TextInput, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedProps,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { styles } from './styles';
import { AnimatedSliderProps } from './types';

const SLIDER_WIDTH = Dimensions.get('window').width * 0.9;
const THUMB_SIZE = 16;
const AnimatedText = Animated.createAnimatedComponent(TextInput);


export const AnimatedSlider = memo(({ currentTime, duration, seekTo, isLoading = false }: AnimatedSliderProps) => {
    const offset = useSharedValue<number>(0);
    const isDragging = useSharedValue(false);
    const MAX_VALUE = SLIDER_WIDTH - THUMB_SIZE;
    const currentTimeShared = useSharedValue(currentTime);
    const durationShared = useSharedValue(duration);

    // Update shared values when props change
    useEffect(() => {
        currentTimeShared.value = currentTime;
        durationShared.value = duration;
    }, [currentTime, duration]);

    useDerivedValue(() => {
        'worklet';
        if (!isDragging.value && durationShared.value > 0) {
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
            const newOffset = offset.value + event.changeX;
            console.log('on chnages');
            offset.value = Math.max(0, Math.min(MAX_VALUE, newOffset));
        })
        .onEnd(() => {
            'worklet';
            const progress = offset.value / MAX_VALUE;
            const newTime = progress * durationShared.value;
            scheduleOnRN(seekTo, newTime);

            // Wait a bit before allowing automatic updates again
            // This prevents the slider from jumping back immediately
            // setTimeout(() => {
            //     isDragging.value = false;
            // }, 100);
        });

    const tap = Gesture.Tap().onStart((event) => {
        'worklet';
        const tapX = event.x - THUMB_SIZE / 2;
        const targetOffset = Math.max(0, Math.min(MAX_VALUE, tapX));

        offset.value = withSpring(targetOffset, {
            damping: 20,
            stiffness: 90,
        });

        // Calculate the new time based on tap position
        const progress = targetOffset / MAX_VALUE;
        const newTime = progress * durationShared.value;
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

    const animatedProps = useAnimatedProps(() => {
        return {
            text: `Box width: ${Math.round(offset.value)}`,
            defaultValue: `Box width: ${offset.value}`,
        };
    });


    return (
        <View style={styles.container}>
            <View style={styles.sliderTrack}>
                <AnimatedText animatedProps={animatedProps} />
                <Animated.View style={[styles.sliderProgress, progressStyle]} />
                <GestureDetector gesture={composed}>
                    <Animated.View style={[styles.sliderThumb, thumbStyle]} />
                </GestureDetector>
                {isLoading && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="small" color="#fff" />
                    </View>
                )}
            </View>
        </View>
    );
});
