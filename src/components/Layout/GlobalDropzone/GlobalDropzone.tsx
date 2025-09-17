"use client";

import clientAxiosInstance from "@teliphotos/axios/clientAxiosInstance"; // adjust import path if needed
import { isCancel } from "axios"; // Import isCancel from axios
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface UploadFile {
  file: File;
  preview: string;
  progress: number;
  stage: "uploading" | "telegram" | "done" | "error";
  controller?: AbortController; // for cancel
}

export default function GlobalUploader() {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [dragging, setDragging] = useState(false);

  const STATIC_CHANNEL_ID = "3051513397"; // TODO: dynamic later

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      (file) => file.type.startsWith("image/") || file.type.startsWith("video/")
    );

    const mapped: UploadFile[] = droppedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      progress: 0,
      stage: "uploading",
      controller: new AbortController(),
    }));

    setFiles((prev) => [...prev, ...mapped]);

    // start uploading each file
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

      // BE done → mark as telegram stage (you can extend with WebSocket later)
      setFiles((prev) =>
        prev.map((p) =>
          p.file === f.file ? { ...p, stage: "done", progress: 100 } : p
        )
      );
    } catch (err) {
      if (isCancel(err)) {
        // Use isCancel directly
        console.log("Upload cancelled:", f.file.name);
      }
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

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className="w-full h-full fixed"
    >
      {/* Drag overlay */}
      <AnimatePresence>
        {dragging && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-white text-2xl font-semibold">
              Drop photos & videos to upload
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating upload dock */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            className="fixed bottom-4 right-4 bg-neutral-900/95 backdrop-blur-lg shadow-xl rounded-2xl p-4 w-[360px] max-h-[50vh] overflow-y-auto z-40"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-white font-medium">Uploading</span>
              <X
                className="text-gray-400 cursor-pointer hover:text-white"
                onClick={() => setFiles([])}
              />
            </div>
            <div className="space-y-3">
              {files.map((f, i) => (
                <div
                  key={i}
                  className="relative flex items-center gap-3 bg-neutral-800 rounded-lg p-2"
                >
                  {/* Show image or video */}
                  {f.file.type.startsWith("video/") ? (
                    <video
                      src={f.preview}
                      className="w-14 h-14 object-cover rounded-md"
                      muted
                      loop
                      autoPlay
                    />
                  ) : (
                    <Image
                      src={f.preview}
                      alt={f.file.name}
                      width={56}
                      height={56}
                      className="w-14 h-14 object-cover rounded-md"
                    />
                  )}

                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate max-w-[160px]">
                      {f.file.name}
                    </p>

                    {/* Progress bar */}
                    <div className="w-full bg-neutral-700 h-2 rounded-full overflow-hidden mt-1">
                      <motion.div
                        className={`h-2 ${
                          f.stage === "error"
                            ? "bg-red-500"
                            : "bg-gradient-to-r from-purple-400 to-blue-500"
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${f.progress}%` }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  </div>

                  {/* Right controls */}
                  <div className="flex items-center gap-2">
                    {f.stage === "done" ? (
                      <></>
                    ) : f.stage === "error" ? (
                      <span className="text-red-400 text-xs">Error</span>
                    ) : (
                      <span className="text-gray-400 text-xs">
                        {f.progress}%
                      </span>
                    )}
                    {f.stage !== "done" && (
                      <X
                        className="text-gray-400 w-4 h-4 cursor-pointer hover:text-white"
                        onClick={() => handleCancel(f.file)}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
