export interface AnimatedSliderProps {
    currentTime: number;
    duration: number;
    seekTo: (seconds: number) => void;
    isLoading?: boolean;
}