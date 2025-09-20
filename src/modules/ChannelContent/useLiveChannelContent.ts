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
  batchId: string
): Record<number, string> => {
  const [urls, setUrls] = useState<Record<number, string>>({});
  const urlsRef = useRef<Record<number, string>>({});

  useEffect(() => {
    if (!batchId) return;

    if (!socket) {
      socket = io(CONFIG.BASE_BACKEND_URL, {
        transports: ["websocket"],
      });
    }

    socket.emit("join", batchId);

    socket.on("job-status", (job: LiveMediaUpdate) => {
      // update ref in-place
      urlsRef.current[job.mediaId] = job.url;

      // batch sync to React state (avoids flicker)
      requestAnimationFrame(() => {
        setUrls({ ...urlsRef.current });
      });
    });

    return () => {
      socket?.off("job-status");
    };
  }, [batchId]);

  return urls; // { [mediaId]: url }
};
