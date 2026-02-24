"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { GestureState, MediaItem, ZoomState } from "./types";

export const useMediaViewer = ({
  items,
  startIndex,
  isOpen,
  onClose,
}: {
  items: MediaItem[];
  startIndex: number;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [index, setIndex] = useState(startIndex);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLImageElement | HTMLVideoElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Zoom and gesture state
  const [zoomState, setZoomState] = useState<ZoomState>({
    scale: 1,
    translateX: 0,
    translateY: 0,
    isZooming: false,
  });

  const [gestureState, setGestureState] = useState<GestureState>({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    isDragging: false,
    isZooming: false,
    initialDistance: 0,
    initialScale: 1,
  });

  useEffect(() => {
    if (!isOpen) return;
    setIndex(startIndex);
    setIsLoaded(false);
    // Reset zoom when changing media
    setZoomState({
      scale: 1,
      translateX: 0,
      translateY: 0,
      isZooming: false,
    });
  }, [isOpen, startIndex]);

  const current = items[index];

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1 < items.length ? i + 1 : i));
    setIsLoaded(false);
    setZoomState({
      scale: 1,
      translateX: 0,
      translateY: 0,
      isZooming: false,
    });
  }, [items.length]);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 >= 0 ? i - 1 : i));
    setIsLoaded(false);
    setZoomState({
      scale: 1,
      translateX: 0,
      translateY: 0,
      isZooming: false,
    });
  }, []);

  const resetZoom = useCallback(() => {
    setZoomState({
      scale: 1,
      translateX: 0,
      translateY: 0,
      isZooming: false,
    });
  }, []);

  const zoomIn = useCallback(() => {
    setZoomState((prev) => ({
      ...prev,
      scale: Math.min(prev.scale * 1.5, 5),
      isZooming: true,
    }));
  }, []);

  const zoomOut = useCallback(() => {
    setZoomState((prev) => ({
      ...prev,
      scale: Math.max(prev.scale / 1.5, 0.5),
      isZooming: prev.scale / 1.5 > 0.5,
    }));
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  // Gesture handling
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];

      setGestureState((prev) => ({
        ...prev,
        startX: touch1.clientX,
        startY: touch1.clientY,
        lastX: touch1.clientX,
        lastY: touch1.clientY,
        isDragging: true,
        isZooming: !!touch2,
        initialDistance: touch2
          ? Math.sqrt(
              (touch2.clientX - touch1.clientX) ** 2 +
                (touch2.clientY - touch1.clientY) ** 2
            )
          : 0,
        initialScale: zoomState.scale,
      }));
    },
    [zoomState.scale]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];

      if (gestureState.isZooming && touch2) {
        const currentDistance = Math.sqrt(
          (touch2.clientX - touch1.clientX) ** 2 +
            (touch2.clientY - touch1.clientY) ** 2
        );
        const scale =
          gestureState.initialScale *
          (currentDistance / gestureState.initialDistance);

        setZoomState((prev) => ({
          ...prev,
          scale: Math.min(Math.max(scale, 0.5), 5),
        }));
      } else if (gestureState.isDragging) {
        const deltaX = touch1.clientX - gestureState.lastX;
        const deltaY = touch1.clientY - gestureState.lastY;

        setZoomState((prev) => ({
          ...prev,
          translateX: prev.translateX + deltaX,
          translateY: prev.translateY + deltaY,
        }));
      }

      setGestureState((prev) => ({
        ...prev,
        lastX: touch1.clientX,
        lastY: touch1.clientY,
      }));
    },
    [gestureState]
  );

  const handleTouchEnd = useCallback(() => {
    setGestureState((prev) => ({
      ...prev,
      isDragging: false,
      isZooming: false,
    }));
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === " ") {
        e.preventDefault();
        if (current?.kind === "video") {
          const video = mediaRef.current as HTMLVideoElement;
          if (video) {
            video.paused ? video.play() : video.pause();
          }
        }
      }
      if (e.key === "f" || e.key === "F11") {
        e.preventDefault();
        toggleFullscreen();
      }
      if (e.key === "t") {
        e.preventDefault();
        setShowThumbnails((prev) => !prev);
      }
      if (e.key === "i") {
        e.preventDefault();
        setShowInfo((prev) => !prev);
      }
      if (e.key === "0") {
        e.preventDefault();
        resetZoom();
      }
      if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        zoomIn();
      }
      if (e.key === "-") {
        e.preventDefault();
        zoomOut();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [
    isOpen,
    goNext,
    goPrev,
    onClose,
    current,
    toggleFullscreen,
    resetZoom,
    zoomIn,
    zoomOut,
  ]);

  // Format file size
  const formatFileSize = useCallback((bytes: number | string | undefined) => {
    if (!bytes) return "Unknown size";
    const size = typeof bytes === "string" ? parseInt(bytes) : bytes;
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    if (size < 1024 * 1024 * 1024)
      return `${(size / (1024 * 1024)).toFixed(1)} MB`;
    return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  }, []);

  // Format duration
  const formatDuration = useCallback((seconds: number | undefined) => {
    if (!seconds) return "";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, []);

  return {
    index,
    current,
    containerRef,
    mediaRef,
    isLoaded,
    setIsLoaded,
    showThumbnails,
    setShowThumbnails,
    showInfo,
    setShowInfo,
    isFullscreen,
    zoomState,
    gestureState,
    goPrev,
    goNext,
    resetZoom,
    zoomIn,
    zoomOut,
    toggleFullscreen,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    formatFileSize,
    formatDuration,
  };
};
