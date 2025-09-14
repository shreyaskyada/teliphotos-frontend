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
      <DialogContent>
        <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
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
              placeholder="Enter channel name"
              disabled={isCreatingChannel}
              maxLength={50}
              helperText={`${form.watch("name")?.length || 0}/50 characters`}
              rules={{
                required: "Channel name is required",
                minLength: {
                  value: 3,
                  message: "At least 3 characters",
                },
                maxLength: {
                  value: 50,
                  message: "Less than 50 characters",
                },
              }}
            />

            {/* Description */}
            <FormInput<CreateChannelData>
              name="description"
              label="Description (Optional)"
              placeholder="Enter channel description"
              disabled={isCreatingChannel}
              maxLength={200}
              helperText={`${
                form.watch("description")?.length || 0
              }/200 characters`}
              rules={{
                maxLength: {
                  value: 200,
                  message: "Less than 200 characters",
                },
              }}
            />

            <DialogFooter className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isCreatingChannel}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                loading={isCreatingChannel}
                disabled={!form.watch("name")?.trim()}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90"
              >
                Create Channel
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChannelDialog;
