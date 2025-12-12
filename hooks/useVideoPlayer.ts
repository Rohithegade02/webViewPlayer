import { useEvent } from 'expo';
import { useVideoPlayer, VideoSource } from 'expo-video';
import { useCallback, useEffect, useState } from 'react';

interface VideoSourceConfig {
    id: string;
    title: string;
    uri: string;
}

/**
 * Custom hook for managing multiple video players with preloading
 * @param videoSources - Array of video source configurations
 * @returns Object containing current player, video info, state, and control functions
 */
export const useVideoPlayerHook = (videoSources: VideoSourceConfig[]) => {
    // Only preload if there are multiple streams
    const shouldPreload = videoSources.length > 1;

    // Caching function to create VideoSource object
    const createVideoSource = (uri: string): VideoSource => {
        const isHLS = uri.includes('.m3u8');
        return {
            uri,
            useCaching: !isHLS,
            ...(isHLS && { contentType: 'hls' }),
        };
    };

    // Create players for all video sources (preloading)
    const players = videoSources.map((source, index) => {
        const videoSource = createVideoSource(source.uri);
        return useVideoPlayer(videoSource, player => {
            player.loop = true;
            // if (index === 0) {
            //     player.play();
            // }
        });
    });

    const [currentIndex, setCurrentIndex] = useState(0);
    const currentPlayer = players[currentIndex];
    const currentVideoInfo = videoSources[currentIndex];
    const [isPlaying, setIsPlaying] = useState(currentPlayer.playing);
    const [muted, setMuted] = useState(currentPlayer.muted);
    const [volume, setVolumeState] = useState(currentPlayer.volume);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [status, setStatus] = useState(currentPlayer.status);

    // Listen to player events
    useEvent(currentPlayer, 'statusChange', { status: currentPlayer.status });
    useEvent(currentPlayer, 'playingChange', { isPlaying: currentPlayer.playing });
    useEvent(currentPlayer, 'mutedChange', { muted: currentPlayer.muted });
    useEvent(currentPlayer, 'volumeChange', { volume: currentPlayer.volume });

    // Update state values  when player properties change
    useEffect(() => {
        const interval = setInterval(() => {
            setIsPlaying(currentPlayer.playing);
            setMuted(currentPlayer.muted);
            setVolumeState(currentPlayer.volume);
            setCurrentTime(currentPlayer.currentTime);
            setDuration(currentPlayer.duration);
            setStatus(currentPlayer.status);
        }, 100);

        //cleanup function of interbal
        return () => clearInterval(interval);
    }, [currentPlayer]);

    /**
     * Toggle mute state
     */
    const toggleMute = useCallback(() => {
        currentPlayer.muted = !currentPlayer.muted;
    }, [currentPlayer]);

    /**
     * Seek to a specific time in seconds
     */
    const seekTo = useCallback((seconds: number) => {
        currentPlayer.currentTime = seconds;
    }, [currentPlayer]);

    /**
     * Skip forward by a specified number of seconds
     */
    const skipForward = useCallback((seconds: number = 10) => {
        currentPlayer.seekBy(seconds);
    }, [currentPlayer]);

    /**
     * Skip backward by a specified number of seconds
     */
    const skipBackward = useCallback((seconds: number = 10) => {
        currentPlayer.seekBy(-seconds);
    }, [currentPlayer]);

    /**
     * Set volume level
     */
    const setVolume = useCallback((value: number) => {
        currentPlayer.volume = Math.max(0, Math.min(1, value));
    }, [currentPlayer]);

    /**
     * Switch to a specific video
     */
    const switchToVideo = useCallback((index: number) => {
        if (index < 0 || index >= videoSources.length) {
            console.warn('Invalid video index:', index);
            return;
        }

        players[currentIndex].pause();
        setCurrentIndex(index);
        players[index].play();
    }, [currentIndex, players, videoSources.length]);

    /**
     * Switch to next video
     */
    const nextVideo = useCallback(() => {
        const nextIndex = (currentIndex + 1) % videoSources.length;
        switchToVideo(nextIndex);
    }, [currentIndex, switchToVideo, videoSources.length]);

    /**
     * Switch to previous video
     */
    const previousVideo = useCallback(() => {
        const prevIndex = currentIndex === 0 ? videoSources.length - 1 : currentIndex - 1;
        switchToVideo(prevIndex);
    }, [currentIndex, switchToVideo, videoSources.length]);

    return {
        player: currentPlayer,
        currentVideoInfo,
        currentIndex,
        totalVideos: videoSources.length,
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
        switchToVideo,
        nextVideo,
        previousVideo,
    };
};
