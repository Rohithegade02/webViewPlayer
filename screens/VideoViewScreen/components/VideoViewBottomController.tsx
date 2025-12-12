import { Text } from "@/components/atoms"
import { AnimatedSlider, VolumeSlider } from "@/components/molecules"
import { formatTime } from "@/lib/formaTime"
import { memo } from "react"
import { View } from "react-native"
import { styles } from "../styles"
import { VideoViewBottomControllerProps } from "../types"

/**
 * VideoViewBottomController component
 * @param {VideoViewBottomControllerProps} props - The props for the component.
 * @returns {JSX.Element} The VideoViewBottomController component.
 */
export const VideoViewBottomController = memo(({
    currentTime,
    duration,
    seekTo,
    status,
    volume,
    setVolume,
}: VideoViewBottomControllerProps) => {
    return (
        <View style={styles.bottomControlsContainer}>
            <View style={styles.slidersRow}>
                <View style={styles.seekSliderWrapper}>
                    <AnimatedSlider
                        currentTime={currentTime}
                        duration={duration}
                        seekTo={seekTo}
                        isLoading={status === 'loading'}
                    />
                </View>
                <View style={styles.volumeSliderWrapper}>
                    <VolumeSlider volume={volume} setVolume={setVolume} />
                </View>
            </View>
            <View style={styles.timeRow}>
                <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
                <Text style={styles.timeText}> / {formatTime(duration)}</Text>
            </View>
        </View>
    )
})

VideoViewBottomController.displayName = 'VideoViewBottomController';
