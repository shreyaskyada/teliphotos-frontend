"use client";

import { useGetChannelContent } from "@teliphotos/services";
import { getPhotoVideoThumbnailURL } from "@teliphotos/services/media";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import type { RenderItem } from "./types";
import { useLiveChannelContent } from "./useLiveChannelContent";

export const useChannelContent = () => {
  const [selectedItems, setSelectedItems] = useState<Set<string | number>>(
    new Set()
  );
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  const { channelId } = useParams();

  const { data: messages } = useGetChannelContent(channelId as string);

  const liveContentUrls: { [key: number]: string } = useLiveChannelContent(
    messages?.pagination?.batchId as string
  );

  const items: RenderItem[] = useMemo(() => {
    return (messages?.media || [])
      .map((msg: any) => {
        const mid = msg?.id ?? Math.random();
        const media = msg?.media;
        if (!media || media.className !== "MessageMediaPhoto") return undefined;

        const photo = media.photo;
        if (!photo) return undefined;

        const imageURL = getPhotoVideoThumbnailURL(channelId as string, msg.id);

        const sizes = (photo.sizes || []).filter(
          (s: any) =>
            s.className === "PhotoSize" ||
            s.className === "PhotoSizeProgressive"
        );

        if (sizes.length === 0) {
          console.warn("No usable sizes for photo:", photo.id);
          return undefined;
        }

        // Pick the largest by area (fallback safe)
        const largestSize = sizes.reduce((prev: any, curr: any) => {
          const prevArea = (prev.w ?? 0) * (prev.h ?? 0);
          const currArea = (curr.w ?? 0) * (curr.h ?? 0);
          return currArea > prevArea ? curr : prev;
        });

        const width = largestSize?.w ?? 800;
        const height = largestSize?.h ?? 600;

        return {
          id: photo.id ?? mid,
          kind: "photo" as const,
          width,
          height,
          messageId: msg?.id,
          imageURL,
        };
      })
      .filter(Boolean) as RenderItem[];
  }, [messages, channelId]);

  const viewerItems = useMemo(
    () =>
      items.map((it) => ({
        id: it.id,
        kind: it.kind,
        lowResUrl: it.imageURL, // could replace with stripped/base64 preview if available
        messageId: it.messageId,
        width: it.width,
        height: it.height,
      })),
    [items]
  );

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

  const clearSelection = () => setSelectedItems(new Set());

  const shareSelectedItems = () => {
    console.log("Sharing items:", Array.from(selectedItems));
    // Implement sharing logic here
  };

  const moveSelectedItems = () => {
    console.log("Moving items:", Array.from(selectedItems));
    // Implement moving logic here
  };

  const isSelectionMode = selectedItems.size;

  return {
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
    shareSelectedItems,
    moveSelectedItems,
    isSelectionMode,
  } as const;
};
