import Image from "next/image";
import React from "react";
import { MediaContentProps } from "./types";

const MediaContent: React.FC<MediaContentProps> = ({
  item,
  liveContentUrl,
  isVid,
}) => {
  return (
    <>
      {liveContentUrl ? (
        <Image
          src={liveContentUrl}
          alt={item.fileName || (isVid ? "Video" : "Photo")}
          width={item.width}
          height={item.height}
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
          onError={(e) => {
            console.log("❌ Image failed to load:", item.imageURL);
            e.currentTarget.style.display = "none";
            const fallback = e.currentTarget.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = "block";
          }}
        />
      ) : (
        <div className="h-full w-full flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
              {isVid ? (
                <svg
                  className="w-6 h-6 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              )}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {isVid ? "Video" : "Photo"}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(MediaContent);
