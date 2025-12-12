import { Button, Icon } from "@/components/atoms";
import { Colors } from "@/constants";
import { memo } from "react";
import { View } from "react-native";
import { styles } from "../styles";
import { VideoViewScreenCustomControllerProps } from "../types";

/**
 * VideoViewScreenCustomController component
 * @param {VideoViewScreenCustomControllerProps} props - The props for the component.
 * @returns {JSX.Element} The VideoViewScreenCustomController component.
 */
export const VideoViewScreenCustomController = memo(({
    toggleFullscreen,
    totalVideos,
    currentIndex,
    previousVideo,
    skipBackward,
    skipForward,
    nextVideo,
    isPlaying,
    player,
}: VideoViewScreenCustomControllerProps) => {
    return (
        <View style={styles.overlay}>
            <View style={{ position: 'absolute', top: 10, right: 10 }}>
                <Button variant="ghost" size="icon" onPress={toggleFullscreen}>
                    <Icon name="fullscreen" type="MaterialIcons" size={28} color={Colors.light.textInverse} />
                </Button>
            </View>
            <View style={styles.centerControls}>
                {totalVideos > 1 && (
                    <Button variant="ghost" size="icon" onPress={previousVideo} disabled={currentIndex === 0}>
                        <Icon name="skip-previous" type="MaterialIcons" size={32} color={Colors.light.textInverse} />
                    </Button>
                )}
                <Button variant="ghost" size="icon" onPress={() => skipBackward(10)}>
                    <Icon name="replay-10" type="MaterialIcons" size={28} color={Colors.light.textInverse} />
                </Button>
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
                <Button variant="ghost" size="icon" onPress={() => skipForward(10)}>
                    <Icon name="forward-10" type="MaterialIcons" size={28} color={Colors.light.textInverse} />
                </Button>
                {totalVideos > 1 && (
                    <Button variant="ghost" size="icon" onPress={nextVideo} disabled={currentIndex === totalVideos - 1}>
                        <Icon name="skip-next" type="MaterialIcons" size={32} color={Colors.light.textInverse} />
                    </Button>
                )}
            </View>
        </View>
    );
});

VideoViewScreenCustomController.displayName = 'VideoViewScreenCustomController';
