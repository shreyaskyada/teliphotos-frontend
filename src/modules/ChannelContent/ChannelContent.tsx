"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";

// Raw message from backend (Telegram-like). Keep as any and normalize below.
type Message = any;

interface ChannelContentProps {
  messages: Message[];
}

const isVideo = (mime?: string) => (mime ? mime.startsWith("video/") : false);

type RenderItem = {
  id: string | number;
  kind: "photo" | "video";
  width: number;
  height: number;
  durationSec?: number;
  fileName?: string;
  sizeBytes?: number | string;
  thumbSrc?: string;
  messageId: string;
  imageURL?: string;
};

const extractVideoMeta = (document: Record<string, any>) => {
  const attrs: any[] = (document?.attributes as any[]) || [];
  const videoAttr = attrs.find((a) => a.className === "DocumentAttributeVideo");
  return {
    width: videoAttr?.w ?? 800,
    height: videoAttr?.h ?? 600,
    durationSec: videoAttr?.duration ? Number(videoAttr.duration) : undefined,
    fileName: attrs.find((a) => a.className === "DocumentAttributeFilename")
      ?.fileName,
  };
};

const ChannelContent = ({ messages }: ChannelContentProps) => {
  console.log("🚀 ~ ChannelContent ~ messages:", messages);
  const [selectedItems, setSelectedItems] = useState<Set<string | number>>(
    new Set()
  );
  const [hoveredItem, setHoveredItem] = useState<string | number | null>(null);

  const { channelId } = useParams();

  const items: RenderItem[] = useMemo(() => {
    return (messages || [])
      .map((msg: any) => {
        const mid = msg?.id ?? Math.random();
        const media = msg?.media;
        if (!media) return undefined;

        // Generate R2 image URL
        const imageKey = `${channelId}/${msg?.id}_thumb1.jpg`;
        const r2BaseUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_BASE;
        const imageURL = r2BaseUrl ? `${r2BaseUrl}/${imageKey}` : undefined;

        // Media: MessageMediaDocument (both video and photo)
        if (media.className === "MessageMediaDocument") {
          const doc = media.document;
          const mime: string | undefined = doc?.mimeType;

          if (mime && isVideo(mime)) {
            // Video handling
            const meta = extractVideoMeta(doc);
            return {
              id: doc?.id ?? mid,
              kind: "video" as const,
              width: meta.width,
              height: meta.height,
              durationSec: meta.durationSec,
              fileName: meta.fileName,
              sizeBytes: doc?.size,
              messageId: msg?.id,
              imageURL,
            };
          } else if (mime && mime.startsWith("image/")) {
            // Photo handling
            const attrs: any[] = doc?.attributes || [];
            const imageSizeAttr = attrs.find(
              (a) => a.className === "DocumentAttributeImageSize"
            );
            const width = imageSizeAttr?.w ?? 800;
            const height = imageSizeAttr?.h ?? 600;

            return {
              id: doc?.id ?? mid,
              kind: "photo" as const,
              width,
              height,
              messageId: msg?.id,
              imageURL,
            };
          }
          return undefined;
        }
        return undefined;
      })
      .filter(Boolean) as RenderItem[];
  }, [messages]);

  const toggleSelection = (itemId: string | number) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const formatFileSize = (bytes: number | string) => {
    const size = typeof bytes === "string" ? parseInt(bytes) : bytes;
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="w-full h-full">
      {/* Selection bar */}
      {selectedItems.size > 0 && (
        <div className="sticky top-0 z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {selectedItems.size} selected
            </span>
            <div className="flex items-center gap-2">
              <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400">
                Download
              </button>
              <button className="text-sm text-red-600 hover:text-red-700 dark:text-red-400">
                Delete
              </button>
              <button
                onClick={() => setSelectedItems(new Set())}
                className="text-sm text-gray-600 hover:text-gray-700 dark:text-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {items.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full min-h-[60vh]">
          <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-12 h-12 text-gray-400"
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
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            No media found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            This channel doesn't have any photos or videos yet.
          </p>
        </div>
      )}

      {/* Media grid */}
      {items.length > 0 && (
        <div className="w-full px-6 py-4">
          <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 gap-3 [column-fill:_balance]">
            {items.map((item, index) => {
              const ratio =
                item.height && item.width ? item.height / item.width : 3 / 4;
              const isVid = item.kind === "video";
              const isSelected = selectedItems.has(item.id);
              const isHovered = hoveredItem === item.id;

              return (
                <div
                  key={`${item.id}-${index}`}
                  className="group mb-2 break-inside-avoid overflow-hidden rounded-lg cursor-pointer transition-all duration-200 hover:shadow-lg"
                  style={{ aspectRatio: `${1 / ratio}` }}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => toggleSelection(item.id)}
                >
                  <div className="relative h-full w-full bg-gray-200 dark:bg-gray-800">
                    {/* Selection overlay */}
                    {isSelected && (
                      <div className="absolute inset-0 bg-blue-500/20 z-10" />
                    )}

                    {/* Selection checkbox */}
                    <div
                      className={`absolute top-2 left-2 z-20 transition-opacity duration-200 ${
                        isSelected || isHovered ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          isSelected
                            ? "bg-blue-500 border-blue-500"
                            : "bg-white/90 border-white/90"
                        }`}
                      >
                        {isSelected && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    </div>

                    {/* Media content */}
                    {item.imageURL ? (
                      <Image
                        src={item.imageURL}
                        alt={item.fileName || (isVid ? "Video" : "Photo")}
                        width={item.width}
                        height={item.height}
                        className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                        onError={(e) => {
                          console.log(
                            "❌ Image failed to load:",
                            item.imageURL
                          );
                          e.currentTarget.style.display = "none";
                          const fallback = e.currentTarget
                            .nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = "block";
                        }}
                        onLoad={() => {
                          console.log(
                            "✅ Image loaded successfully:",
                            item.imageURL
                          );
                        }}
                      />
                    ) : item.thumbSrc ? (
                      <Image
                        src={item.thumbSrc}
                        alt={item.fileName || (isVid ? "Video" : "Photo")}
                        width={item.width}
                        height={item.height}
                        className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                        onError={(e) => {
                          console.log(
                            "❌ Thumbnail failed to load:",
                            item.thumbSrc
                          );
                          e.currentTarget.style.display = "none";
                          const fallback = e.currentTarget
                            .nextElementSibling as HTMLElement;
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

                    {/* Video duration badge */}
                    {isVid && item.durationSec && (
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                        {Math.floor(item.durationSec / 60)}:
                        {(item.durationSec % 60).toString().padStart(2, "0")}
                      </div>
                    )}

                    {/* Play button for videos */}
                    {isVid && (
                      <div
                        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
                          isHovered ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-white ml-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    )}

                    {/* File info on hover */}
                    {isHovered && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 text-white text-xs">
                        <div className="truncate">
                          {item.fileName || `${item.kind} ${item.id}`}
                        </div>
                        {item.sizeBytes && (
                          <div className="text-gray-300">
                            {formatFileSize(item.sizeBytes)}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChannelContent;
