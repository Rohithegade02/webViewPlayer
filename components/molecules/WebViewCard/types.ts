import { StyleProp, ViewStyle } from "react-native";

export interface WebViewCardProps {
    containerStyle?: StyleProp<ViewStyle>;
    height: number;
    webviewUrl: string;
    onLoadEnd?: () => void;
}