"use client";

import { Skeleton } from "@telephotos/ui";
import { Trash2, X } from "lucide-react";
import { useMemo } from "react";
import MediaViewer from "../../components/MediaViewer/MediaViewer";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { MediaContent } from "./MediaContent";
import type { RenderItem } from "./types";
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
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useChannelContent();

  const { containerRef, containerWidth } = useContainerWidth();
  const targetRowHeight = useResponsiveRowHeight(containerWidth);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 300) {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }
  };

  const { rows } = useJustifiedLayout(items, {
    containerWidth: containerWidth - (containerWidth > 640 ? 68 : 44), // Account for responsive padding + 20px right space
    targetRowHeight,
    maxRowHeight: targetRowHeight * 2.0, // Allow more flexibility upward for better space utilization
    minRowHeight: targetRowHeight * 0.6, // Allow more flexibility downward
    spacing: 2, // Reduced spacing for better space utilization
  });

  const { positionedItems, totalHeight } = useMemo(() => {
    const spacing = 2;
    let currentTop = 0;
    const itemsWithPos: any[] = [];

    rows.forEach((row) => {
      let currentLeft = 0;
      row.items.forEach((item) => {
        itemsWithPos.push({
          ...item,
          top: currentTop,
          left: currentLeft,
        });
        currentLeft += item.displayWidth + spacing;
      });
      currentTop += row.rowHeight + spacing;
    });

    return { positionedItems: itemsWithPos, totalHeight: currentTop };
  }, [rows]);

  // O(1) lookup map for stable item references (avoids .find in render loop)
  const stableItemsMap = useMemo(() => {
    const map = new Map<string, RenderItem>();
    for (const item of items) {
      map.set(item.messageId, item);
    }
    return map;
  }, [items]);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Selection / Header bar */}
      <div className="sticky top-0 z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex-shrink-0">
        <div className="flex items-center justify-between h-7">
          {/* Left side */}
          <div className="flex items-center gap-3">
            {isLoading ? (
              <Skeleton className="h-6 w-48" />
            ) : selectedItems.size > 0 ? (
              <>
                {/* Close / deselect all button */}
                <button
                  type="button"
                  aria-label="Deselect all"
                  onClick={deselectAll}
                  className="flex items-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <X aria-hidden="true" />
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
                  type="button"
                  aria-label="Delete selected items"
                  onClick={() => handleTrashClick()}
                  className="flex items-center text-red-600 hover:text-red-700 dark:text-red-400 rounded-full"
                >
                  <Trash2 aria-hidden="true" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Loading state - Skeleton Grid */}
      {isLoading && (
        <div className="flex-1 px-3 sm:px-6 pr-5 py-4 overflow-auto min-h-0">
          {/* Row 1 - 3 landscape items */}
          <div className="flex gap-0.5 mb-0.5">
            <Skeleton className="h-[180px] sm:h-[220px] flex-[1.4] rounded-none" />
            <Skeleton className="h-[180px] sm:h-[220px] flex-[1.2] rounded-none" style={{ animationDelay: '0.15s' }} />
            <Skeleton className="h-[180px] sm:h-[220px] flex-[1.6] rounded-none" style={{ animationDelay: '0.3s' }} />
          </div>
          {/* Row 2 - 4 mixed items */}
          <div className="flex gap-0.5 mb-0.5">
            <Skeleton className="h-[160px] sm:h-[200px] flex-[1] rounded-none" style={{ animationDelay: '0.1s' }} />
            <Skeleton className="h-[160px] sm:h-[200px] flex-[1.5] rounded-none" style={{ animationDelay: '0.25s' }} />
            <Skeleton className="h-[160px] sm:h-[200px] flex-[0.8] rounded-none" style={{ animationDelay: '0.35s' }} />
            <Skeleton className="h-[160px] sm:h-[200px] flex-[1.3] rounded-none" style={{ animationDelay: '0.45s' }} />
          </div>
          {/* Row 3 - 3 items */}
          <div className="flex gap-0.5 mb-0.5">
            <Skeleton className="h-[190px] sm:h-[240px] flex-[1.6] rounded-none" style={{ animationDelay: '0.2s' }} />
            <Skeleton className="h-[190px] sm:h-[240px] flex-[1] rounded-none" style={{ animationDelay: '0.35s' }} />
            <Skeleton className="h-[190px] sm:h-[240px] flex-[1.3] rounded-none" style={{ animationDelay: '0.5s' }} />
          </div>
          {/* Row 4 - 4 items */}
          <div className="flex gap-0.5 mb-0.5">
            <Skeleton className="h-[150px] sm:h-[180px] flex-[1.2] rounded-none" style={{ animationDelay: '0.15s' }} />
            <Skeleton className="h-[150px] sm:h-[180px] flex-[1.4] rounded-none" style={{ animationDelay: '0.3s' }} />
            <Skeleton className="h-[150px] sm:h-[180px] flex-[1] rounded-none" style={{ animationDelay: '0.4s' }} />
            <Skeleton className="h-[150px] sm:h-[180px] flex-[1.5] rounded-none" style={{ animationDelay: '0.55s' }} />
          </div>
          {/* Row 5 - 3 items (partially visible) */}
          <div className="flex gap-0.5">
            <Skeleton className="h-[170px] sm:h-[210px] flex-[1.3] rounded-none" style={{ animationDelay: '0.25s' }} />
            <Skeleton className="h-[170px] sm:h-[210px] flex-[1.5] rounded-none" style={{ animationDelay: '0.4s' }} />
            <Skeleton className="h-[170px] sm:h-[210px] flex-[1.1] rounded-none" style={{ animationDelay: '0.55s' }} />
          </div>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && items.length === 0 && (

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
            This channel doesn't have any photos yet.
          </p>
        </div>
      )}

      {/* Media grid - Justified Layout (Flattened for performance/flicker-free updates) */}
      {!isLoading && items.length > 0 && (

        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="flex-1 px-3 sm:px-6 pr-5 py-4 overflow-auto min-h-0"
        >
          <div 
            className="relative w-full" 
            style={{ height: totalHeight + (isFetchingNextPage ? 80 : 0) }}
          >
            {positionedItems.map((item) => {
              const isSelected = selectedItems.has(item.messageId);
              // Look up the original stable item reference for MediaContent
              const stableItem = stableItemsMap.get(item.messageId) || item;

              return (
                <div
                  key={item.messageId}
                  className="absolute group overflow-hidden cursor-pointer transition-shadow duration-300 hover:shadow-xl rounded-0"
                  style={{
                    width: item.displayWidth,
                    height: item.displayHeight,
                    top: item.top,
                    left: item.left,
                  }}
                >
                  <div className="relative h-full w-full bg-gray-200 dark:bg-gray-800 rounded-0 overflow-hidden">
                    {/* Selection overlay */}
                    {isSelected && (
                      <div className="absolute inset-0 bg-blue-500/20 z-10 pointer-events-none" />
                    )}

                    {/* Hover shadow effect */}
                    <div
                      className="absolute -inset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-5 pointer-events-none"
                      style={{
                        boxShadow:
                          "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 0, 0, 0.05)",
                      }}
                    />

                    {/* Selection checkbox */}
                    <div
                      className={`absolute top-2 left-2 z-20 transition-opacity duration-200 group-hover:opacity-100 ${
                        isSelected ? "opacity-100" : "opacity-0"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSelection(item.messageId);
                      }}
                    >
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shadow-lg transition-colors duration-200 ${
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
                          toggleSelection(item.messageId);
                        } else {
                          const idx = item.originalIndex;
                          setViewerIndex(idx);
                          setViewerOpen(true);
                        }
                      }}
                    >
                      <MediaContent
                        item={stableItem}
                        liveContentUrl={
                          liveContentUrls[item.messageId as any]
                        }
                        priority={item.originalIndex < 4}
                        displayWidth={Math.round(item.displayWidth)}
                      />
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Loading more indicator */}
            {isFetchingNextPage && (
              <div 
                className="absolute w-full flex justify-center items-center py-8"
                style={{ top: totalHeight }}
              >
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                  <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm font-medium italic">Loading more moments...</span>
                </div>
              </div>
            )}
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
