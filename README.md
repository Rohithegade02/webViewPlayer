# WebView & Video Player App

This application showcases a WebView integration and a custom Video Player with advanced controls, built with React Native and Expo.

## Project Structure

- **`/app`**: Expo Router file-based routing.
- **`/components`**: Atomic components (Atoms, Molecules).
  - **`atoms`**: Basic building blocks (Button, Icon, Text, Skeleton).
  - **`molecules`**: Complex UI components (AnimatedSlider, VolumeSlider, WebViewCard).
- **`/screens`**: Screen-level business logic and presentation separation.
  - **`WebViewScreen`**: Displays a website with notification scheduling controls.
    - `WebViewScreenContainer.tsx`: Logic & State.
    - `WebViewScreenPresentation.tsx`: UI Layout.
  - **`VideoViewScreen`**: Custom video player with YouTube-like controls.
- **`/constants`**: App-wide constants (Colors, Text Strings).
- **`/hooks`**: Custom hooks (e.g., `useNotifications`, `useVideoPlayer`).

## Completed Tasks

### 1. WebView Page
- [x] **Embedded Website**: Integrated a full-feature WebView to load external URLs.
- [x] **Local Notifications**: Implemented buttons to schedule notifications.
  - Triggers with a 2-5 second delay.
  - Supports multiple distinct notification messages (e.g., "WebView Notification", "Action Completed").

### 2. Video Player Page
- [x] **HLS Video Playback**: Plays HLS streams (e.g., `https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8`).
- [x] **Custom Controls**: Built a custom overlay with Play, Pause, Skip, and Fullscreen functionalities.
- [x] **Volume & Seek**: Implemented vertical volume control and a smooth seek slider using `react-native-reanimated`.

### 3. Navigation & UI
- [x] **Navigation**: Seamless routing between the WebView and Video Player screens.
- [x] **Component System**: Used an Atomic Design approach for reusable components (Button, Icon, Slider).

### 🌟 Bonus Features
- [x] **Deep Linking**: Fully configured deep linking for iOS and Android.
  - **Scheme**: `webviewplayer://`
  - **Test URLs**:
    - Open App: `webviewplayer://`
    - Open Video Player: `webviewplayer://video-layout`

## Technical Highlights
- **Architecture**: Separation of concerns (Container/Presentation pattern).
- **Styling**: `styles.ts` files for screens, `Colors.ts` for constants.
- **Animations**: `react-native-reanimated` for smooth sliders and transitions.
- **Gestures**: `react-native-gesture-handler` for interactive controls.

## Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Run the app**:
    ```bash
    npx expo start
    ```
