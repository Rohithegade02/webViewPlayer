
/**
 * Video Sources - Multiple streams for switching
 */
export const videoSources = [
    {
        id: '1',
        title: 'Big Buck Bunny',
        uri: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    },
    {
        id: '2',
        title: 'DAI Discontinuity',
        uri: 'https://test-streams.mux.dev/dai-discontinuity-deltatre/manifest.m3u8',
    },
];

// For backward compatibility
export const videoSource = videoSources[0].uri;