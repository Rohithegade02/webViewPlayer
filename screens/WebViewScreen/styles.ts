import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    button: {
        backgroundColor: '#2b7ffb',
        height: height * 0.07,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        width: width * 0.5,
        borderRadius: 10,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fbcf2b',
    },
    buttonText: {
        color: '#fff',
    }
});