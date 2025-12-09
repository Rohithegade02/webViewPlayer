import { videoSources } from '@/constants'
import { useMultiVideoPlayer } from '@/hooks/useMultiVideoPlayer'
import React from 'react'
import VideoViewScreenPresentation from './VideoViewScreenPresentation'

const VideoViewScreenContainer = () => {
    // Multi-video player with all state and controls
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
        toggleMute,
        seekTo,
        skipForward,
        skipBackward,
        setVolume,
        nextVideo,
        previousVideo,
        switchToVideo,
    } = useMultiVideoPlayer(videoSources);

    return (
        <VideoViewScreenPresentation
            player={player}
            isPlaying={isPlaying}
            muted={muted}
            volume={volume}
            currentTime={currentTime}
            duration={duration}
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