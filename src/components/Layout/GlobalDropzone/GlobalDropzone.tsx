"use client";

import { useQueryClient } from "@tanstack/react-query";
import clientAxiosInstance from "@teliphotos/axios/clientAxiosInstance";
import { CONFIG } from "@teliphotos/utils/config";
import { isCancel } from "axios";
import { AnimatePresence, motion } from "framer-motion";

import { CheckCircle2, Loader2, Upload, X } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { io } from "socket.io-client";

interface UploadFile {
  file: File;
  preview: string;
  progress: number;
  stage: "uploading" | "telegram" | "done" | "error" | "converting" | "processing" | string;
  controller?: AbortController;
}

let socket: any;

export default function GlobalUploader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const { channelId } = useParams();
  const queryClient = useQueryClient();
  const STATIC_CHANNEL_ID = channelId as string;
  const invalidateTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!socket) {
      socket = io(CONFIG.BASE_BACKEND_URL, { transports: ["websocket"] });
    }

    if (STATIC_CHANNEL_ID) {
      socket.emit("join", STATIC_CHANNEL_ID);
    }

    const handleUploadStatus = (jobResponse: any) => {
      const job = JSON.parse(jobResponse);

      setFiles((prev) =>
        prev.map((p) =>
          job.filename === p.file.name
            ? {
                ...p,
                stage: job.stage,
                progress: 100,
              }
            : p
        )
      );

      // Only invalidate when an item is actually done, and debounce it
      if (job.stage === "done") {
        if (invalidateTimerRef.current) {
          clearTimeout(invalidateTimerRef.current);
        }
        invalidateTimerRef.current = setTimeout(() => {
          queryClient.invalidateQueries({
            queryKey: ["channelContent", STATIC_CHANNEL_ID],
          });
        }, 500);
      }
    };

    socket.on("upload-status", handleUploadStatus);

    return () => {
      socket.off("upload-status", handleUploadStatus);
      if (invalidateTimerRef.current) {
        clearTimeout(invalidateTimerRef.current);
      }
    };
  }, [STATIC_CHANNEL_ID, queryClient]);

  const handleDrop = async (acceptedFiles: File[]) => {
    // Socket initialization is now handled in useEffect

    const mapped: UploadFile[] = acceptedFiles.map((file) => {
      const isHeic =
        file.name.toLowerCase().endsWith(".heic") ||
        file.name.toLowerCase().endsWith(".heif");

      return {
        file,
        preview: isHeic ? "" : URL.createObjectURL(file), // Empty preview for HEIC initially
        progress: 0,
        stage: "uploading",
        controller: new AbortController(),
      };
    });

    setFiles((prev) => [...prev, ...mapped]);

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
      await clientAxiosInstance.post(
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
      "video/*": [],
      "image/heic": [],
      "image/heif": [],
    },
  });



  return (
    <div {...getRootProps()} className="fixed inset-0 z-[9999]">
      <input {...getInputProps()} />

      {/* Drag overlay */}
      <AnimatePresence>
        {isDragActive && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-white text-2xl font-semibold flex items-center gap-2">
              <Upload className="w-6 h-6" />
              Drop photos & videos to upload
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload dock */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            className="fixed bottom-4 right-4 bg-neutral-900/95 backdrop-blur-md shadow-2xl rounded-2xl p-5 w-[400px] max-h-[60vh] overflow-y-auto z-50"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-white font-bold text-lg">Uploads</span>
              <X
                className="text-gray-400 cursor-pointer hover:text-white"
                onClick={() => setFiles([])}
              />
            </div>

            <div className="space-y-3">
              {files.map((f, i) => (
                <motion.div
                  key={i}
                  layout
                  className="flex items-center gap-3 bg-neutral-800 rounded-lg p-3 relative"
                >
                  {/* Preview */}
                  {f.file.type.startsWith("video/") ? (
                    <video
                      src={f.preview}
                      className="w-16 h-16 object-cover rounded-md"
                      muted
                      loop
                      autoPlay
                    />
                  ) : f.preview ? (
                    <Image
                      src={f.preview}
                      alt={f.file.name}
                      width={64}
                      height={64}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-neutral-700 rounded-md flex items-center justify-center">
                      <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate max-w-[200px]">
                      {f.file.name}
                    </p>



                    {/* Progress or status */}
                    <div className="mt-2">
                      {f.stage === "uploading" && (
                        <div className="w-full bg-neutral-700 h-2 rounded-full overflow-hidden relative">
                          <motion.div
                            className="h-2 bg-gradient-to-r from-purple-400 to-blue-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${f.progress}%` }}
                            transition={{ duration: 0.3 }}
                          />
                          <span className="absolute inset-0 flex items-center justify-center text-[10px] text-white font-medium">
                            Uploading {f.progress}%
                          </span>
                        </div>
                      )}

                      {(f.stage === "telegram" ||
                        f.stage === "processing" ||
                        f.stage === "converting") && (
                        <div className="flex items-center gap-2 text-yellow-400 text-xs">
                          <motion.div
                            className="w-3 h-3 rounded-full bg-yellow-400"
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ repeat: Infinity, duration: 1.2 }}
                          />
                          Sending to Telegram…
                        </div>
                      )}

                      {f.stage === "done" && (
                        <div className="flex items-center gap-1 text-green-400 text-xs">
                          <CheckCircle2 className="w-4 h-4" />
                          Uploaded to Telegram
                        </div>
                      )}

                      {f.stage === "error" && (
                        <div className="flex items-center gap-2 text-red-400 text-xs">
                          ❌ Failed
                          <button
                            className="text-blue-400 hover:underline"
                            onClick={() => uploadFile(f)}
                          >
                            Retry
                          </button>
                        </div>
                      )}
                    </div>
                </div>

                  {/* Cancel button (only if active) */}
                  {f.stage === "uploading" || f.stage === "telegram" ? (
                    <X
                      className="text-gray-400 w-5 h-5 cursor-pointer hover:text-white"
                      onClick={() => handleCancel(f.file)}
                    />
                  ) : null}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </div>
  );
}
