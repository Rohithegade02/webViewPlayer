import { VideoPlayer } from "expo-video";

export interface VideoSourceConfig {
    id: string;
    title: string;
    uri: string;
}

export interface VideoViewScreenProps {
    player: VideoPlayer;
    isPlaying: boolean;
    muted: boolean;
    volume: number;
    currentTime: number;
    duration: number;
    status: 'idle' | 'loading' | 'readyToPlay' | 'error';
    currentVideoInfo: VideoSourceConfig;
    currentIndex: number;
    totalVideos: number;
    shouldPreload: boolean;
    toggleMute: () => void;
    seekTo: (seconds: number) => void;
    skipForward: (seconds?: number) => void;
    skipBackward: (seconds?: number) => void;
    setVolume: (value: number) => void;
    nextVideo: () => void;
    previousVideo: () => void;
    switchToVideo: (index: number) => void;
    showControls: boolean;
    toggleControls: () => void;

}

export interface VideoViewScreenHeaderProps {
    currentVideoInfo: VideoSourceConfig;
    currentIndex: number;
    totalVideos: number;
}

export interface VideoViewScreenCustomControllerProps {
    toggleFullscreen: () => void;
    totalVideos: number;
    currentIndex: number;
    previousVideo: () => void;
    skipBackward: (seconds?: number) => void;
    skipForward: (seconds?: number) => void;
    nextVideo: () => void;
    isPlaying: boolean;
    player: VideoPlayer;
}

export interface VideoViewBottomControllerProps {
    currentTime: number;
    duration: number;
    seekTo: (seconds: number) => void;
    status: 'idle' | 'loading' | 'readyToPlay' | 'error';
    volume: number;
    setVolume: (value: number) => void;
}