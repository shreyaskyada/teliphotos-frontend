"use client";

import { CONFIG } from "@telephotos/utils/config";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

type LiveMediaUpdate = {
  mediaId: number;
  url: string;
  status: string;
  ts: number;
};

let socket: any;

export const useLiveChannelContent = (
  batchId: string,
  channelId?: string,
  onNewMedia?: (mediaId: number) => void
): Record<number, string> => {
  const [urls, setUrls] = useState<Record<number, string>>({});
  const urlsRef = useRef<Record<number, string>>({});
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!batchId && !channelId) return;

    if (!socket) {
      socket = io(CONFIG.BASE_BACKEND_URL, {
        transports: ["websocket"],
      });
    }

    // Join rooms
    if (batchId) socket.emit("join", batchId);
    if (channelId) socket.emit("join", channelId);

    const handleJobStatus = (job: LiveMediaUpdate) => {
      console.log(`[useLiveChannelContent] Received job-status:`, job);
      
      const mId = Number(job.mediaId);
      if (!mId || !job.url) return;

      // Update ref in-place
      urlsRef.current[mId] = job.url;

      // Notify parent if this is a new media item we might need to fetch metadata for
      if (onNewMedia) {
        onNewMedia(mId);
      }

      // Batch sync to React state with throttling (one update per frame)
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(() => {
          setUrls({ ...urlsRef.current });
          rafRef.current = null;
        });
      }
    };

    socket.on("job-status", handleJobStatus);

    return () => {
      socket.off("job-status", handleJobStatus);
    };
  }, [batchId, channelId, onNewMedia]);

  return urls; 
};
