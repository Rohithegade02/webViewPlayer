import { Colors } from '@/constants'
import { VideoView } from 'expo-video'
import React, { useCallback, useRef, useState } from 'react'
import { ActivityIndicator, Pressable, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { VideoViewBottomController } from './components/VideoViewBottomController'
import { VideoViewScreenCustomController } from './components/VideoViewScreenCustomController'
import { VideoViewScreenHeader } from './components/VideoViewScreenHeader'
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
    const [isNativeFullscreen, setIsNativeFullscreen] = useState<boolean>(false);

    const toggleFullscreen = useCallback(() => {
        if (videoViewRef.current) {
            videoViewRef.current.enterFullscreen();
        }
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <VideoViewScreenHeader
                currentVideoInfo={currentVideoInfo}
                currentIndex={currentIndex}
                totalVideos={totalVideos}
            />
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

                    {status === 'loading' && (
                        <View style={[styles.overlay, { backgroundColor: 'transparent' }]}>
                            <ActivityIndicator size="large" color={Colors.light.accent} />
                        </View>
                    )}
                    {showControls && !isNativeFullscreen && (
                        <VideoViewScreenCustomController
                            toggleFullscreen={toggleFullscreen}
                            totalVideos={totalVideos}
                            currentIndex={currentIndex}
                            previousVideo={previousVideo}
                            skipBackward={skipBackward}
                            skipForward={skipForward}
                            nextVideo={nextVideo}
                            isPlaying={isPlaying}
                            player={player}
                        />
                    )}
                </Pressable>
            </View>
            <VideoViewBottomController
                currentTime={currentTime}
                duration={duration}
                status={status}
                volume={volume}
                setVolume={setVolume}
                seekTo={seekTo}
            />

        </SafeAreaView>
    );
};



export default VideoViewScreenPresentation