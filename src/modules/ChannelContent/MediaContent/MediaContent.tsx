import { getPhotoStreamURL } from "@telephotos/services/media";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { MediaContentProps } from "./types";

// Once every source has failed, start over after these delays — the backend may
// still be generating the thumbnail or be briefly unreachable
const RETRY_DELAYS_MS = [2000, 5000, 10000, 20000];

const MediaContent: React.FC<MediaContentProps> = ({
  item,
  channelId,
  liveContentUrl,
  priority = false,
}) => {
  const [failedUrls, setFailedUrls] = useState<ReadonlySet<string>>(() => new Set());
  const [retryCount, setRetryCount] = useState(0);
  const [loadedUrl, setLoadedUrl] = useState<string | null>(null);

  // Rebuilt each retry round so it picks up a refreshed access token
  const streamUrl = useMemo(
    () => getPhotoStreamURL(channelId, item.messageId),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [channelId, item.messageId, retryCount]
  );

  // Sources in order of preference: the freshest signed R2 URL pushed by the worker,
  // the URL from the content API (signed R2 URL, or the stream URL while the
  // thumbnail is being generated), and finally the stream URL built here.
  // A URL that fails is skipped, and a new URL (e.g. a new live URL) is always tried.
  const currentUrl = useMemo(
    () =>
      [liveContentUrl, item.imageURL, streamUrl].find(
        (url): url is string => !!url && !failedUrls.has(url)
      ),
    [liveContentUrl, item.imageURL, streamUrl, failedUrls]
  );

  const retriesLeft = retryCount < RETRY_DELAYS_MS.length;

  useEffect(() => {
    if (currentUrl || !retriesLeft) return;

    const timer = setTimeout(() => {
      setFailedUrls(new Set());
      setRetryCount((count) => count + 1);
    }, RETRY_DELAYS_MS[retryCount]);

    return () => clearTimeout(timer);
  }, [currentUrl, retriesLeft, retryCount]);

  // While waiting for a retry, keep showing the last image that loaded
  const src = currentUrl ?? loadedUrl;
  const hasLoaded = loadedUrl !== null;
  const gaveUp = !currentUrl && !retriesLeft && !hasLoaded;

  const handleError = (url: string) => {
    // Only the source being tried counts — not the last-good image shown while waiting
    if (url !== currentUrl) return;
    setFailedUrls((prev) => new Set(prev).add(url));
  };

  return (
    <div className="relative h-full w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
      {/* Skeleton shimmer — only until the first image loads, never when swapping URLs */}
      {!hasLoaded && !gaveUp && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 flex items-center justify-center">
          {retryCount > 0 && (
            <span className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 font-medium animate-pulse">
              Preparing preview...
            </span>
          )}
        </div>
      )}

      {gaveUp && (
        <div className="flex h-full w-full items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
          Failed to load
        </div>
      )}

      {src && (
        <Image
          // Same element while switching sources (keeps the current image on screen);
          // a fresh one per retry round so the browser requests the URLs again
          key={`${item.messageId}-${retryCount}`}
          src={src}
          alt="Photo"
          width={item.width}
          height={item.height}
          // Grid thumbnails are already small JPEGs. Next's optimizer would only add a
          // hop, and it rejects localhost (Next 16) and hosts missing from remotePatterns.
          unoptimized
          priority={priority}
          className={`h-full w-full object-cover transition-opacity duration-300 ${
            hasLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setLoadedUrl(src)}
          onError={() => handleError(src)}
        />
      )}
    </div>
  );
};

export default React.memo(MediaContent);
