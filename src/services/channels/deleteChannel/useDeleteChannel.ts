"use client";

import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteChannel, DeleteChannelResponse } from "./deleteChannel";

// ------------------
// React Query Hook
// ------------------
const useDeleteChannel = (): UseMutationResult<
  DeleteChannelResponse,
  Error,
  string
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteChannel,
    onSuccess: async () => {
      // Invalidate and refetch private channels after successful deletion
      await queryClient.invalidateQueries({
        queryKey: ["privateChannels"],
        refetchType: "active", // Refetch active queries immediately
      });

      // Force refetch private channels to ensure UI is updated
      await queryClient.refetchQueries({
        queryKey: ["privateChannels"],
        type: "active",
      });

      // Also invalidate any channel content queries
      queryClient.invalidateQueries({
        queryKey: ["channelContent"],
        refetchType: "active",
      });
    },
    onError: (error) => {
      console.error("Delete channel error:", error);
    },
  });
};

export default useDeleteChannel;
