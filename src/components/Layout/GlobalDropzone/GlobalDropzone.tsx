"use client";

import { useQueryClient } from "@tanstack/react-query";
import clientAxiosInstance from "@telephotos/axios/clientAxiosInstance";
import { refreshChannelFirstPage } from "@telephotos/services/channels";
import { CONFIG } from "@telephotos/utils/config";
import { isCancel } from "axios";
import { AnimatePresence, motion } from "framer-motion";

import { AlertCircle, CheckCircle2, ChevronDown, Loader2, Upload, X } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { io } from "socket.io-client";
import { UploadProvider, useUpload } from "./UploadContext";

interface UploadFile {
  id: string;
  file: File;
  channelId: string;
  preview: string;
  progress: number;
  stage: "queued" | "uploading" | "telegram" | "done" | "error" | "converting" | "processing" | "rejected" | string;
  controller?: AbortController;
  error?: string;
}

// The backend sends at most 2 files per account to Telegram at once, so 3 in flight
// keeps one file transferring while two are processed — more only piles up on the server
const MAX_PARALLEL_UPLOADS = 3;
// Stages in which a file holds no upload slot
const IDLE_STAGES = ["queued", "done", "error", "rejected"];
// At most one gallery refresh per channel per interval while uploads keep completing
const REFRESH_INTERVAL_MS = 3000;
const MAX_VISIBLE_ROWS = 50;

// Dock ordering: active first, then failures, then what's left to do, then finished
const stagePriority = (stage: string) => {
  if (!IDLE_STAGES.includes(stage)) return 0;
  if (stage === "error") return 1;
  if (stage === "rejected") return 2;
  if (stage === "queued") return 3;
  return 4;
};

let socket: any;

function GlobalUploaderInner({
  children,
}: {
  children: React.ReactNode;
}) {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { channelId } = useParams();
  const queryClient = useQueryClient();
  const STATIC_CHANNEL_ID = channelId as string;
  const { registerInputRef } = useUpload();
  const refreshTimersRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  // Upload responses carry raw Telegram `Updates` objects, not the message shape
  // the content API returns, so refetch the newest page instead of patching the cache.
  // Throttled (not debounced) so a long batch still shows progress in the gallery,
  // and every completion during the wait is picked up by the pending refresh.
  const scheduleChannelRefresh = useCallback((targetChannelId: string) => {
    const timers = refreshTimersRef.current;
    if (timers.has(targetChannelId)) return;
    timers.set(
      targetChannelId,
      setTimeout(() => {
        timers.delete(targetChannelId);
        refreshChannelFirstPage(queryClient, targetChannelId).catch((error) =>
          console.error("Failed to refresh channel content:", error)
        );
      }, REFRESH_INTERVAL_MS)
    );
  }, [queryClient]);

  useEffect(() => {
    if (!socket) {
      socket = io(CONFIG.BASE_BACKEND_URL, { transports: ["websocket"] });
    }

    // The server drops room membership on disconnect, so re-join on every (re)connect
    const joinRoom = () => {
      if (STATIC_CHANNEL_ID) socket.emit("join", STATIC_CHANNEL_ID);
    };
    joinRoom();
    socket.on("connect", joinRoom);

    const handleUploadStatus = (jobResponse: any) => {
      let job: any;
      try {
         job = typeof jobResponse === "string" ? JSON.parse(jobResponse) : jobResponse;
      } catch (e) {
        console.error("Failed to parse upload status:", e);
        return;
      }


      // The socket stays in rooms of previously visited channels, and filenames
      // repeat (e.g. IMG_0001.jpg), so only match an in-flight upload to the same channel
      setFiles((prev) => {
        const idx = prev.findIndex(
          (f) =>
            f.file.name === job.filename &&
            f.channelId === String(job.channelId) &&
            !IDLE_STAGES.includes(f.stage)
        );
        if (idx === -1) return prev;
        const newFiles = [...prev];
        const currentFile = newFiles[idx];
        const newStage = job.stage || currentFile.stage;

        newFiles[idx] = { 
          ...currentFile, 
          // Default to 100% processing when e2e success or status=telegram_uploaded
          progress: job.status === "telegram_uploaded" ? 100 : (job.progress ?? currentFile.progress), 
          stage: newStage,
          error: job.error || currentFile.error 
        };
        return newFiles;
      });

      if (job.status === "telegram_uploaded" && job.is_telegram_uploaded && job.channelId) {
        scheduleChannelRefresh(String(job.channelId));
      }
    };

    socket.on("upload-status", handleUploadStatus);

    return () => {
      socket.off("upload-status", handleUploadStatus);
      socket.off("connect", joinRoom);
    };
  }, [STATIC_CHANNEL_ID, scheduleChannelRefresh]);

  useEffect(() => {
    const timers = refreshTimersRef.current;
    return () => {
      timers.forEach(clearTimeout);
      timers.clear();
    };
  }, []);

  const handleDrop = async (acceptedFiles: File[], fileRejections: any[]) => {
    // No channel is selected on /dashboard, so there is nowhere to upload to
    if (!STATIC_CHANNEL_ID) return;

    const rejectedMapped: UploadFile[] = fileRejections.map(({ file, errors }) => ({
      id: Math.random().toString(36).substring(2, 11),
      file,
      channelId: STATIC_CHANNEL_ID,
      preview: "",
      progress: 0,
      stage: "rejected",
      error: errors[0]?.message || "File type not supported",
    }));

    const mapped: UploadFile[] = acceptedFiles.map((file) => {
      const isHeic =
        file.name.toLowerCase().endsWith(".heic") ||
        file.name.toLowerCase().endsWith(".heif");

      return {
        id: Math.random().toString(36).substring(2, 11),
        file,
        channelId: STATIC_CHANNEL_ID,
        preview: isHeic ? "" : URL.createObjectURL(file), // Empty preview for HEIC initially
        progress: 0,
        // Started by the queue effect below, a few at a time
        stage: "queued",
      };
    });

    setFiles((prev) => [...mapped, ...rejectedMapped, ...prev]);
  };

  // HEIC previews are decoded in the browser, which is heavy — so it's done when a
  // file starts uploading (a few at a time), not for every file in the drop at once
  const loadHeicPreview = async (item: UploadFile) => {
    try {
      const heic2any = (await import("heic2any")).default;
      const result = await heic2any({
        blob: item.file,
        toType: "image/jpeg",
        quality: 0.8,
      });
      const blob = Array.isArray(result) ? result[0] : result;
      const url = URL.createObjectURL(blob);

      setFiles((prev) =>
        prev.map((p) => (p.id === item.id ? { ...p, preview: url } : p))
      );
    } catch (error) {
      console.error("HEIC conversion failed:", error);
      // Fall back to the raw file URL (renders in Safari, blank elsewhere)
      setFiles((prev) =>
        prev.map((p) =>
          p.id === item.id ? { ...p, preview: URL.createObjectURL(item.file) } : p
        )
      );
    }
  };

  // Upload queue: start queued files whenever a slot frees up, instead of
  // sending a whole drop of hundreds of files at once
  useEffect(() => {
    const inFlight = files.filter((f) => !IDLE_STAGES.includes(f.stage)).length;
    const slots = MAX_PARALLEL_UPLOADS - inFlight;
    if (slots <= 0) return;

    // New drops are prepended, so the oldest queued files are at the end
    const toStart = files
      .filter((f) => f.stage === "queued")
      .reverse()
      .slice(0, slots)
      .map((f) => ({ ...f, stage: "uploading", progress: 0, controller: new AbortController() }));
    if (toStart.length === 0) return;

    const startedById = new Map(toStart.map((f) => [f.id, f]));
    setFiles((prev) =>
      prev.map((p) => {
        const started = startedById.get(p.id);
        return started
          ? { ...p, stage: started.stage, progress: 0, controller: started.controller }
          : p;
      })
    );
    toStart.forEach((f) => {
      uploadFile(f);
      if (!f.preview) loadHeicPreview(f);
    });
    // uploadFile/loadHeicPreview only use stable setters and the item passed in
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  const uploadFile = async (f: UploadFile) => {
    const formData = new FormData();
    formData.append("file", f.file);

    // Each attempt has its own controller; ignore results of an older attempt that
    // finishes after the user already retried
    const isThisAttempt = (p: UploadFile) => p.id === f.id && p.controller === f.controller;

    try {
      await clientAxiosInstance.post(
        `/channels/${f.channelId}/media-upload`,
        formData,
        {
          signal: f.controller?.signal,
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (event) => {
            if (event.total) {
              const progress = Math.round((event.loaded * 100) / event.total);
              setFiles((prev) =>
                prev.map((p) => (isThisAttempt(p) ? { ...p, progress } : p))
              );
            }
          },
        }
      );

      // The backend only answers 200 once the photo is saved to Telegram and the
      // gallery (failures come back as 4xx/5xx), so the response is the source of truth
      scheduleChannelRefresh(f.channelId);
      setFiles((prev) =>
        prev.map((p) => (isThisAttempt(p) ? { ...p, stage: "done", progress: 100, error: undefined } : p))
      );
    } catch (err: any) {
      // Cancelled items were already removed from the list
      if (isCancel(err)) return;
      const message =
        err?.response?.data?.message || err?.message || "Upload failed";
      setFiles((prev) =>
        prev.map((p) => (isThisAttempt(p) ? { ...p, stage: "error", error: message } : p))
      );
    }
  };

  const handleRetry = (f: UploadFile) => {
    // A socket error can arrive before the HTTP response — drop that old attempt
    // so it can't overwrite the retry's state
    f.controller?.abort();
    // Back into the queue so retries also respect the upload limit
    setFiles((prev) =>
      prev.map((p) =>
        p.id === f.id
          ? { ...p, progress: 0, stage: "queued", error: undefined, controller: undefined }
          : p
      )
    );
  };

  const handleCancel = (id: string) => {
    const f = files.find((p) => p.id === id);
    f?.controller?.abort();
    if (f?.preview) URL.revokeObjectURL(f.preview);
    setFiles((prev) => prev.filter((p) => p.id !== id));
  };

  const handleClearAll = () => {
    // Abort anything still in flight; queued files are simply dropped
    files.forEach((f) => {
      f.controller?.abort();
      if (f.preview) URL.revokeObjectURL(f.preview);
    });
    setFiles([]);
  };

  // A batch can hold hundreds of files; rendering (and layout-animating) a row for
  // each one would make every progress tick expensive. Show the most relevant ones.
  const visibleFiles = useMemo(
    () =>
      [...files]
        .sort((a, b) => stagePriority(a.stage) - stagePriority(b.stage))
        .slice(0, MAX_VISIBLE_ROWS),
    [files]
  );
  const hiddenCount = files.length - visibleFiles.length;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    noClick: true,
    noKeyboard: true,
    disabled: !STATIC_CHANNEL_ID,
    onDrop: handleDrop,
    accept: {
      "image/*": [],
      "image/heic": [],
      "image/heif": [],
    },
  });

  // Register the file input with the upload context so the Header button can trigger it
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    registerInputRef(fileInputRef.current);
  }, [registerInputRef]);

  return (
    <div {...getRootProps()} className="relative min-h-screen">
      <input {...getInputProps()} ref={fileInputRef} />

      {/* Drag overlay */}
      <AnimatePresence>
        {isDragActive && (
          <motion.div
            className="fixed inset-0 bg-blue-600/90 backdrop-blur-md flex items-center justify-center z-[10000] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-white text-3xl font-bold flex flex-col items-center gap-6">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center shadow-2xl border border-white/30">
                <Upload className="w-12 h-12 text-white" />
              </div>
              <span className="tracking-tight">Drop photos to upload</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload dock */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            className="fixed bottom-4 right-4 left-4 sm:left-auto sm:right-6 sm:bottom-6 sm:w-[380px] bg-neutral-900/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[24px] max-h-[70vh] z-[9999] flex flex-col border border-white/10 overflow-hidden"
            initial={{ y: 100, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.95 }}
          >
            {/* Header */}
            <div 
              className="flex justify-between items-center px-6 py-4 border-b border-white/5 bg-white/5 cursor-pointer select-none"
              onClick={() => setIsCollapsed(c => !c)}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-white font-semibold text-[15px]">Uploading</span>
                {(() => {
                  const total = files.filter(f => f.stage !== 'rejected').length;
                  const done = files.filter(f => f.stage === 'done').length;
                  const failed = files.filter(f => f.stage === 'error').length;
                  const inProgress = total > done + failed;
                  return (
                    <div className="flex items-center gap-1.5">
                      {inProgress && <Loader2 className="w-3 h-3 text-blue-400 animate-spin" />}
                      <span className={`text-[13px] font-medium px-2 py-0.5 rounded-full ${
                        inProgress
                          ? 'bg-blue-500/20 text-blue-300'
                          : failed > 0
                          ? 'bg-red-500/20 text-red-300'
                          : 'bg-green-500/20 text-green-400'
                      }`}>
                        {inProgress
                          ? `${done} / ${total}`
                          : failed > 0
                          ? `${failed} failed`
                          : `${total} complete`}
                      </span>
                    </div>
                  );
                })()}
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => { e.stopPropagation(); setIsCollapsed(c => !c); }}
                  className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-white/40 hover:text-white"
                  title={isCollapsed ? "Expand" : "Collapse"}
                >
                  <motion.div animate={{ rotate: isCollapsed ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); handleClearAll(); }}
                  className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-white/40 hover:text-white"
                  title="Cancel remaining and close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Collapsible body */}
            <AnimatePresence initial={false}>
              {!isCollapsed && (
                <motion.div
                  key="dock-body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  {/* List */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-none max-h-[55vh]">
                    <AnimatePresence initial={false}>
                      {visibleFiles.map((f) => (
                        <motion.div
                          key={f.id}
                          layout
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center gap-3 bg-white/[0.03] hover:bg-white/[0.06] rounded-2xl p-2.5 border border-white/5 transition-colors group relative"
                        >
                    {/* Preview */}
                    <div className="relative w-12 h-12 flex-shrink-0">
                      {f.preview ? (
                        <Image
                          src={f.preview}
                          alt={f.file.name}
                          fill
                          className="object-cover rounded-xl"
                        />
                      ) : f.stage === "rejected" ? (
                        <div className="w-full h-full bg-red-500/10 rounded-xl flex items-center justify-center">
                          <AlertCircle className="w-6 h-6 text-red-500" />
                        </div>
                      ) : (
                        <div className="w-full h-full bg-neutral-800 rounded-xl flex items-center justify-center">
                          <Loader2 className="w-5 h-5 text-gray-500 animate-spin" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 pr-6">
                      <p className="text-[13px] font-medium text-white/90 truncate">
                        {f.file.name}
                      </p>

                      <div className="mt-1.5">
                        {f.stage === "uploading" && (
                          <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden relative">
                            <motion.div
                              className="h-full bg-blue-500"
                              initial={{ width: 0 }}
                              animate={{ width: `${f.progress}%` }}
                            />
                          </div>
                        )}

                        {f.stage === "queued" && (
                          <span className="text-white/40 text-[11px] font-medium">Waiting…</span>
                        )}

                        {/* Any server-side stage (processing, converting, uploading to telegram, …) */}
                        {!IDLE_STAGES.includes(f.stage) && f.stage !== "uploading" && (
                          <div className="flex items-center gap-1.5 text-yellow-500 text-[10px] font-semibold uppercase tracking-wider">
                            <span className="w-1 h-1 rounded-full bg-yellow-500 animate-pulse" />
                            Processing...
                          </div>
                        )}

                        {f.stage === "done" && (
                          <div className="flex items-center gap-1 text-green-400 text-[11px] font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Complete
                          </div>
                        )}

                        {f.stage === "error" && (
                          <div className="flex items-center gap-2 text-red-400 text-[11px] font-medium min-w-0">
                            <span className="truncate" title={f.error}>
                              {f.error ? `Failed: ${f.error}` : "Failed"}
                            </span>
                            <button
                              className="text-white/60 hover:text-white underline decoration-white/20 underline-offset-2"
                              onClick={() => handleRetry(f)}
                            >
                              Retry
                            </button>
                          </div>
                        )}

                        {f.stage === "rejected" && (
                          <span className="text-red-400/80 text-[11px] truncate block">
                            {f.error || "Type error"}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleCancel(f.id)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1.5 hover:bg-white/10 rounded-lg transition-all text-white/30 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                    {hiddenCount > 0 && (
                      <p className="text-center text-white/40 text-[12px] py-1">
                        + {hiddenCount} more
                      </p>
                    )}
                  </div>

                  {files.every(f => f.stage === 'done') && (
                    <div className="p-4 bg-white/5 border-t border-white/5">
                      <button
                        onClick={handleClearAll}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold py-3 rounded-xl shadow-lg transition-all active:scale-[0.98]"
                      >
                        Clear and Close
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-0">
        {children}
      </div>
    </div>
  );
}

export default function GlobalUploader({ children }: { children: React.ReactNode }) {
  return (
    <UploadProvider>
      <GlobalUploaderInner>{children}</GlobalUploaderInner>
    </UploadProvider>
  );
}
