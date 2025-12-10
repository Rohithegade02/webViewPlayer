import { Colors } from "@/constants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    headerContainer: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    headerSubtitle: {
        fontSize: 12,
        color: Colors.light.textSecondary,
        marginTop: 2,
    },
    videoContainer: {
        width: '100%',
        aspectRatio: 16 / 9,
        backgroundColor: '#000',
        position: 'relative',
    },
    videoWrapper: {
        flex: 1,
    },
    video: {
        flex: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: Colors.light.videoOverlay, // 'rgba(0, 0, 0, 0.4)'
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerControls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    playButton: {
        width: 80,
        height: 80,
    },
    bottomControlsContainer: {
        padding: 16,
        gap: 16,
    },
    sliderContainer: {
        gap: 8,
    },
    timeRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 8,
    },
    timeText: {
        fontSize: 12,
        color: Colors.light.textSecondary,
        fontWeight: '600',
    },
    controlsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    volumeControl: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        flex: 1,
    }
});