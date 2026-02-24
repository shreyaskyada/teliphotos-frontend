import { useMemo } from "react";
import type { RenderItem } from "./types";

interface MasonryColumn {
  items: (RenderItem & { originalIndex: number })[];
  totalHeight: number;
}

interface MasonryLayoutOptions {
  columnCount: number;
  gap: number;
  containerWidth: number;
  maxItemHeight?: number;
  minItemHeight?: number;
}

export const useMasonryLayout = (
  items: RenderItem[],
  options: MasonryLayoutOptions
) => {
  const {
    columnCount,
    gap,
    containerWidth,
    maxItemHeight = 600, // Default max height
    minItemHeight = 100, // Default min height
  } = options;

  const masonryData = useMemo(() => {
    if (!items.length || columnCount <= 0) {
      return {
        columns: [],
        totalHeight: 0,
        columnWidth: containerWidth / Math.max(columnCount, 1),
      };
    }

    // Calculate column width accounting for gaps
    const totalGapWidth = (columnCount - 1) * gap;
    const columnWidth = (containerWidth - totalGapWidth) / columnCount;

    // Initialize columns
    const columns: MasonryColumn[] = Array.from(
      { length: columnCount },
      () => ({
        items: [],
        totalHeight: 0,
      })
    );

    // Process items in order to maintain sequence
    items.forEach((item, index) => {
      // Calculate aspect ratio and item height
      const aspectRatio =
        item.width && item.height ? item.width / item.height : 1;
      let itemHeight = columnWidth / aspectRatio;

      // Apply height constraints to prevent images from being too large or too small
      itemHeight = Math.max(minItemHeight, Math.min(maxItemHeight, itemHeight));

      // Find the column with the smallest total height
      const shortestColumnIndex = columns.reduce(
        (minIndex, column, currentIndex) => {
          return column.totalHeight < columns[minIndex].totalHeight
            ? currentIndex
            : minIndex;
        },
        0
      );

      // Add item to the shortest column
      const targetColumn = columns[shortestColumnIndex];
      targetColumn.items.push({
        ...item,
        originalIndex: index,
      });

      // Update column height (add gap if not the first item)
      targetColumn.totalHeight +=
        itemHeight + (targetColumn.items.length > 1 ? gap : 0);
    });

    // Calculate total layout height
    const totalHeight = Math.max(...columns.map((col) => col.totalHeight));

    return {
      columns,
      totalHeight,
      columnWidth,
    };
  }, [items, columnCount, gap, containerWidth, maxItemHeight, minItemHeight]);

  return masonryData;
};

// Hook to get responsive column count based on screen width
export const useResponsiveColumns = (containerWidth: number) => {
  return useMemo(() => {
    if (containerWidth >= 1536) return 6; // 2xl
    if (containerWidth >= 1280) return 5; // xl
    if (containerWidth >= 1024) return 4; // lg
    if (containerWidth >= 640) return 3; // sm
    return 2; // default
  }, [containerWidth]);
};
