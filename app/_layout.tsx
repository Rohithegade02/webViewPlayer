import { useNotificationObserver } from "@/hooks";
import { SCREENS } from "@/route";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css";


export default function RootLayout() {
  useNotificationObserver();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar />
      <Stack>
        <Stack.Screen name={SCREENS.INDEX} options={{ headerShown: false }} />
        <Stack.Screen name={SCREENS.MAIN} options={{ headerShown: false }} />
      </Stack>
      <PortalHost />
    </GestureHandlerRootView>
  )
}
