"use client";

import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createChannel,
  CreateChannelRequest,
  CreateChannelResponse,
} from "./createChannel";

// ------------------
// React Query Hook
// ------------------
const useCreateChannel = (): UseMutationResult<
  CreateChannelResponse,
  Error,
  CreateChannelRequest
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createChannel,
    onSuccess: () => {
      // Invalidate and refetch private channels after successful creation
      queryClient.invalidateQueries({ queryKey: ["privateChannels"] });
    },
  });
};

export default useCreateChannel;
