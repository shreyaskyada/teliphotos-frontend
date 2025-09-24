import { useCallback, useEffect, useState } from "react";
import { UseDeleteChannelModalProps } from "./types";

export const useDeleteChannelModal = ({
  onClose,
  channelId,
}: UseDeleteChannelModalProps) => {
  const [isDeletingChannel, setIsDeletingChannel] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleClose = useCallback(() => {
    if (!isDeletingChannel && !showSuccess) {
      onClose();
    }
  }, [isDeletingChannel, showSuccess, onClose]);

  const handleDelete = useCallback(async () => {
    try {
      setIsDeletingChannel(true);

      // TODO: Add actual delete channel API call here
      // await deleteChannel(channelId);

      // Simulate API call for now
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log(`Successfully deleted channel: ${channelId}`);

      // Show success state briefly
      setShowSuccess(true);

      // Close after showing success
      setTimeout(() => {
        onClose();
        setShowSuccess(false);
      }, 800);
    } catch (error) {
      console.error("Error deleting channel:", error);
      // TODO: Add error toast notification here
    } finally {
      setIsDeletingChannel(false);
    }
  }, [channelId, onClose]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isDeletingChannel) return;

      if (event.key === "Escape") {
        handleClose();
      } else if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
        // Ctrl/Cmd + Enter to delete
        handleDelete();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isDeletingChannel, handleClose, handleDelete]);

  return {
    handleDelete,
    handleClose,
    isDeletingChannel,
  };
};
