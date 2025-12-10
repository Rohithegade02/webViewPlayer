import { Colors } from "@/constants";
import { StyleSheet } from "react-native";

/*
 * styles Object
 *
 * This object contains the styles for the WebViewScreen.
 *
 * @property container - The container style
 * @property webviewContainer - The webview container style
 * @property controlsContainer - The controls container style
 * @property rowContainer - The row container style
 * @property actionButton - The action button style
 * @property primaryButton - The primary button style
 * @property buttonLabel - The button label style
 * @property primaryButtonLabel - The primary button label style
 * @property loadingContainer - The loading container style
 */
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    webviewContainer: {
        flex: 1,
        margin: 16,
        borderRadius: 24,
        overflow: 'hidden',
        backgroundColor: Colors.light.card,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
    },
    controlsContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        gap: 12,
    },
    rowContainer: {
        flexDirection: 'row',
        gap: 12,
        justifyContent: 'space-between',
    },
    actionButton: {
        flex: 1,
        backgroundColor: Colors.light.card,
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
        borderWidth: 1,
        borderColor: Colors.light.border,
    },
    primaryButton: {
        backgroundColor: Colors.light.primary,
        paddingVertical: 18,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10,
        shadowColor: Colors.light.primary,
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 4,
    },
    buttonLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors.light.textSecondary,
    },
    primaryButtonLabel: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.light.textInverse,
        letterSpacing: 0.5,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.light.background,
    }
});