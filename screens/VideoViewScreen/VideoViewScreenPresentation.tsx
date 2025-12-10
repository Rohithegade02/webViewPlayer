import { Button, Icon } from '@/components/atoms'
import { AnimatedSlider, VolumeSlider } from '@/components/molecules'
import { Colors } from '@/constants'
import { formatTime } from '@/lib/formaTime'
import { VideoView } from 'expo-video'
import React, { useRef, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './styles'
import { VideoViewScreenProps } from './types'

const VideoViewScreenPresentation = ({
    player,
    isPlaying,
    muted,
    volume,
    currentTime,
    duration,
    status,
    currentVideoInfo,
    currentIndex,
    totalVideos,
    toggleMute,
    seekTo,
    skipForward,
    skipBackward,
    setVolume,
    nextVideo,
    previousVideo,
    showControls,
    toggleControls
}: VideoViewScreenProps) => {
    const videoViewRef = useRef<VideoView>(null);
    const [isNativeFullscreen, setIsNativeFullscreen] = useState(false);

    const toggleFullscreen = () => {
        if (videoViewRef.current) {
            videoViewRef.current.enterFullscreen();
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header Content */}
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>{currentVideoInfo.title}</Text>
                <Text style={styles.headerSubtitle}>Video {currentIndex + 1} of {totalVideos}</Text>
            </View>

            {/* Video Player Container */}
            <View style={styles.videoContainer}>
                <Pressable style={styles.videoWrapper} onPress={toggleControls}>
                    <VideoView
                        ref={videoViewRef}
                        style={styles.video}
                        player={player}
                        allowsPictureInPicture
                        contentFit={'contain'}
                        onFullscreenEnter={() => setIsNativeFullscreen(true)}
                        onFullscreenExit={() => setIsNativeFullscreen(false)}
                        nativeControls={isNativeFullscreen}
                    />

                    {/* Controls Overlay (Only show if NOT in native fullscreen) */}
                    {showControls && !isNativeFullscreen && (
                        <View style={styles.overlay}>
                            {/* Fullscreen Button (Top Right) */}
                            <View style={{ position: 'absolute', top: 10, right: 10 }}>
                                <Button variant="ghost" size="icon" onPress={toggleFullscreen}>
                                    <Icon name="fullscreen" type="MaterialIcons" size={28} color={Colors.light.textInverse} />
                                </Button>
                            </View>

                            {/* Center Controls */}
                            <View style={styles.centerControls}>
                                {/* Previous Video */}
                                {totalVideos > 1 && (
                                    <Button variant="ghost" size="icon" onPress={previousVideo} disabled={currentIndex === 0}>
                                        <Icon name="skip-previous" type="MaterialIcons" size={32} color={Colors.light.textInverse} />
                                    </Button>
                                )}

                                {/* Skip Backward */}
                                <Button variant="ghost" size="icon" onPress={() => skipBackward(10)}>
                                    <Icon name="replay-10" type="MaterialIcons" size={28} color={Colors.light.textInverse} />
                                </Button>

                                {/* Play/Pause */}
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    style={styles.playButton}
                                    onPress={() => isPlaying ? player.pause() : player.play()}
                                >
                                    <Icon
                                        name={isPlaying ? "pause-circle-filled" : "play-circle-filled"}
                                        type="MaterialIcons"
                                        size={64}
                                        color={Colors.light.textInverse}
                                    />
                                </Button>

                                {/* Skip Forward */}
                                <Button variant="ghost" size="icon" onPress={() => skipForward(10)}>
                                    <Icon name="forward-10" type="MaterialIcons" size={28} color={Colors.light.textInverse} />
                                </Button>

                                {/* Next Video */}
                                {totalVideos > 1 && (
                                    <Button variant="ghost" size="icon" onPress={nextVideo} disabled={currentIndex === totalVideos - 1}>
                                        <Icon name="skip-next" type="MaterialIcons" size={32} color={Colors.light.textInverse} />
                                    </Button>
                                )}
                            </View>
                        </View>
                    )}
                </Pressable>
            </View>

            {/* Bottom Controls (Below Video) */}
            <View style={styles.bottomControlsContainer}>
                {/* Seek Slider (Full Width) */}
                <View style={styles.sliderContainer}>
                    <AnimatedSlider
                        currentTime={currentTime}
                        duration={duration}
                        seekTo={seekTo}
                        isLoading={status === 'loading'}
                    />
                    <View style={styles.timeRow}>
                        <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
                        <Text style={styles.timeText}> / {formatTime(duration)}</Text>
                    </View>
                </View>

                {/* Volume Controls Row */}
                <View style={styles.controlsRow}>
                    <View style={styles.volumeControl}>
                        <Button variant="ghost" size="icon" onPress={toggleMute}>
                            {/* <Icon
                                name={muted ? "volume-off" : volume > 0.5 ? "volume-up" : "volume-down"}
                                type="MaterialIcons"
                                size={24}
                                color={Colors.light.text}
                            /> */}
                        </Button>
                        <View style={{ flex: 1 }} onLayout={(e) => e.stopPropagation()}>
                            <VolumeSlider volume={volume} setVolume={setVolume} />
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};



export default VideoViewScreenPresentation