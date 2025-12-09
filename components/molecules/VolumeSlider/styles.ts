import { Dimensions, StyleSheet } from "react-native";

const SLIDER_WIDTH = Dimensions.get('window').width * 0.7;
const THUMB_SIZE = 20;

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
        color: '#000',
    },
    sliderTrack: {
        width: SLIDER_WIDTH,
        height: 10,
        backgroundColor: '#ddd',
        borderRadius: 4,
        justifyContent: 'center',
        overflow: 'hidden',
    },
    sliderProgress: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        backgroundColor: '#1E90FF',
    },
    sliderThumb: {
        width: THUMB_SIZE,
        height: THUMB_SIZE,
        backgroundColor: '#fff',
        borderRadius: THUMB_SIZE / 2,
        position: 'absolute',
        top: -6,
        borderWidth: 2,
        borderColor: '#1E90FF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    volumeText: {
        position: 'absolute',
        color: '#000',
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
