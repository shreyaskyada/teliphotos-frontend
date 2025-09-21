import { Play } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { MediaContentProps } from "./types";

const MediaContent: React.FC<MediaContentProps> = ({
  item,
  liveContentUrl,
  isVid,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className="relative h-full w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
      <>
        {/* Skeleton shimmer while image loads */}
        {(!liveContentUrl || loading) && !error && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700" />
        )}

        {/* Error fallback */}
        {error && (
          <div className="flex h-full w-full items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
            Failed to load {isVid ? "video" : "image"}
          </div>
        )}

        {/* Main Image */}
        {liveContentUrl && !error && (
          <Image
            src={liveContentUrl}
            alt={item.fileName || (isVid ? "Video" : "Photo")}
            width={item.width}
            height={item.height}
            className={`h-full w-full object-cover transition-opacity duration-500 ${
              loading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setLoading(false)}
            onError={() => {
              setLoading(false);
              setError(true);
            }}
          />
        )}

        {/* Play icon overlay for videos */}
        {isVid && !loading && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <Play className="w-12 h-12 text-white drop-shadow-lg" />
          </div>
        )}
      </>
    </div>
  );
};

export default React.memo(MediaContent);
