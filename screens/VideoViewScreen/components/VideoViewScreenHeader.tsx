import React, { memo } from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles';
import { VideoViewScreenHeaderProps } from '../types';

export const VideoViewScreenHeader = memo(({
    currentVideoInfo,
    currentIndex,
    totalVideos,
}: VideoViewScreenHeaderProps) => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>{currentVideoInfo.title}</Text>
            <Text style={styles.headerSubtitle}>Video {currentIndex + 1} of {totalVideos}</Text>
        </View>
    );
});

VideoViewScreenHeader.displayName = 'VideoViewScreenHeader';
