"use client";

import { Button } from "@teliphotos/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@teliphotos/ui/Dialog";
import { AlertTriangle, Trash2, X } from "lucide-react";
import { DeleteChannelDialogProps } from "./types";
import { useDeleteChannelModal } from "./useDeleteChannelDialog";

const DeleteChannelDialog: React.FC<DeleteChannelDialogProps> = ({
  isOpen,
  onClose,
  channelId,
  channelName,
}) => {
  const { handleDelete, handleClose, isDeletingChannel } =
    useDeleteChannelModal({ onClose, channelId });

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-sm sm:max-w-md">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-6">
          <div className="w-14 h-14 bg-red-500/20 rounded-full flex items-center justify-center animate-pulse">
            <AlertTriangle className="w-7 h-7 text-red-400" />
          </div>

          <DialogTitle className="text-lg sm:text-xl font-bold">
            Delete Channel
          </DialogTitle>
        </div>

        {/* Warning */}
        <div className="space-y-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg mb-4">
          <p className="text-slate-300 text-sm sm:text-base text-center">
            Are you sure you want to delete the channel
          </p>
          <p className="font-semibold text-base sm:text-lg bg-white/10 text-white px-3 py-2 rounded text-center break-words">
            "{channelName}"
          </p>
          <div className="flex items-start gap-2 mt-3">
            <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs sm:text-sm text-red-300">
              This action cannot be undone. All media in this channel will be
              permanently deleted.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <DialogFooter className="flex flex-col-reverse sm:flex-row gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isDeletingChannel}
            startIcon={<X className="w-4 h-4" />}
            // className="w-full sm:w-auto min-h-[48px] sm:min-h-[44px]"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="delete"
            onClick={handleDelete}
            loading={isDeletingChannel}
            startIcon={
              !isDeletingChannel ? <Trash2 className="w-4 h-4" /> : undefined
            }
            // className="w-full sm:w-auto min-h-[48px] sm:min-h-[44px]"
          >
            {isDeletingChannel ? "Deleting..." : "Delete Channel"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteChannelDialog;
