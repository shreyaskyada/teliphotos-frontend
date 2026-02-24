import { useDeleteChannel } from "@telephotos/services/channels";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { UseDeleteChannelModalProps } from "./types";

export const useDeleteChannelModal = ({
  onClose,
  channelId,
}: UseDeleteChannelModalProps) => {
  const deleteChannelMutation = useDeleteChannel();
  const router = useRouter();
  const { channelId: currentChannelId } = useParams();

  const isDeletingChannel = deleteChannelMutation.isPending;

  const handleClose = useCallback(() => {
    if (!isDeletingChannel) {
      onClose();
    }
  }, [isDeletingChannel, onClose]);

  const handleDelete = useCallback(async () => {
    try {
      await deleteChannelMutation.mutateAsync(channelId);

      // If we are currently on the deleted channel, redirect to dashboard
      // which will then redirect to the first available channel
      if (currentChannelId === channelId) {
        router.replace("/dashboard");
      }

      // Close the dialog after successful deletion
      onClose();
    } catch (error) {
      console.error("Error deleting channel:", error);
      // The error will be handled by the mutation's onError callback
      // You can add toast notification here if needed
    }
  }, [channelId, onClose, deleteChannelMutation, currentChannelId, router]);


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
