"use client";

import { useQueryClient } from "@tanstack/react-query";
import clientAxiosInstance from "@teliphotos/axios/clientAxiosInstance";
import { CONFIG } from "@teliphotos/utils/config";
import { isCancel } from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Upload, X } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { io } from "socket.io-client";

interface UploadFile {
  file: File;
  preview: string;
  progress: number;
  stage: "uploading" | "telegram" | "done" | "error";
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

  const handleDrop = async (acceptedFiles: File[]) => {
    if (!socket) {
      socket = io(CONFIG.BASE_BACKEND_URL, { transports: ["websocket"] });
    }
    socket.emit("join", channelId);

    socket.on("upload-status", (job: any) => {
      setFiles((prev) =>
        prev.map((p) =>
          job.filename === p.file.name
            ? { ...p, stage: "done", progress: 100 }
            : p
        )
      );
      queryClient.invalidateQueries({
        queryKey: ["channelContent", STATIC_CHANNEL_ID],
      });
    });

    const mapped: UploadFile[] = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      progress: 0,
      stage: "uploading",
      controller: new AbortController(),
    }));
    setFiles((prev) => [...prev, ...mapped]);

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
        prev.map((p) =>
          p.file === f.file ? { ...p, stage: "telegram", progress: 100 } : p
        )
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
    accept: { "image/*": [], "video/*": [] },
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
                  ) : (
                    <Image
                      src={f.preview}
                      alt={f.file.name}
                      width={64}
                      height={64}
                      className="w-16 h-16 object-cover rounded-md"
                    />
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

                      {f.stage === "telegram" && (
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
