import { Button, Text } from '@/components/atoms'
import { VideoView } from 'expo-video'
import React from 'react'
import { Pressable, StyleSheet, useWindowDimensions, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { VideoViewScreenProps } from './types'

const VideoViewScreenPresentation = ({
    player,
    isPlaying,
    muted,
    volume,
    currentTime,
    duration,
    currentVideoInfo,
    currentIndex,
    totalVideos,
    shouldPreload,
    toggleMute,
    seekTo,
    skipForward,
    skipBackward,
    setVolume,
    nextVideo,
    previousVideo,
    switchToVideo
}: VideoViewScreenProps) => {
    const { width, height } = useWindowDimensions();

    // Format time in MM:SS format
    const formatTime = (seconds: number) => {
        if (isNaN(seconds)) return '00:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <SafeAreaView style={styles.contentContainer}>
            {/* Video Info Header */}
            <View style={styles.videoInfoContainer}>
                <Text style={styles.videoTitle}>{currentVideoInfo.title}</Text>
                <Text style={styles.videoCounter}>
                    Video {currentIndex + 1} of {totalVideos}
                </Text>
                {shouldPreload && (
                    <Text style={styles.preloadIndicator}>✓ Preloading enabled</Text>
                )}
            </View>

            {/* Video Switching Controls */}
            {totalVideos > 1 && (
                <View style={styles.switchControlsContainer}>
                    <Button onPress={previousVideo}>
                        <Text>⏮️ Previous</Text>
                    </Button>
                    <Button onPress={nextVideo}>
                        <Text>Next ⏭️</Text>
                    </Button>
                </View>
            )}

            {/* Video Player */}
            <VideoView
                style={styles.video}
                player={player}
                allowsPictureInPicture
                contentFit={'contain'}
                onFullscreenExit={() => player.pause()}
                fullscreenOptions={{
                    enable: true
                }}
            />

            {/* Time Display */}
            <View style={styles.timeContainer}>
                <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
                <Text style={styles.timeText}>/</Text>
                <Text style={styles.timeText}>{formatTime(duration)}</Text>
            </View>

            {/* Seek Slider */}
            <View style={styles.seekContainer}>
                <View style={styles.seekBar}>
                    <View
                        style={[
                            styles.seekProgress,
                            { width: `${(currentTime / duration) * 100}%` }
                        ]}
                    />
                    <Pressable
                        style={styles.seekHandle}
                        onPress={(e) => {
                            // Calculate the position relative to the seek bar
                            const seekBarWidth = width - 100; // Accounting for padding
                            const touchX = e.nativeEvent.locationX;
                            const newTime = (touchX / seekBarWidth) * duration;
                            seekTo(newTime);
                        }}
                    >
                        <View
                            style={[
                                styles.seekThumb,
                                { left: `${(currentTime / duration) * 100}%` }
                            ]}
                        />
                    </Pressable>
                </View>
            </View>

            {/* Playback Controls */}
            <View style={styles.controlsContainer}>
                {/* Skip Backward */}
                <Button onPress={() => skipBackward(10)}>
                    <Text>⏪ -10s</Text>
                </Button>

                {/* Play/Pause */}
                <Button
                    onPress={() => {
                        console.log('isPlaying', isPlaying);
                        if (isPlaying) {
                            player.pause();
                        } else {
                            player.play();
                        }
                    }}
                >
                    <Text>{isPlaying ? '⏸️ Pause' : '▶️ Play'}</Text>
                </Button>

                {/* Skip Forward */}
                <Button onPress={() => skipForward(10)}>
                    <Text>⏩ +10s</Text>
                </Button>
            </View>

            {/* Volume and Mute Controls */}
            <View style={styles.volumeContainer}>
                {/* Mute Toggle */}
                <Button onPress={toggleMute}>
                    <Text>{muted ? '🔇 Unmute' : '🔊 Mute'}</Text>
                </Button>

                {/* Volume Control */}
                <View style={styles.volumeSliderContainer}>
                    <Text style={styles.volumeLabel}>Volume: {Math.round(volume * 100)}%</Text>
                    <View style={styles.volumeButtons}>
                        <Button onPress={() => setVolume(volume - 0.1)}>
                            <Text>-</Text>
                        </Button>
                        <Button onPress={() => setVolume(volume + 0.1)}>
                            <Text>+</Text>
                        </Button>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    videoInfoContainer: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: '#1a1a1a',
        borderRadius: 12,
        marginBottom: 12,
        alignItems: 'center',
    },
    videoTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    videoCounter: {
        color: '#aaa',
        fontSize: 14,
        marginBottom: 4,
    },
    preloadIndicator: {
        color: '#4CAF50',
        fontSize: 12,
        fontWeight: '600',
    },
    switchControlsContainer: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 12,
    },
    video: {
        width: 350,
        height: 275,
        backgroundColor: '#000',
    },
    statusContainer: {
        marginTop: 12,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#333',
        borderRadius: 8,
    },
    statusText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 16,
    },
    timeText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    seekContainer: {
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 12,
    },
    seekBar: {
        height: 40,
        backgroundColor: '#333',
        borderRadius: 4,
        overflow: 'hidden',
        justifyContent: 'center',
    },
    seekProgress: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        backgroundColor: '#1E90FF',
    },
    seekHandle: {
        width: '100%',
        height: '100%',
    },
    seekThumb: {
        position: 'absolute',
        width: 16,
        height: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        top: 12,
        marginLeft: -8,
    },
    controlsContainer: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 20,
        alignItems: 'center',
    },
    volumeContainer: {
        marginTop: 20,
        alignItems: 'center',
        gap: 12,
    },
    volumeSliderContainer: {
        alignItems: 'center',
        gap: 8,
    },
    volumeLabel: {
        color: '#fff',
        fontSize: 14,
    },
    volumeButtons: {
        flexDirection: 'row',
        gap: 12,
    },
});

export default VideoViewScreenPresentation