"use client";

import { CONFIG } from "@teliphotos/utils/config";
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
  channelId?: string
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

    if (batchId) socket.emit("join", batchId);
    if (channelId) socket.emit("join", channelId);

    socket.on("job-status", (job: LiveMediaUpdate) => {
      // update ref in-place
      urlsRef.current[job.mediaId] = job.url;

      // batch sync to React state with throttling (one update per frame)
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(() => {
          setUrls({ ...urlsRef.current });
          rafRef.current = null;
        });
      }
    });

    return () => {
      socket?.off("job-status");
    };
  }, [batchId, channelId]);

  return urls; // { [mediaId]: url }
};
