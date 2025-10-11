"use client";

import { Trash2, X } from "lucide-react";
import MediaViewer from "../../components/MediaViewer/MediaViewer";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { MediaContent } from "./MediaContent";
import { useChannelContent } from "./useChannelContent";
import { useContainerWidth } from "./useContainerWidth";
import {
  useJustifiedLayout,
  useResponsiveRowHeight,
} from "./useJustifiedLayout";

const ChannelContent = () => {
  const {
    items,
    viewerItems,
    selectedItems,
    viewerOpen,
    setViewerOpen,
    viewerIndex,
    setViewerIndex,
    channelId,
    liveContentUrls,
    toggleSelection,
    isSelectionMode,
    channel,
    deselectAll,
    isDialogOpen,
    handleDialogClose,
    handleDialogConfirm,
    handleTrashClick,
    isDeleting,
  } = useChannelContent();

  const { containerRef, containerWidth } = useContainerWidth();
  const targetRowHeight = useResponsiveRowHeight(containerWidth);

  const { rows } = useJustifiedLayout(items, {
    containerWidth: containerWidth - (containerWidth > 640 ? 68 : 44), // Account for responsive padding + 20px right space
    targetRowHeight,
    maxRowHeight: targetRowHeight * 2.0, // Allow more flexibility upward for better space utilization
    minRowHeight: targetRowHeight * 0.6, // Allow more flexibility downward
    spacing: 2, // Reduced spacing for better space utilization
  });

  return (
    <div className="w-full h-full flex flex-col">
      {/* Selection bar */}
      <div className="sticky top-0 z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          {/* Left side */}
          <div className="flex items-center gap-3">
            {selectedItems.size > 0 ? (
              <>
                {/* Close / deselect all button */}
                <button
                  onClick={deselectAll}
                  className="flex items-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <X />
                </button>
                <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {selectedItems.size} selected
                </span>
              </>
            ) : (
              <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {channel?.title}
              </span>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {selectedItems.size > 0 && (
              <>
                {/* Delete button */}
                <button
                  onClick={() => handleTrashClick()}
                  className="flex items-center text-red-600 hover:text-red-700 dark:text-red-400 rounded-full"
                >
                  <Trash2 />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Empty state */}
      {items.length === 0 && (
        <div className="flex flex-col items-center justify-center flex-1">
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

      {/* Media grid - Justified Layout */}
      {items.length > 0 && (
        <div
          ref={containerRef}
          className="flex-1 px-3 sm:px-6 pr-5 py-4 overflow-auto"
        >
          <div className="flex flex-col gap-0.5">
            {rows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="flex gap-0.5"
                style={{ height: row.rowHeight }}
              >
                {row.items.map((item) => {
                  const isVid = item.kind === "video";
                  const isSelected = selectedItems.has(item.messageId);

                  return (
                    <div
                      key={`${item.id}-${item.originalIndex}`}
                      className="group overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-xl rounded-0"
                      style={{
                        width: item.displayWidth,
                        height: item.displayHeight,
                        flexShrink: 0,
                      }}
                    >
                      <div className="relative h-full w-full bg-gray-200 dark:bg-gray-800 rounded-0 overflow-hidden">
                        {/* Selection overlay */}
                        {isSelected && (
                          <div className="absolute inset-0 bg-blue-500/20 z-10 pointer-events-none" />
                        )}

                        {/* Hover shadow effect */}
                        <div
                          className="absolute -inset-2 opacity-0 group-hover:opacity-100 transition-all duration-200 z-5 pointer-events-none"
                          style={{
                            boxShadow:
                              "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 0, 0, 0.05)",
                          }}
                        />

                        {/* Selection checkbox */}
                        <div
                          className={`absolute top-2 left-2 z-20 transition-all duration-200 group-hover:opacity-100 ${
                            isSelected ? "opacity-100" : "opacity-0"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent click from propagating to the media content
                            toggleSelection(item.messageId);
                          }}
                        >
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shadow-lg transition-all duration-200 ${
                              isSelected
                                ? "bg-blue-500 border-blue-500"
                                : "bg-white/95 border-white/95 group-hover:bg-white group-hover:border-white"
                            }`}
                          >
                            {isSelected && (
                              <svg
                                className="w-4 h-4 text-white"
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
                        <div
                          className="h-full cursor-pointer"
                          onClick={() => {
                            if (isSelectionMode) {
                              // In selection mode, always toggle selection (select/deselect)
                              toggleSelection(item.messageId);
                            } else {
                              // Normal mode, open preview
                              const idx = item.originalIndex;
                              setViewerIndex(idx);
                              setViewerOpen(true);
                            }
                          }}
                        >
                          <MediaContent
                            item={item}
                            liveContentUrl={
                              liveContentUrls[item.messageId as any]
                            }
                            isVid={isVid}
                          />
                        </div>

                        {/* Video duration badge */}
                        {isVid && item.durationSec && (
                          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                            {Math.floor(item.durationSec / 60)}:
                            {(item.durationSec % 60)
                              .toString()
                              .padStart(2, "0")}
                          </div>
                        )}

                        {/* Play button for videos */}
                        {isVid && (
                          <div
                            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 opacity-0 group-hover:opacity-100`}
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
            ))}
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

      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        onConfirm={handleDialogConfirm}
        title="Confirmation"
        message="Are you sure you want to delete these items?"
        isLoading={isDeleting}
      />
    </div>
  );
};

export default ChannelContent;
