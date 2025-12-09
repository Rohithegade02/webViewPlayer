import { Stack } from "expo-router";

export default function MainLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="video-layout" options={{ headerShown: false }} />
        </Stack>
    )
}