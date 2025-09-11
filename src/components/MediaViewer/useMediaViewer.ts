"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MediaItem } from "./types";

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

  useEffect(() => {
    if (!isOpen) return;
    setIndex(startIndex);
    setIsLoaded(false);
  }, [isOpen, startIndex]);

  const current = items[index];

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1 < items.length ? i + 1 : i));
    setIsLoaded(false);
  }, [items.length]);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 >= 0 ? i - 1 : i));
    setIsLoaded(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, goNext, goPrev, onClose]);

  return {
    index,

    current,
    containerRef,
    goPrev,
    goNext,
    mediaRef,
    isLoaded,
    setIsLoaded,
  };
};
