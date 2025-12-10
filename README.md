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

## Features

### WebView Screen
- **WebView Integration**: Loads external URLs seamlessly.
- **Notifications**: Buttons to schedule local notifications with delays (2s, 5s).
- **Navigation**: Direct link to the Video Player screen.
- **Consistent Styling**: Uses shared design tokens and components.

### Video Player Screen
- **Custom Player**: Built on top of `expo-video`.
- **Overlay Controls**:
  - Play, Pause, Skip (+/- 10s), Next/Prev Video.
  - Fullscreen toggle.
  - Interactive overlay visibility (tap to show/hide).
- **Volume Control**: Vertical volume slider with gesture support.
- **Progress Control**: Drag-to-seek functionality.
- **Theming**: Dark mode aesthetic for video, consistent with app design.

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
