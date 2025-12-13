import { videoSources } from '@/constants'
import { useVideoPlayerHook } from '@/hooks/useVideoPlayer'
import React, { useCallback, useState } from 'react'
import VideoViewScreenPresentation from './VideoViewScreenPresentation'

/*
 * VideoViewScreenContainer Component
 *
 * This component is responsible for handling the business logic for the VideoViewScreen.
 */
const VideoViewScreenContainer = () => {
    const [showControls, setShowControls] = useState<boolean>(true);

    const toggleControls = useCallback(() => {
        setShowControls(!showControls);
    }, [showControls]);
    const {
        player,
        currentVideoInfo,
        currentIndex,
        totalVideos,
        shouldPreload,
        isPlaying,
        muted,
        volume,
        currentTime,
        duration,
        status,
        toggleMute,
        seekTo,
        skipForward,
        skipBackward,
        setVolume,
        nextVideo,
        previousVideo,
        switchToVideo,
    } = useVideoPlayerHook(videoSources);

    return (
        <VideoViewScreenPresentation
            player={player}
            isPlaying={isPlaying}
            muted={muted}
            showControls={showControls}
            toggleControls={toggleControls}
            volume={volume}
            currentTime={currentTime}
            duration={duration}
            status={status}
            currentVideoInfo={currentVideoInfo}
            currentIndex={currentIndex}
            totalVideos={totalVideos}
            shouldPreload={shouldPreload}
            toggleMute={toggleMute}
            seekTo={seekTo}
            skipForward={skipForward}
            skipBackward={skipBackward}
            setVolume={setVolume}
            nextVideo={nextVideo}
            previousVideo={previousVideo}
            switchToVideo={switchToVideo}
        />
    );
}

export default VideoViewScreenContainer