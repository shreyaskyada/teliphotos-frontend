"use client";

import { getPhotoVideoThumbnailURL } from "@teliphotos/services/media";
import { Button } from "@teliphotos/ui";
import { ArrowRight, X } from "lucide-react";
import Image from "next/image";
import type { MediaViewerProps } from "./types";
import { useMediaViewer } from "./useMediaViewer";

const MediaViewer = ({
  items,
  startIndex,
  channelId,
  isOpen,
  onClose,
}: MediaViewerProps) => {
  const {
    index,
    current,
    containerRef,
    goPrev,
    goNext,
    mediaRef,
    isLoaded,
    setIsLoaded,
  } = useMediaViewer({ items, startIndex, isOpen, onClose });

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-black/95"
      onClick={(e) => {
        if (e.target === containerRef.current) onClose();
      }}
    >
      <div
        className={`absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-3 transition-opacity duration-200`}
      >
        <div className="text-white/80 text-sm select-none">
          {index + 1} / {items.length}
        </div>
        <div className="flex items-center gap-2">
          <Button
            // className="text-white/90 hover:text-white rounded p-2 bg-white/10 hover:bg-white/20"
            variant="ghost"
            onClick={onClose}
            aria-label="Close"
          >
            <X />
          </Button>
        </div>
      </div>

      <div className="h-full w-full flex items-center justify-center">
        {current?.kind === "photo" ? (
          <Image
            ref={mediaRef as unknown as React.RefObject<HTMLImageElement>}
            src={getPhotoVideoThumbnailURL(
              channelId as string,
              current.messageId
            )}
            alt="Photo"
            width={current.width || 1600}
            height={current.height || 1200}
            className="max-h-[90vh] max-w-[95vw] object-contain select-none"
            style={{
              transition: isLoaded ? "transform 0.15s ease-out" : undefined,
              willChange: "transform",
            }}
            priority
            onLoad={() => setIsLoaded(true)}
          />
        ) : current?.kind === "video" ? (
          <video
            ref={mediaRef as unknown as React.RefObject<HTMLVideoElement>}
            src={`${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/videos/stream/${channelId}/${current.messageId}`}
            poster={getPhotoVideoThumbnailURL(
              channelId as string,
              current.messageId
            )}
            className="max-h-[90vh] max-w-[95vw] h-[90vh] w-[95vw]"
            controls
            autoPlay
            preload="metadata"
            onLoadedData={() => setIsLoaded(true)}
            style={{
              transition: isLoaded ? "transform 0.15s ease-out" : undefined,
              willChange: "transform",
            }}
          />
        ) : (
          <div className="text-white/70 flex items-center gap-2">
            <svg
              className="animate-spin h-5 w-5 text-white/80"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            Loading...
          </div>
        )}
      </div>

      {/* Bottom bar */}
      <div
        className={`pointer-events-none absolute bottom-0 left-0 right-0 transition-opacity duration-200`}
      >
        <div className="h-28 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Nav buttons */}
      <button
        className={`absolute left-3 top-1/2 -translate-y-1/2 text-white text-3xl select-none rounded-full w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 transition-opacity`}
        onClick={(e) => {
          e.stopPropagation();
          goPrev();
        }}
        aria-label="Previous"
      >
        <ArrowRight className="rotate-180" />
      </button>
      <button
        className={`absolute right-3 top-1/2 -translate-y-1/2 text-white text-3xl select-none rounded-full w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 transition-opacity`}
        onClick={(e) => {
          e.stopPropagation();
          goNext();
        }}
        aria-label="Next"
      >
        <ArrowRight />
      </button>
    </div>
  );
};

export default MediaViewer;
