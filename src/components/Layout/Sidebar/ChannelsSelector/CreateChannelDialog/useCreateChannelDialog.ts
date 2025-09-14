import { useForm } from "react-hook-form";
import { CreateChannelData, UseCreateChannelModalProps } from "./types";

export const useCreateChannelModal = ({
  onSubmit,
  isLoading = false,
}: UseCreateChannelModalProps) => {
  const form = useForm<CreateChannelData>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const handleSubmit = async (data: CreateChannelData) => {
    try {
      await onSubmit({
        name: data.name.trim(),
        description: data.description?.trim() || undefined,
      });
      form.reset();
    } catch (error) {
      console.error("Failed to create channel:", error);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
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
    isLoading,
  };
};
