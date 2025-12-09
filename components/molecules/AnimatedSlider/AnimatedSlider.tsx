import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

const SLIDER_WIDTH = Dimensions.get('window').width * 0.9;
const THUMB_SIZE = 16;

interface AnimatedSliderProps {
    currentTime: number;
    duration: number;
    seekTo: (seconds: number) => void;
}

export const AnimatedSlider = ({ currentTime, duration, seekTo }: AnimatedSliderProps) => {
    const offset = useSharedValue(0);
    const isDragging = useSharedValue(false);
    const MAX_VALUE = SLIDER_WIDTH - THUMB_SIZE;

    // Convert props to shared values
    const currentTimeShared = useSharedValue(currentTime);
    const durationShared = useSharedValue(duration);

    // Update shared values when props change
    useEffect(() => {
        currentTimeShared.value = currentTime;
        durationShared.value = duration;
    }, [currentTime, duration]);

    // Update slider position on UI thread (no re-renders!)
    useDerivedValue(() => {
        if (!isDragging.value && durationShared.value > 0) {
            const progress = currentTimeShared.value / durationShared.value;
            offset.value = withSpring(progress * MAX_VALUE, {
                damping: 20,
                stiffness: 90,
            });
        }
    }, []);

    const pan = Gesture.Pan()
        .onStart(() => {
            isDragging.value = true;
        })
        .onChange((event) => {
            const newOffset = offset.value + event.changeX;
            offset.value = Math.max(0, Math.min(MAX_VALUE, newOffset));
        })
        .onEnd(() => {
            isDragging.value = false;
            // Calculate the new time based on slider position
            const progress = offset.value / MAX_VALUE;
            const newTime = progress * durationShared.value;
            scheduleOnRN(seekTo, newTime);
        });

    const tap = Gesture.Tap().onStart((event) => {
        const tapX = event.x - THUMB_SIZE / 2;
        offset.value = withSpring(Math.max(0, Math.min(MAX_VALUE, tapX)), {
            damping: 20,
            stiffness: 90,
        });

        // Calculate the new time based on tap position
        const progress = tapX / MAX_VALUE;
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

    return (
        <View style={styles.container}>
            <View style={styles.sliderTrack}>
                <Animated.View style={[styles.sliderProgress, progressStyle]} />
                <GestureDetector gesture={composed}>
                    <Animated.View style={[styles.sliderThumb, thumbStyle]} />
                </GestureDetector>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 12,
    },
    sliderTrack: {
        width: SLIDER_WIDTH,
        height: 40,
        backgroundColor: '#333',
        borderRadius: 4,
        justifyContent: 'center',
        overflow: 'hidden',
    },
    sliderProgress: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        backgroundColor: '#1E90FF',
    },
    sliderThumb: {
        width: THUMB_SIZE,
        height: THUMB_SIZE,
        backgroundColor: '#fff',
        borderRadius: THUMB_SIZE / 2,
        position: 'absolute',
        top: 12,
    },
});
