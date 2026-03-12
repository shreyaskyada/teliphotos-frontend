"use client";

import { useQueryClient } from "@tanstack/react-query";
import clientAxiosInstance from "@telephotos/axios/clientAxiosInstance";
import { CONFIG } from "@telephotos/utils/config";
import { isCancel } from "axios";
import { AnimatePresence, motion } from "framer-motion";

import { AlertCircle, CheckCircle2, ChevronDown, Loader2, Upload, X } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { io } from "socket.io-client";
import { UploadProvider, useUpload } from "./UploadContext";

interface UploadFile {
  id: string;
  file: File;
  preview: string;
  progress: number;
  stage: "uploading" | "telegram" | "done" | "error" | "converting" | "processing" | "rejected" | string;
  controller?: AbortController;
  error?: string;
}

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
  const invalidateTimerRef = useRef<NodeJS.Timeout | null>(null);

  const updateChannelCache = useCallback((newMessages: any[]) => {
    if (!newMessages || newMessages.length === 0) return;

    queryClient.setQueryData(
      ["channelContent", STATIC_CHANNEL_ID],
      (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) return oldData;

        // Get existing media from all pages to check for duplicates
        const allExistingMedia = oldData.pages.flatMap((page: any) => page.data?.media || []);
        const existingIds = new Set(allExistingMedia.map((m: any) => String(m.id)));

        // Only add messages that aren't already in the list
        const messagesToAdd = newMessages.filter(
          (m: any) => m && m.id && !existingIds.has(String(m.id))
        );

        if (messagesToAdd.length === 0) return oldData;

        // Clone the pages and prepend new items to the FIRST page
        const newPages = [...oldData.pages];
        const firstPage = { ...newPages[0] };
        const firstPageData = { ...firstPage.data };
        
        const combinedMedia = [...messagesToAdd, ...(firstPageData.media || [])];
        
        // Ensure newest (highest ID) is always on top within the first page
        combinedMedia.sort((a, b) => Number(b.id) - Number(a.id));

        newPages[0] = {
          ...firstPage,
          data: {
            ...firstPageData,
            media: combinedMedia,
          }
        };

        return {
          ...oldData,
          pages: newPages,
        };
      }
    );
  }, [STATIC_CHANNEL_ID, queryClient]);

  useEffect(() => {
    if (!socket) {
      socket = io(CONFIG.BASE_BACKEND_URL, { transports: ["websocket"] });
    }

    if (STATIC_CHANNEL_ID) {
      socket.emit("join", STATIC_CHANNEL_ID);
    }

    const handleUploadStatus = (jobResponse: any) => {
      let job: any;
      try {
         job = typeof jobResponse === "string" ? JSON.parse(jobResponse) : jobResponse;
      } catch (e) {
        console.error("Failed to parse upload status:", e);
        return;
      }

      console.log(`[GlobalDropzone] Upload status update raw string:`, jobResponse);

      setFiles((prev) => {
        const idx = prev.findIndex((f) => f.file.name === job.filename);
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

      // E2E success handling — only add to cache if it's the final success event
      if (job.status === "telegram_uploaded" && job.is_telegram_uploaded && job.messageInfo) {
        const results = Array.isArray(job.messageInfo) ? job.messageInfo : [job.messageInfo];
        if (results.length > 0) {
          const newMessages = results
            .filter((res: any) => res.messageId)
            .map((res: any) => ({
              _id: res.mediaId || Math.random().toString(),
              channelId: STATIC_CHANNEL_ID,
              messageId: String(res.messageId),
              type: "photo",
              contentType: res.mimeType || "image/jpeg",
              thumbnailUrl: null, // Proactive update doesn't have URLs yet
              originalUrl: null,
              createdAt: new Date().toISOString(),
              lastProcessedAt: new Date().toISOString(),
            }));
          
          if (newMessages.length > 0) {
            console.log(`[GlobalDropzone] Received end-to-end success for ${job.filename}. Adding to cache.`);
            updateChannelCache(newMessages);
          }
        }
      }
    };

    socket.on("upload-status", handleUploadStatus);

    const currentTimer = invalidateTimerRef.current;
    return () => {
      socket.off("upload-status", handleUploadStatus);
      if (currentTimer) {
        clearTimeout(currentTimer);
      }
    };
  }, [STATIC_CHANNEL_ID, updateChannelCache]);

  const handleDrop = async (acceptedFiles: File[], fileRejections: any[]) => {
    const rejectedMapped: UploadFile[] = fileRejections.map(({ file, errors }) => ({
      id: Math.random().toString(36).substring(2, 11),
      file,
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
        preview: isHeic ? "" : URL.createObjectURL(file), // Empty preview for HEIC initially
        progress: 0,
        stage: "uploading",
        controller: new AbortController(),
      };
    });

    setFiles((prev) => [...mapped, ...rejectedMapped, ...prev]);

    // Process HEIC previews in background
    mapped.forEach(async (item) => {
      const isHeic =
        item.file.name.toLowerCase().endsWith(".heic") ||
        item.file.name.toLowerCase().endsWith(".heif");

      if (isHeic) {
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
            prev.map((p) =>
              p.file === item.file ? { ...p, preview: url } : p
            )
          );
        } catch (error) {
          console.error("HEIC conversion failed:", error);
          // Fallback to original file or generic icon could go here
          // For now, let's keep it empty or try raw URL (which might not render)
          setFiles((prev) =>
             prev.map((p) =>
               p.file === item.file ? { ...p, preview: URL.createObjectURL(item.file) } : p
             )
           );
        }
      }
    });

    mapped.forEach((f) => uploadFile(f));
  };

  const uploadFile = async (f: UploadFile) => {
    const formData = new FormData();
    formData.append("file", f.file);

    try {
      const response = await clientAxiosInstance.post(
        `/channels/${STATIC_CHANNEL_ID}/media-upload`,
        formData,
        {
          signal: f.controller?.signal,
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (event) => {
            if (event.total) {
              const progress = Math.round((event.loaded * 100) / event.total);
              setFiles((prev) =>
                prev.map((p) => (p.file === f.file ? { ...p, progress } : p))
              );
            }
          },
        }
      );

      // Proactively update the query cache to include the new items
      const newUploads = response.data?.data;
      if (Array.isArray(newUploads)) {
        // Flatten the array of arrays (sentResults) and extract 'result' objects
        const newMessages = newUploads
          .flat()
          .map((u: any) => u?.result)
          .filter(Boolean);
        
        if (newMessages.length > 0) {
          console.log(`[GlobalDropzone] Proactively adding ${newMessages.length} messages from API response`);
          updateChannelCache(newMessages);
        }
      }

      setFiles((prev) =>
        prev.map((p) => {
          if (p.file !== f.file) return p;
          // If already done or error, don't overwrite with generic done
          if (p.stage === "done" || p.stage === "error") return p;
          // Backend now waits for Telegram upload, so 200 OK means done
          return { ...p, stage: "done", progress: 100 };
        })
      );
    } catch (err) {
      if (isCancel(err)) console.log("Upload cancelled:", f.file.name);
      setFiles((prev) =>
        prev.map((p) => (p.file === f.file ? { ...p, stage: "error" } : p))
      );
    }
  };

  const handleCancel = (file: File) => {
    setFiles((prev) => prev.filter((p) => p.file !== file));
    const f = files.find((p) => p.file === file);
    f?.controller?.abort();
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    noClick: true,
    noKeyboard: true,
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
                  const inProgress = total > done;
                  return (
                    <div className="flex items-center gap-1.5">
                      {inProgress && <Loader2 className="w-3 h-3 text-blue-400 animate-spin" />}
                      <span className={`text-[13px] font-medium px-2 py-0.5 rounded-full ${
                        inProgress 
                          ? 'bg-blue-500/20 text-blue-300' 
                          : 'bg-green-500/20 text-green-400'
                      }`}>
                        {inProgress ? `${done} / ${total}` : `${total} complete`}
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
                  onClick={(e) => { e.stopPropagation(); setFiles([]); }}
                  className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-white/40 hover:text-white"
                  title="Close"
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
                      {files.map((f) => (
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

                        {(f.stage === "telegram" || f.stage === "processing" || f.stage === "converting") && (
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
                          <div className="flex items-center gap-2 text-red-400 text-[11px] font-medium">
                            <span>Failed</span>
                            <button
                              className="text-white/60 hover:text-white underline decoration-white/20 underline-offset-2"
                              onClick={() => uploadFile(f)}
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
                      onClick={() => handleCancel(f.file)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1.5 hover:bg-white/10 rounded-lg transition-all text-white/30 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  </div>

                  {files.every(f => f.stage === 'done') && (
                    <div className="p-4 bg-white/5 border-t border-white/5">
                      <button 
                        onClick={() => setFiles([])}
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
