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
        className="max-w-md rounded-xl p-6 shadow-lg"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/30">
            <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h2>
        </div>

        <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          {message}
        </p>

        <div className="flex justify-end gap-3">
          <Button
            onClick={onClose}
            variant="outline"
            className="rounded-md px-4"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            variant="delete"
            className="rounded-md px-4 bg-red-600 hover:bg-red-700 text-white"
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
