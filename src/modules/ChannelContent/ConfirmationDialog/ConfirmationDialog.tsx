import { Button } from "@teliphotos/ui";
import { Dialog, DialogContent, DialogTitle } from "@teliphotos/ui/Dialog";
import { AlertTriangle } from "lucide-react";
import React from "react";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  isLoading?: boolean;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  title = "Delete all media?",
  message = "This action will permanently delete all media files. This cannot be undone.",
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTitle></DialogTitle>
      <DialogContent
        aria-label="Confirmation Dialog"
        className="sm:max-w-[425px] bg-card border-border p-6"
      >
        <div className="flex flex-col items-center gap-4 py-2">
          <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-destructive" />
          </div>
          
          <div className="space-y-2 text-center">
            <h2 className="text-xl font-semibold text-foreground">
              {title}
            </h2>
            <p className="text-sm text-muted-foreground text-center">
              {message}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <Button
            onClick={onClose}
            variant="ghost"
            className="w-full text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            variant="delete"
            className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-full"
            loading={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete All"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
