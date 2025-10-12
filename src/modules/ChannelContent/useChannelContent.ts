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
    messages?.pagination?.batchId as string
  );

  const items: RenderItem[] = useMemo(() => {
    return (messages?.media || [])
      .map((msg: any) => {
        const mid = msg?.id ?? Math.random();
        const media = msg?.media;

        // Handle both photos and videos
        const isPhoto = media && media.className === "MessageMediaPhoto";
        const isVideo =
          media &&
          media.className === "MessageMediaDocument" &&
          media.document?.mimeType?.startsWith("video/");

        if (!isPhoto && !isVideo) return undefined;

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
        } else if (isVideo) {
          // Handle video media from MessageMediaDocument
          const document = media.document;
          if (!document) return undefined;

          // Get video dimensions from DocumentAttributeVideo
          const videoAttr = document.attributes?.find(
            (attr: any) => attr.className === "DocumentAttributeVideo"
          );

          let width = videoAttr?.w ?? 800;
          let height = videoAttr?.h ?? 600;
          const durationSec = videoAttr?.duration;

          // Ensure video dimensions are reasonable for layout
          if (width && height) {
            const aspectRatio = width / height;
            // Limit extreme aspect ratios that could break layout
            if (aspectRatio > 4) {
              width = height * 4; // Max 4:1 ratio
            } else if (aspectRatio < 0.25) {
              height = width * 4; // Min 1:4 ratio
            }
          }

          // Get filename from DocumentAttributeFilename
          const filenameAttr = document.attributes?.find(
            (attr: any) => attr.className === "DocumentAttributeFilename"
          );
          const fileName = filenameAttr?.fileName;

          return {
            id: document.id ?? mid,
            kind: "video" as const,
            width,
            height,
            durationSec,
            messageId: msg?.id,
            imageURL,
            fileName,
            sizeBytes: document.size,
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
