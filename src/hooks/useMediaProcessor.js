import { useState, useRef, useCallback, useEffect } from 'react';

export function useMediaProcessor() {
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const imageRef = useRef(null);

  const loadMedia = useCallback((file) => {
    const url = URL.createObjectURL(file);
    const type = file.type.startsWith('video') ? 'video' : 'image';
    
    setMedia(url);
    setMediaType(type);
    // Auto-play videos
    if (type === 'video') {
      setIsPlaying(true);
    }
  }, []);

  const getMediaElement = useCallback(() => {
    if (mediaType === 'video') return videoRef.current;
    return imageRef.current;
  }, [mediaType]);

  const play = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  }, []);

  const pause = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const togglePlayback = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  useEffect(() => {
    return () => {
      if (media) {
        URL.revokeObjectURL(media);
      }
    };
  }, [media]);

  return {
    media,
    mediaType,
    isPlaying,
    loadMedia,
    getMediaElement,
    play,
    pause,
    togglePlayback,
    videoRef,
    imageRef,
  };
}

