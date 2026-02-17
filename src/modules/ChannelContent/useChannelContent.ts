"use client";

import { useDeleteMedia, useGetChannelContent } from "@teliphotos/services";
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

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { channelId } = useParams();

  const { mutate: deleteMediaMutation, isPending: isDeleting } =
    useDeleteMedia();

  const { data: messages, refetch: refetchMessages } = useGetChannelContent(
    channelId as string
  );

  const liveContentUrls: { [key: number]: string } = useLiveChannelContent(
    messages?.pagination?.batchId as string,
    channelId as string
  );

  const items: RenderItem[] = useMemo(() => {
    return (messages?.media || [])
      .map((msg: any) => {
        const mid = msg?.id ?? Math.random();
        const media = msg?.media;

        // Handle only photos
        const isPhoto = media && media.className === "MessageMediaPhoto";

        if (!isPhoto) return undefined;

        const imageURL = getPhotoVideoThumbnailURL(channelId as string, msg.id);

        if (isPhoto) {
          const photo = media.photo;
          if (!photo) return undefined;

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
        }

        return undefined;
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

  const deselectAll = () => {
    setSelectedItems(new Set());
  };

  const isSelectionMode = selectedItems.size;

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDialogConfirm = () => {
    deleteMediaMutation(
      {
        channelId: channelId as string,
        messageIds: Array.from(selectedItems) as string[],
      },
      {
        onSuccess: () => {
          setIsDialogOpen(false);
          refetchMessages();
          deselectAll();
        },
        onError: (error: Error) => {
          console.error("Failed to delete media:", error);
        },
      }
    );
  };

  const handleTrashClick = () => {
    setIsDialogOpen(true);
  };

  return {
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
    deselectAll,
    isSelectionMode,
    channel: messages?.channel,
    isDialogOpen,
    handleDialogClose,
    handleDialogConfirm,
    handleTrashClick,
    isDeleting,
  } as const;
};
