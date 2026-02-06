"use client";

import { FormInput } from "@teliphotos/form-components";
import { Button } from "@teliphotos/ui/Button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTitle,
} from "@teliphotos/ui/Dialog";
import { Form } from "@teliphotos/ui/Form";
import { CreateChannelData, CreateChannelDialogProps } from "./types";
import { useCreateChannelModal } from "./useCreateChannelDialog";

const CreateChannelDialog: React.FC<CreateChannelDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const { form, handleSubmit, handleClose, isCreatingChannel } =
    useCreateChannelModal({ onClose });

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] bg-card border-border">
        <DialogTitle className="text-xl font-semibold text-foreground">
          Create New Channel
        </DialogTitle>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="mt-6 space-y-6"
          >
            {/* Channel Name */}
            <FormInput<CreateChannelData>
              name="name"
              label="Channel Name"
              required
              placeholder="e.g. Family Vacation 2024"
              disabled={isCreatingChannel}
              maxLength={50}
              className="bg-muted/50 border-input"
              helperText={`${form.watch("name")?.length || 0}/50 characters`}
            />

            {/* Description */}
            <FormInput<CreateChannelData>
              name="description"
              label="Description (Optional)"
              placeholder="What's this channel for?"
              disabled={isCreatingChannel}
              maxLength={200}
              className="bg-muted/50 border-input"
              helperText={`${
                form.watch("description")?.length || 0
              }/200 characters`}
            />

            <DialogFooter className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={handleClose}
                disabled={isCreatingChannel}
                className="text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                loading={isCreatingChannel}
                disabled={!form.watch("name")?.trim()}
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6"
              >
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChannelDialog;
