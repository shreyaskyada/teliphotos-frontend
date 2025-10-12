import { useMemo } from "react";
import type { RenderItem } from "./types";

interface JustifiedRow {
  items: (RenderItem & {
    originalIndex: number;
    displayWidth: number;
    displayHeight: number;
  })[];
  rowHeight: number;
  totalWidth: number;
}

interface JustifiedLayoutOptions {
  containerWidth: number;
  targetRowHeight: number;
  maxRowHeight: number;
  minRowHeight: number;
  spacing: number;
}

export const useJustifiedLayout = (
  items: RenderItem[],
  options: JustifiedLayoutOptions
) => {
  const {
    containerWidth,
    targetRowHeight = 200,
    maxRowHeight = 300,
    minRowHeight = 150,
    spacing = 4,
  } = options;

  const justifiedData = useMemo(() => {
    if (!items.length || containerWidth <= 0) {
      return {
        rows: [],
        totalHeight: 0,
      };
    }

    const rows: JustifiedRow[] = [];
    let currentRow: (RenderItem & { originalIndex: number })[] = [];
    let currentRowWidth = 0;

    // Process items in chronological order
    items.forEach((item, index) => {
      const aspectRatio =
        item.width && item.height ? item.width / item.height : 1;
      const scaledWidth = targetRowHeight * aspectRatio;

      // Debug logging for videos
      if (item.kind === "video") {
        console.log("Video in layout:", {
          index,
          width: item.width,
          height: item.height,
          aspectRatio,
          scaledWidth,
          messageId: item.messageId,
        });
      }

      // Add item to current row
      currentRow.push({ ...item, originalIndex: index });
      currentRowWidth += scaledWidth + (currentRow.length > 1 ? spacing : 0);

      // Check if we should finalize this row
      const shouldFinalizeRow =
        currentRowWidth >= containerWidth || // Row is full
        index === items.length - 1; // Last item

      if (shouldFinalizeRow) {
        // Calculate the actual row height to fit the container width
        const totalSpacing = (currentRow.length - 1) * spacing;
        const availableWidth = containerWidth - totalSpacing;

        // Calculate what the row height should be to fit perfectly
        const totalAspectRatio = currentRow.reduce((sum, rowItem) => {
          const ratio =
            rowItem.width && rowItem.height
              ? rowItem.width / rowItem.height
              : 1;
          return sum + ratio;
        }, 0);

        let calculatedRowHeight = availableWidth / totalAspectRatio;

        // Apply height constraints with more flexibility for better space utilization
        calculatedRowHeight = Math.max(
          minRowHeight,
          Math.min(maxRowHeight, calculatedRowHeight)
        );

        // Calculate display dimensions for each item in the row
        const rowItems = currentRow.map((rowItem) => {
          const aspectRatio =
            rowItem.width && rowItem.height
              ? rowItem.width / rowItem.height
              : 1;
          const displayWidth = calculatedRowHeight * aspectRatio;
          const displayHeight = calculatedRowHeight;

          return {
            ...rowItem,
            displayWidth,
            displayHeight,
          };
        });

        // Calculate actual total width after sizing
        const actualTotalWidth = rowItems.reduce((sum, rowItem, idx) => {
          return sum + rowItem.displayWidth + (idx > 0 ? spacing : 0);
        }, 0);

        // If the row doesn't fill the container width well, try to adjust height
        const widthRatio = actualTotalWidth / containerWidth;
        let finalRowHeight = calculatedRowHeight;

        if (widthRatio < 0.95 && calculatedRowHeight < maxRowHeight) {
          // If we're using less than 95% of the width, try to increase row height
          const adjustedHeight = Math.min(
            maxRowHeight,
            calculatedRowHeight * (1 / widthRatio)
          );
          if (adjustedHeight > calculatedRowHeight) {
            // Recalculate with the new height
            const newRowItems = currentRow.map((rowItem) => {
              const aspectRatio =
                rowItem.width && rowItem.height
                  ? rowItem.width / rowItem.height
                  : 1;
              const displayWidth = adjustedHeight * aspectRatio;
              const displayHeight = adjustedHeight;

              return {
                ...rowItem,
                displayWidth,
                displayHeight,
              };
            });

            const newActualTotalWidth = newRowItems.reduce(
              (sum, rowItem, idx) => {
                return sum + rowItem.displayWidth + (idx > 0 ? spacing : 0);
              },
              0
            );

            // Only use the adjusted height if it improves width utilization
            if (newActualTotalWidth > actualTotalWidth) {
              finalRowHeight = adjustedHeight;
              rowItems.splice(0, rowItems.length, ...newRowItems);
            }
          }
        }

        rows.push({
          items: rowItems,
          rowHeight: finalRowHeight,
          totalWidth: actualTotalWidth,
        });

        // Reset for next row
        currentRow = [];
        currentRowWidth = 0;
      }
    });

    // Calculate total layout height
    const totalHeight = rows.reduce((sum, row, index) => {
      return sum + row.rowHeight + (index > 0 ? spacing : 0);
    }, 0);

    return {
      rows,
      totalHeight,
    };
  }, [
    items,
    containerWidth,
    targetRowHeight,
    maxRowHeight,
    minRowHeight,
    spacing,
  ]);

  return justifiedData;
};

// Hook to get responsive target row height based on screen size
export const useResponsiveRowHeight = (containerWidth: number) => {
  return useMemo(() => {
    // Increase base heights for better space utilization
    if (containerWidth >= 1536) return 250; // 2xl - larger screens can handle bigger rows
    if (containerWidth >= 1280) return 220; // xl
    if (containerWidth >= 1024) return 200; // lg
    if (containerWidth >= 768) return 180; // md
    if (containerWidth >= 640) return 160; // sm
    return 140; // xs - increased from 120 for better coverage
  }, [containerWidth]);
};
