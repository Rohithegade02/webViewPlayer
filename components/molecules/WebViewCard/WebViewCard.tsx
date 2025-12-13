import { Skeleton } from "@/components/atoms/skeleton";
import { cn } from "@/lib/utils";
import { memo } from "react";
import { View } from "react-native";
import WebView from "react-native-webview";
import { WebViewCardProps } from "./types";

/**
 * WebViewCard component
 * @param {WebViewCardProps} props - The props for the webview card component.
 * @returns {React.ReactNode} The webview card component.
 */
export const WebViewCard = memo(({
    containerStyle,
    height,
    webviewUrl,
    onLoadEnd,
}: WebViewCardProps) => {
    return (
        <View style={[containerStyle, { height }]}>
            <WebView
                source={{ uri: webviewUrl }}
                startInLoadingState={true}
                renderLoading={() => renderLoading({ height })}
                onLoadEnd={onLoadEnd}
            />
        </View>
    )
})

const renderLoading = ({ height }: { height: number }) => {
    return (
        <Skeleton className={cn("h-full bg-gray-300", height)} />
    )
}