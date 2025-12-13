import { SCREENS } from "@/route";
import { Stack } from "expo-router";

export default function MainLayout() {
    return (
        <Stack>
            <Stack.Screen name={SCREENS.INDEX} options={{ headerShown: false }} />
            <Stack.Screen name={SCREENS.VIDEO_PLAYER} options={{ headerShown: false }} />
        </Stack>
    )
}