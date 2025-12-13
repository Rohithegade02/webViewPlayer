
/**
 * Format time in seconds to mm:ss format
 * @param seconds - The time in seconds to format
 * @returns The formatted time in mm:ss format
 */
export const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};