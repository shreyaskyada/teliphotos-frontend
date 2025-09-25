import { useCreateChannel } from "@teliphotos/services";
import { useForm } from "react-hook-form";
import { CreateChannelData, UseCreateChannelModal } from "./types";

export const useCreateChannelModal = ({ onClose }: UseCreateChannelModal) => {
  const form = useForm<CreateChannelData>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { mutateAsync: createChannel, isPending: isCreatingChannel } =
    useCreateChannel();

  const handleSubmit = async (data: CreateChannelData) => {
    try {
      await createChannel({
        name: data.name.trim(),
        description: data.description?.trim() || "",
      });

      // queryClient.invalidateQueries({ queryKey: ["privateChannels"] });

      form.reset();
      onClose();
    } catch (error) {
      console.error("Failed to create channel:", error);
    }
  };

  const handleClose = () => {
    onClose();
    if (!isCreatingChannel) {
      form.reset();
    }
  };

  const resetForm = () => {
    form.reset();
  };

  return {
    form,
    handleSubmit,
    handleClose,
    resetForm,
    isCreatingChannel,
  };
};
