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
        backgroundColor: Colors.light.videoOverlay,
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
        paddingVertical: 16,
        paddingHorizontal: 8,
        gap: 8,
    },
    slidersRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    seekSliderWrapper: {
        flex: 1,
    },
    volumeSliderWrapper: {
        width: 110,

        justifyContent: 'center',
        marginLeft: 8,
    },
    timeRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: 0,
    },
    timeText: {
        fontSize: 12,
        color: Colors.light.textSecondary,
        fontWeight: '600',
    },
});