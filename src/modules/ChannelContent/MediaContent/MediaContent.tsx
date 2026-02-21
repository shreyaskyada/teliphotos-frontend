import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MediaContentProps } from "./types";

const MediaContent: React.FC<MediaContentProps> = ({
  item,
  liveContentUrl,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const contentUrl = liveContentUrl || item.imageURL;

  // Track if we've successfully loaded THIS specific URL to avoid re-shimmering
  const [loadedUrl, setLoadedUrl] = useState<string | null>(null);

  useEffect(() => {
    // Only reset loading/error if the URL actually changes and it's not just a minor ref update
    if (contentUrl !== loadedUrl) {
      setError(false);
      // If we already have a loaded image, don't show shimmer again while the higher-res or live version loads
      if (!loadedUrl) {
        setLoading(true);
      }
      setRetryCount(0);
    }
  }, [contentUrl, loadedUrl]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
      <>
        {/* Skeleton shimmer while image loads or during retry */}
        {((!contentUrl || loading) || (error && !liveContentUrl)) && (
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

        {/* Main Image */}
        {contentUrl && !error && (
          <Image
            key={`${contentUrl}-${retryCount}`}
            src={contentUrl}
            alt="Photo"
            width={item.width}
            height={item.height}
            className={`h-full w-full object-cover transition-opacity duration-500 ${
              loading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => {
              setLoading(false);
              setError(false);
              setLoadedUrl(contentUrl);
            }}
            onError={() => {
              if (!liveContentUrl && retryCount < 30) {
                // Background worker might still be processing the thumbnail.
                // Hide the error and retry.
                setRetryCount((prev) => prev + 1);
                setTimeout(() => {
                  setError(false);
                  setLoading(true);
                }, 2000);
              } else {
                setLoading(false);
                setError(true);
              }
            }}
          />
        )}
      </>
    </div>
  );
};

export default React.memo(MediaContent);
