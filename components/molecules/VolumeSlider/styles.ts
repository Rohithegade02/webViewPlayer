import { Colors } from "@/constants";
import { Dimensions, StyleSheet } from "react-native";

const SLIDER_WIDTH = Dimensions.get('window').width * 0.7;
const THUMB_SIZE = 20;
const HEIGHT = Dimensions.get('window').height;
const SLIDER_HEIGHT = HEIGHT * 0.2;

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        display: 'none',
    },
    sliderTrack: {
        flex: 1,
        height: 4,
        backgroundColor: Colors.light.primary,
        borderRadius: 2,
        justifyContent: 'center',
        overflow: 'visible',
    },
    sliderProgress: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        backgroundColor: Colors.light.volumeTrack,
        borderRadius: 2,
    },
    sliderThumb: {
        width: THUMB_SIZE,
        height: THUMB_SIZE,
        backgroundColor: Colors.light.volumeTrack,
        borderRadius: THUMB_SIZE / 2,
        position: 'absolute',
        left: 0,
        top: '50%',
        marginTop: -THUMB_SIZE / 2,
        zIndex: 1,
        shadowColor: Colors.light.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    volumeText: {
        position: 'absolute',
        color: Colors.light.text,
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
        width: '100%',
        pointerEvents: 'none',
        display: 'none',
    },
});


export const SLIDER_WIDTH_EXPORT = SLIDER_WIDTH;
export const THUMB_SIZE_EXPORT = THUMB_SIZE;
export const SLIDER_HEIGHT_EXPORT = SLIDER_HEIGHT;
