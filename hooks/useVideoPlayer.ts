import { useEvent } from 'expo';
import { useVideoPlayer, VideoSource } from 'expo-video';
import { useEffect, useState } from 'react';

/**
 * Custom hook for video playback with caching enabled
 * @param videoUrl - The URL of the video to play
 * @returns Object containing the video player instance, state, and control functions
 */
export const useVideoHookPlayer = (videoUrl: string) => {
    // Detect if this is an HLS stream
    const isHLS = videoUrl.includes('.m3u8');

    // Create a VideoSource object
    // NOTE: useCaching is NOT supported for HLS streams on iOS due to platform limitations
    const videoSource: VideoSource = {
        uri: videoUrl,
        useCaching: !isHLS, // Only enable caching for non-HLS videos
        // Explicitly set contentType for HLS streams on iOS
        ...(isHLS && { contentType: 'hls' }),
    };

    const player = useVideoPlayer(videoSource, player => {
        player.loop = true;
        player.play();
    });

    // Track playing state with useState for better reactivity
    const [isPlaying, setIsPlaying] = useState(player.playing);
    const [muted, setMuted] = useState(player.muted);
    const [volume, setVolumeState] = useState(player.volume);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [status, setStatus] = useState(player.status);

    // Listen to status changes - critical for debugging
    useEvent(player, 'statusChange', { status: player.status });

    // Listen to playing state changes
    useEvent(player, 'playingChange', { isPlaying: player.playing });
    useEvent(player, 'mutedChange', { muted: player.muted });
    useEvent(player, 'volumeChange', { volume: player.volume });

    // Log status changes for debugging
    useEffect(() => {
        console.log('Player status changed:', player.status);
        setStatus(player.status);

        // If status is error, log the error
        if (player.status === 'error') {
            console.error('Video player error - check network connection and video URL');
        }

        // If status is readyToPlay, try to play
        if (player.status === 'readyToPlay' && !player.playing) {
            console.log('Video ready to play! Duration:', player.duration);
        }
    }, [player.status]);

    // Update state when player properties change
    useEffect(() => {
        const interval = setInterval(() => {
            setIsPlaying(player.playing);
            setMuted(player.muted);
            setVolumeState(player.volume);
            setCurrentTime(player.currentTime);
            setDuration(player.duration);
            setStatus(player.status);
        }, 100); // Update every 100ms

        return () => clearInterval(interval);
    }, [player]);

    /**
     * Toggle mute state
     */
    const toggleMute = () => {
        console.log('toggleMute', player.muted);
        player.muted = !player.muted;
    };

    /**
     * Seek to a specific time in seconds
     * @param seconds - Time position to seek to
     */
    const seekTo = (seconds: number) => {
        player.currentTime = seconds;
    };

    /**
     * Skip forward by a specified number of seconds
     * @param seconds - Number of seconds to skip forward (default: 10)
     */
    const skipForward = (seconds: number = 10) => {
        player.seekBy(seconds);
    };

    /**
     * Skip backward by a specified number of seconds
     * @param seconds - Number of seconds to skip backward (default: 10)
     */
    const skipBackward = (seconds: number = 10) => {
        player.seekBy(-seconds);
    };

    /**
     * Set volume level
     * @param value - Volume level between 0 and 1
     */
    const setVolume = (value: number) => {
        player.volume = Math.max(0, Math.min(1, value));
    };

    return {
        player,
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
    };
}
