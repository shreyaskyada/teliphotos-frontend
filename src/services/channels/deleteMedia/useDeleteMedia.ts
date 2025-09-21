import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { deleteMedia } from "./deleteMedia";

interface DeleteMediaVariables {
  channelId: string;
  messageIds: string[];
}

const useDeleteMedia = (): UseMutationResult<
  void,
  Error,
  DeleteMediaVariables
> => {
  return useMutation<void, Error, DeleteMediaVariables>({
    mutationFn: async ({ channelId, messageIds }: DeleteMediaVariables) => {
      await deleteMedia(channelId, messageIds);
    },
    onSuccess: () => {
      console.log("Media deleted successfully");
    },
    onError: (error: Error) => {
      console.error("Failed to delete media:", error);
    },
  });
};

export default useDeleteMedia;
