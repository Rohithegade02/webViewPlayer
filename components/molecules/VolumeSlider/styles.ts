import { Colors } from "@/constants";
import { Dimensions, StyleSheet } from "react-native";

const SLIDER_WIDTH = Dimensions.get('window').width * 0.7;
const THUMB_SIZE = 20;
const HEIGHT = Dimensions.get('window').height;
export const styles = StyleSheet.create({
    container: {
        width: '100%',

        paddingHorizontal: 20,
        marginTop: 16,
        alignItems: 'center',
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
        color: Colors.light.text,
    },
    sliderTrack: {
        width: 10,
        height: HEIGHT * 0.2,
        backgroundColor: Colors.light.volumeTrack,
        borderRadius: 4,
        justifyContent: 'center',
        overflow: 'hidden',
    },
    sliderProgress: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        backgroundColor: Colors.light.accent,
    },
    sliderThumb: {
        width: THUMB_SIZE,
        height: THUMB_SIZE,
        backgroundColor: Colors.light.background,
        borderRadius: THUMB_SIZE / 2,
        position: 'absolute',
        top: -6,
        borderWidth: 2,
        borderColor: Colors.light.background,
        shadowColor: Colors.light.background,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    volumeText: {
        position: 'absolute',
        color: Colors.light.text,
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
        width: '100%',
        pointerEvents: 'none',
        top: -2,
    },
});


export const SLIDER_WIDTH_EXPORT = SLIDER_WIDTH;
export const THUMB_SIZE_EXPORT = THUMB_SIZE;
