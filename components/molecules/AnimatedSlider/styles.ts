import { Colors } from "@/constants";
import { StyleSheet } from "react-native";

// const SLIDER_WIDTH = Dimensions.get('window').width * 0.7;
const THUMB_SIZE = 16;

export const styles = StyleSheet.create({
    container: {
        marginTop: 12,
    },
    sliderTrack: {
        width: '100%',
        height: 40,
        backgroundColor: Colors.light.textSecondary,
        borderRadius: 4,
        justifyContent: 'center',
        overflow: 'hidden',
    },
    sliderProgress: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        backgroundColor: Colors.light.volumeTrack,
    },
    sliderThumb: {
        width: THUMB_SIZE,
        height: THUMB_SIZE,
        backgroundColor: Colors.light.sliderThumb,
        borderRadius: THUMB_SIZE / 2,
        position: 'absolute',
        top: 12,
    },
    loadingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.light.loadingOverlay,
    },
    timeText: {
        position: 'absolute',
        color: Colors.light.textInverse,
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
        width: '100%',
        pointerEvents: 'none',
    },
});

