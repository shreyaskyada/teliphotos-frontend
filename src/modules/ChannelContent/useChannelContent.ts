"use client";

import { useDeleteMedia, useGetChannelContent } from "@telephotos/services";
import { getPhotoVideoThumbnailURL } from "@telephotos/services/media";
import { useParams } from "next/navigation";
import { useMemo, useRef, useState } from "react";
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

  const { 
    data: messages, 
    refetch: refetchMessages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading
  } = useGetChannelContent(
    channelId as string
  );


  const refetchTimerRef = useRef<NodeJS.Timeout | null>(null);

  const liveContentUrls: { [key: number]: string } = useLiveChannelContent(
    messages?.pagination?.batchId as string,
    channelId as string,
    useMemo(() => (mediaId: number) => {
      // Check if we already have this message (using Number for safe comparison)
      const existingMedia = messages?.media || [];
      const exists = existingMedia.some(m => Number(m.id) === mediaId);
      
      if (!exists) {
        console.log(`[useChannelContent] New media discovery (${mediaId}). Batching refetch...`);
        
        if (refetchTimerRef.current) clearTimeout(refetchTimerRef.current);
        
        refetchTimerRef.current = setTimeout(() => {
          console.log(`[useChannelContent] Flickering prevention: Executing batched refetch.`);
          refetchMessages();
          refetchTimerRef.current = null;
        }, 1500); 
      }
    }, [messages?.media, refetchMessages])
  );

  const itemCacheRef = useRef<Map<string, RenderItem>>(new Map());

  const items: RenderItem[] = useMemo(() => {
    const rawMedia = messages?.media || [];
    const result: RenderItem[] = [];
    const seenIds = new Set<string>();

    for (const msg of rawMedia) {
      if (!msg || !msg.id) continue;
      
      const messageId = String(msg.id);
      if (seenIds.has(messageId)) continue;
      seenIds.add(messageId);

      const media = msg?.media as any;
      if (!media) continue;

      // Robust check for photo media across different possible backend response formats
      const isPhoto = !!(
        media.className === "MessageMediaPhoto" || 
        media.photo || 
        media._ === "messageMediaPhoto" ||
        media.mimeType?.startsWith("image/") ||
        (media.thumbs && media.thumbs.length > 0)
      );

      if (!isPhoto) continue;

      // Extract photo object or default to media itself if flattened
      const photo = media.photo || media;
      
      // Extract sizes/thumbs
      const sizes = (photo.sizes || photo.thumbs || []).filter(
        (s: any) =>
          s.className === "PhotoSize" ||
          s.className === "PhotoSizeProgressive" ||
          s.type === "m" || s.type === "x" || s.type === "y" || s.type === "w"
      );

      // Pick the largest available dimension for layout
      let width = 800;
      let height = 600;

      if (sizes.length > 0) {
        const largestSize = sizes.reduce((prev: any, curr: any) => {
          const prevArea = (prev.w ?? prev.width ?? 0) * (prev.h ?? prev.height ?? 0);
          const currArea = (curr.w ?? curr.width ?? 0) * (curr.h ?? curr.height ?? 0);
          return currArea > prevArea ? curr : prev;
        });
        width = largestSize.w ?? largestSize.width ?? 800;
        height = largestSize.h ?? largestSize.height ?? 600;
      } else if (media.width && media.height) {
        width = media.width;
        height = media.height;
      }

      const imageURL = (msg as any).imageURL || getPhotoVideoThumbnailURL(channelId as string, messageId);

      // Re-use cached item if nothing changed (stable reference prevents re-renders)
      const cached = itemCacheRef.current.get(messageId);
      if (
        cached &&
        cached.width === width &&
        cached.height === height &&
        cached.imageURL === imageURL
      ) {
        result.push(cached);
      } else {
        const newItem: RenderItem = {
          id: String(photo.id || media.id || msg.id),
          kind: "photo",
          width,
          height,
          messageId,
          imageURL,
          date: (msg as any).date ?? 0,
        } as RenderItem & { date: number };
        itemCacheRef.current.set(messageId, newItem);
        result.push(newItem);
      }
    }

    // Sort newest-first by Telegram message send time (Unix timestamp).
    result.sort((a, b) => ((b as any).date ?? 0) - ((a as any).date ?? 0));

    console.log(`[useChannelContent] Rendered ${result.length} items from ${rawMedia.length} raw messages`);
    return result;
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
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } as const;

};
