"use client";

import MediaViewer from "../../components/MediaViewer/MediaViewer";
import { MediaContent } from "./MediaContent";
import { useChannelContent } from "./useChannelContent";

const ChannelContent = () => {
  const {
    items,
    viewerItems,
    selectedItems,
    toggleSelection,
    clearSelection,
    viewerOpen,
    setViewerOpen,
    viewerIndex,
    setViewerIndex,
    channelId,
    liveContentUrls,
  } = useChannelContent();

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
                onClick={() => clearSelection()}
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

              return (
                <div
                  key={`${item.id}-${index}`}
                  className="group mb-2 break-inside-avoid overflow-hidden rounded-lg cursor-pointer transition-all duration-200 hover:shadow-lg"
                  style={{ aspectRatio: `${1 / ratio}` }}
                  onClick={(e) => {
                    if (e.metaKey || e.shiftKey || e.ctrlKey) {
                      toggleSelection(item.id);
                      return;
                    }
                    const idx = index;
                    setViewerIndex(idx);
                    setViewerOpen(true);
                  }}
                >
                  <div className="relative h-full w-full bg-gray-200 dark:bg-gray-800">
                    {/* Selection overlay */}
                    {isSelected && (
                      <div className="absolute inset-0 bg-blue-500/20 z-10" />
                    )}

                    {/* Selection checkbox */}
                    <div
                      className={`absolute top-2 left-2 z-20 transition-opacity duration-200 ${
                        isSelected ? "opacity-100" : "opacity-0"
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
                    <MediaContent
                      item={item}
                      liveContentUrl={liveContentUrls[item.messageId as any]}
                      isVid={isVid}
                    />

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
                        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 opacity-0`}
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
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {viewerOpen && (
        <MediaViewer
          items={viewerItems}
          startIndex={viewerIndex}
          channelId={String(channelId)}
          isOpen={viewerOpen}
          onClose={() => setViewerOpen(false)}
        />
      )}
    </div>
  );
};

export default ChannelContent;
