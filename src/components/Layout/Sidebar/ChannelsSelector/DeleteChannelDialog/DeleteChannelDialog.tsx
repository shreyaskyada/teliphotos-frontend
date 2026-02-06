"use client";

import { Button } from "@teliphotos/ui/Button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTitle,
} from "@teliphotos/ui/Dialog";
import { AlertTriangle } from "lucide-react";
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
      <DialogContent className="sm:max-w-[425px] bg-card border-border">
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-destructive" />
          </div>
          
          <div className="space-y-2 text-center">
            <DialogTitle className="text-xl font-semibold text-foreground">
              Delete Channel?
            </DialogTitle>
            <p className="text-sm text-muted-foreground text-center max-w-[280px]">
              Are you sure you want to delete <span className="font-medium text-foreground">"{channelName}"</span>? This action cannot be undone.
            </p>
          </div>
        </div>

        <DialogFooter className="grid grid-cols-2 gap-3 sm:gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={handleClose}
            disabled={isDeletingChannel}
            className="w-full text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="delete"
            onClick={handleDelete}
            loading={isDeletingChannel}
            className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-full"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteChannelDialog;
