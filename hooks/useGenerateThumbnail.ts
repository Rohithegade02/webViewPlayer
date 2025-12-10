import * as VideoThumbnails from 'expo-video-thumbnails';
import { useEffect, useState } from 'react';

export const useGenerateThumbnail = (videoUrl: string) => {
    const [image, setImage] = useState<string | null>(null);

    const generateThumbnail = async () => {
        try {
            const { uri } = await VideoThumbnails.getThumbnailAsync(
                videoUrl,
                {
                    time: 15000,
                }
            );
            setImage(uri);
        } catch (e) {
            console.warn(e);
        }
    };

    useEffect(() => {
        generateThumbnail();
    }, [videoUrl]);

    return {
        thumbnailImage: image,
    };
};