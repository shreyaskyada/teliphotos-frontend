"use client";

import { getPhotoVideoThumbnailURL } from "@telephotos/services/media";
import { Button } from "@telephotos/ui";
import {
    ArrowLeft,
    ArrowRight,
    Download,
    Grid3X3,
    Info,
    Maximize,
    Minimize,
    Pause,
    Play,
    RotateCcw,
    Share2,
    Trash2,
    Volume2,
    VolumeX,
    X,
    ZoomIn,
    ZoomOut,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AdBanner728x90Carousel } from "../../components/AdBanner728x90Carousel";
import type { MediaViewerProps } from "./types";
import { useMediaViewer } from "./useMediaViewer";

// Helper function to get access token from cookies
const getToken = (): string => {
  if (typeof document === "undefined") return "";

  const accessToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("telephotos_access_token="))
    ?.split("=")[1];

  return accessToken || "";
};

const MediaViewer = ({
  items,
  startIndex,
  channelId,
  isOpen,
  onClose,
  onDownload,
  onShare,
  onDelete,
}: MediaViewerProps) => {
  const {
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
  } = useMediaViewer({ items, startIndex, isOpen, onClose });

  const [showControls, setShowControls] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showAd, setShowAd] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-hide controls
  useEffect(() => {
    if (!isOpen) return;

    const hideControls = () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    };

    const showControlsTemporarily = () => {
      setShowControls(true);
      hideControls();
    };

    const handleMouseMove = () => {
      showControlsTemporarily();
    };

    document.addEventListener("mousemove", handleMouseMove);
    // Show controls initially or whenever the photo index changes
    showControlsTemporarily();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isOpen, index]);

  if (!isOpen) return null;

  const handleVideoPlay = () => {
    const video = mediaRef.current as HTMLVideoElement;
    if (video) {
      video.paused ? video.play() : video.pause();
      setIsPlaying(!video.paused);
    }
  };

  const handleVideoTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    setCurrentTime(video.currentTime);
    setDuration(video.duration);
  };

  const handleVideoLoadedMetadata = (
    e: React.SyntheticEvent<HTMLVideoElement>
  ) => {
    const video = e.currentTarget;
    setDuration(video.duration);
  };

  const handleVolumeChange = (newVolume: number) => {
    const video = mediaRef.current as HTMLVideoElement;
    if (video) {
      video.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    const video = mediaRef.current as HTMLVideoElement;
    if (video) {
      if (isMuted) {
        video.volume = volume;
        setIsMuted(false);
      } else {
        video.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const seekTo = (time: number) => {
    const video = mediaRef.current as HTMLVideoElement;
    if (video) {
      video.currentTime = time;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const mediaTransform = {
    transform: `scale(${zoomState.scale}) translate(${zoomState.translateX}px, ${zoomState.translateY}px)`,
    transition: zoomState.isZooming ? "none" : "transform 0.2s ease-out",
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-black"
      onClick={(e) => {
        if (e.target === containerRef.current) onClose();
      }}
    >
      {/* Top Controls Bar */}
      <div
        className={`absolute top-0 left-0 right-0 z-10 transition-all duration-300 ${
          showControls
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/80 to-transparent">
          {/* Left side - Navigation info */}
          <div className="flex items-center gap-4">
            <div className="text-white/90 text-sm font-medium">
              {index + 1} / {items.length}
            </div>
            <div className="text-white/70 text-xs hidden sm:block truncate max-w-[200px]">
              {current?.fileName ||
                `${current?.kind?.toUpperCase()} ${index + 1}`}
            </div>
          </div>

          {/* Right side - Action buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowThumbnails(!showThumbnails)}
              className="text-white/90 hover:text-white hover:bg-white/20 hidden sm:flex"
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowInfo(!showInfo)}
              className="text-white/90 hover:text-white hover:bg-white/20 hidden sm:flex"
            >
              <Info className="w-4 h-4" />
            </Button>

            {onDownload && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDownload(current!)}
                className="text-white/90 hover:text-white hover:bg-white/20"
              >
                <Download className="w-4 h-4" />
              </Button>
            )}

            {onShare && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onShare(current!)}
                className="text-white/90 hover:text-white hover:bg-white/20"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            )}

            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(current!)}
                className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullscreen}
              className="text-white/90 hover:text-white hover:bg-white/20 hidden sm:flex"
            >
              {isFullscreen ? (
                <Minimize className="w-4 h-4" />
              ) : (
                <Maximize className="w-4 h-4" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white/90 hover:text-white hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Media Content */}
      <div className="h-full w-full flex items-center justify-center overflow-hidden">
        <div
          className="relative flex items-center justify-center"
          style={{ width: "100%", height: "100%" }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {current?.kind === "photo" ? (
            <div className="relative">
              {/* Blurred thumbnail preview */}
              {!isLoaded && (
                <Image
                  src={getPhotoVideoThumbnailURL(
                    channelId as string,
                    current.messageId
                  )}
                  alt="Photo preview"
                  width={current.width || 1600}
                  height={current.height || 1200}
                  className="max-h-[100vh] max-w-[100vw] object-contain select-none absolute inset-0"
                  style={{
                    ...mediaTransform,
                    // filter: "blur(20px)",
                    transition: isLoaded
                      ? "transform 0.2s ease-out"
                      : undefined,
                    willChange: "transform",
                    opacity: 1,
                  }}
                  priority
                  unoptimized
                />
              )}

              {/* Main high-quality image */}
              <Image
                ref={mediaRef as unknown as React.RefObject<HTMLImageElement>}
                src={`${
                  process.env.NEXT_PUBLIC_BASE_BACKEND_URL
                }/channels/stream/photos/${channelId}/${
                  current.messageId
                }?token=${getToken()}`}
                alt="Photo"
                width={current.width || 1600}
                height={current.height || 1200}
                className="max-h-[100vh] max-w-[100vw] object-contain select-none"
                style={{
                  ...mediaTransform,
                  transition: isLoaded ? "transform 0.2s ease-out" : undefined,
                  willChange: "transform",
                  opacity: isLoaded ? 1 : 0,
                }}
                priority
                unoptimized
                onLoad={() => setIsLoaded(true)}
              />
            </div>
          ) : current?.kind === "video" ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <video
                ref={mediaRef as unknown as React.RefObject<HTMLVideoElement>}
                src={`${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/videos/stream/${channelId}/${current.messageId}`}
                poster={getPhotoVideoThumbnailURL(
                  channelId as string,
                  current.messageId
                )}
                className="h-[100vh] w-[100vw] object-cover select-none"
                style={{
                  ...mediaTransform,
                  transition: isLoaded ? "transform 0.2s ease-out" : undefined,
                  willChange: "transform",
                  objectFit: "contain",
                  objectPosition: "center",
                }}
                preload="metadata"
                onLoadedData={() => setIsLoaded(true)}
                onTimeUpdate={handleVideoTimeUpdate}
                onLoadedMetadata={handleVideoLoadedMetadata}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              {/* Video Play/Pause Overlay */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                  isPlaying ? "opacity-0" : "opacity-100"
                }`}
                onClick={handleVideoPlay}
              >
                <div className="w-20 h-20 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
              </div>
            </div>
          ) : (
            <div className="text-white/70 flex items-center gap-2">
              <div className="animate-spin h-5 w-5 text-white/80">
                <svg viewBox="0 0 24 24">
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
              </div>
              Loading...
            </div>
          )}
        </div>
      </div>

      {/* Floating Carousel Ad - Show only outside of Thumbnail picker */}
      {!showThumbnails && current && showAd && (
        <div 
          className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 transition-opacity duration-300 hidden md:block"
          style={{ 
            opacity: showControls ? 1 : 0 
          }}
        >
          <div className="flex flex-col items-center gap-1.5 relative">
            <div className="w-full flex justify-between items-center px-2">
              <span className="text-[10px] text-white/40 tracking-widest uppercase">
                Advertisement
              </span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAd(false);
                }}
                className="text-white/40 hover:text-white transition-colors bg-black/20 hover:bg-black/50 rounded-full p-1 backdrop-blur-sm -mb-2 z-20 relative"
                aria-label="Close advertisement"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
            
            <div className="relative">
              <AdBanner728x90Carousel />
            </div>
          </div>
        </div>
      )}

      {/* Navigation Arrows */}
      <button
        className={`absolute left-4 top-1/2 -translate-y-1/2 text-white text-2xl select-none rounded-full w-12 h-12 hidden md:flex items-center justify-center bg-black/50 hover:bg-black/70 transition-all duration-200 backdrop-blur-sm ${
          showControls ? "opacity-100" : "opacity-0"
        } ${index === 0 ? "opacity-30 cursor-not-allowed" : "hover:scale-110"}`}
        onClick={(e) => {
          e.stopPropagation();
          if (index > 0) goPrev();
        }}
        aria-label="Previous"
        disabled={index === 0}
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      <button
        className={`absolute right-4 top-1/2 -translate-y-1/2 text-white text-2xl select-none rounded-full w-12 h-12 hidden md:flex items-center justify-center bg-black/50 hover:bg-black/70 transition-all duration-200 backdrop-blur-sm ${
          showControls ? "opacity-100" : "opacity-0"
        } ${
          index === items.length - 1
            ? "opacity-30 cursor-not-allowed"
            : "hover:scale-110"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          if (index < items.length - 1) goNext();
        }}
        aria-label="Next"
        disabled={index === items.length - 1}
      >
        <ArrowRight className="w-6 h-6" />
      </button>

      {/* Zoom Controls */}
      <div
        className={`absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-2 transition-all duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transform: `translateY(-50%) translateX(${
            index === items.length - 1 ? "0" : "-80px"
          })`,
        }}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={zoomIn}
          className="w-10 h-10 p-0 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={resetZoom}
          className="w-10 h-10 p-0 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={zoomOut}
          className="w-10 h-10 p-0 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm"
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
      </div>

      {/* Video Controls */}
      {current?.kind === "video" && (
        <div
          className={`absolute bottom-0 left-0 right-0 z-10 transition-all duration-300 ${
            showControls
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-full"
          }`}
        >
          <div className="bg-gradient-to-t from-black/80 to-transparent p-6">
            {/* Progress Bar */}
            <div className="mb-4">
              <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={(e) => seekTo(Number(e.target.value))}
                className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                    (currentTime / duration) * 100
                  }%, rgba(255,255,255,0.2) ${
                    (currentTime / duration) * 100
                  }%, rgba(255,255,255,0.2) 100%)`,
                }}
              />
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleVideoPlay}
                  className="text-white hover:bg-white/20"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMute}
                  className="text-white hover:bg-white/20"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </Button>

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => handleVolumeChange(Number(e.target.value))}
                  className="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="text-white/90 text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Thumbnails Strip */}
      {showThumbnails && (
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/90 to-transparent p-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {items.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  // setIndex(idx);
                  setIsLoaded(false);
                }}
                className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  idx === index
                    ? "border-blue-500 scale-110"
                    : "border-white/20 hover:border-white/40"
                }`}
              >
                <Image
                  src={getPhotoVideoThumbnailURL(
                    channelId as string,
                    item.messageId
                  )}
                  alt={`Thumbnail ${idx + 1}`}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
                {item.kind === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Play className="w-4 h-4 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Info Panel */}
      {showInfo && (
        <div className="absolute top-16 right-4 z-20 w-80 bg-black/90 backdrop-blur-sm rounded-lg p-4 text-white">
          <h3 className="text-lg font-semibold mb-4">Media Information</h3>

          <div className="space-y-3 text-sm">
            <div>
              <span className="text-white/70">Type:</span>
              <span className="ml-2 capitalize">{current?.kind}</span>
            </div>

            {current?.fileName && (
              <div>
                <span className="text-white/70">File:</span>
                <span className="ml-2 break-all">{current.fileName}</span>
              </div>
            )}

            {current?.width && current?.height && (
              <div>
                <span className="text-white/70">Dimensions:</span>
                <span className="ml-2">
                  {current.width} × {current.height}
                </span>
              </div>
            )}

            {current?.durationSec && (
              <div>
                <span className="text-white/70">Duration:</span>
                <span className="ml-2">
                  {formatDuration(current.durationSec)}
                </span>
              </div>
            )}

            {current?.sizeBytes && (
              <div>
                <span className="text-white/70">Size:</span>
                <span className="ml-2">
                  {formatFileSize(current.sizeBytes)}
                </span>
              </div>
            )}

            <div>
              <span className="text-white/70">Zoom:</span>
              <span className="ml-2">{Math.round(zoomState.scale * 100)}%</span>
            </div>
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Help */}
      <div className="absolute bottom-4 left-4 text-white/50 text-xs">
        <div>
          ESC: Close | ← →: Navigate | Space: Play/Pause | F: Fullscreen
        </div>
        <div>T: Thumbnails | I: Info | 0: Reset Zoom | +/-: Zoom</div>
      </div>
    </div>
  );
};

export default MediaViewer;
