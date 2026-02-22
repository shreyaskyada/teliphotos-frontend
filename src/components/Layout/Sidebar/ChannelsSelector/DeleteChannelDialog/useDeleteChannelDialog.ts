import { useDeleteChannel } from "@telephotos/services/channels";
import { useCallback, useEffect } from "react";
import { UseDeleteChannelModalProps } from "./types";

export const useDeleteChannelModal = ({
  onClose,
  channelId,
}: UseDeleteChannelModalProps) => {
  const deleteChannelMutation = useDeleteChannel();

  const isDeletingChannel = deleteChannelMutation.isPending;

  const handleClose = useCallback(() => {
    if (!isDeletingChannel) {
      onClose();
    }
  }, [isDeletingChannel, onClose]);

  const handleDelete = useCallback(async () => {
    try {
      await deleteChannelMutation.mutateAsync(channelId);

      // Close the dialog after successful deletion
      onClose();
    } catch (error) {
      console.error("Error deleting channel:", error);
      // The error will be handled by the mutation's onError callback
      // You can add toast notification here if needed
    }
  }, [channelId, onClose, deleteChannelMutation]);

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
