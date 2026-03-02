import Image from "next/image";
import React, { useCallback, useRef, useState } from "react";
import { MediaContentProps } from "./types";

const MediaContent: React.FC<MediaContentProps> = ({
  item,
  liveContentUrl,
  priority = false,
  displayWidth,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const retryTimerRef = useRef<NodeJS.Timeout | null>(null);

  // The URL to display — prefer live URL, fall back to static thumbnail
  const contentUrl = liveContentUrl || item.imageURL;

  // Track the last successfully loaded URL to avoid re-shimmering
  const loadedUrlRef = useRef<string | null>(null);

  const handleLoad = useCallback(() => {
    setLoading(false);
    setError(false);
    loadedUrlRef.current = contentUrl || null;
    if (retryTimerRef.current) {
      clearTimeout(retryTimerRef.current);
      retryTimerRef.current = null;
    }
  }, [contentUrl]);

  const handleError = useCallback(() => {
    if (!liveContentUrl && retryCount < 30) {
      // Background worker might still be processing the thumbnail.
      // Retry after a delay.
      setRetryCount((prev) => prev + 1);
      retryTimerRef.current = setTimeout(() => {
        setError(false);
        setLoading(true);
      }, 2000);
    } else {
      setLoading(false);
      setError(true);
    }
  }, [liveContentUrl, retryCount]);

  // Determine if we should show the shimmer:
  // Only show it if we have NEVER loaded any image for this cell
  const hasLoadedBefore = loadedUrlRef.current !== null;
  const showShimmer = (!contentUrl || (loading && !hasLoadedBefore)) || (error && !liveContentUrl);

  return (
    <div className="relative h-full w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
      <>
        {/* Skeleton shimmer — only shown on initial load, never when swapping URLs */}
        {showShimmer && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 flex items-center justify-center">
             {error && !liveContentUrl && (
               <span className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 font-medium animate-pulse">
                 Preparing preview...
               </span>
             )}
          </div>
        )}

        {/* Hard error fallback (only if liveContentUrl failed or after multiple retries) */}
        {error && liveContentUrl && (
          <div className="flex h-full w-full items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
            Failed to load
          </div>
        )}

        {/* Main Image — stable key prevents remounting when URL changes */}
        {contentUrl && !error && (
          <Image
            key={`${item.messageId}-${retryCount}`}
            src={contentUrl}
            alt="Photo"
            width={item.width}
            height={item.height}
            sizes={displayWidth ? `${displayWidth}px` : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"}
            priority={priority}
            className={`h-full w-full object-cover transition-opacity duration-300 ${
              loading && !hasLoadedBefore ? "opacity-0" : "opacity-100"
            }`}
            onLoad={handleLoad}
            onError={handleError}
          />
        )}
      </>
    </div>
  );
};

export default React.memo(MediaContent);
