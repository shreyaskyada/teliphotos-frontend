"use client";

import { getPhotoVideoThumbnailURL } from "@teliphotos/services/media";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import type { ChannelContentProps, RenderItem } from "./types";

export const useChannelContent = ({ messages }: ChannelContentProps) => {
  const [selectedItems, setSelectedItems] = useState<Set<string | number>>(
    new Set()
  );
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  const { channelId } = useParams();

  const items: RenderItem[] = useMemo(() => {
    return (messages || [])
      .map((msg: any) => {
        const mid = msg?.id ?? Math.random();
        const media = msg?.media;
        if (!media) return undefined;

        const imageURL = getPhotoVideoThumbnailURL(channelId as string, msg.id);

        // const r2BaseUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_BASE;
        // const imageURL = r2BaseUrl ? `${r2BaseUrl}/${imageKey}` : undefined;

        if (media.className === "MessageMediaPhoto") {
          const doc = media.document;
          // const mime: string | undefined = doc?.mimeType;

          // if (mime && isVideo(mime)) {
          //   const meta = extractVideoMeta(doc);
          //   return {
          //     id: doc?.id ?? mid,
          //     kind: "video" as const,
          //     width: meta.width,
          //     height: meta.height,
          //     durationSec: meta.durationSec,
          //     fileName: meta.fileName,
          //     sizeBytes: doc?.size,
          //     messageId: msg?.id,
          //     imageURL,
          //   };
          // } else if (mime && mime.startsWith("image/")) {
          // }
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
          return undefined;
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
        lowResUrl: it.imageURL,
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
  } as const;
};
