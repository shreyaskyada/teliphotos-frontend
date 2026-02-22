import {
  useCreateChannel,
  useGetPrivateChannels,
} from "@telephotos/services/channels";
import { useState } from "react";

interface UseChannelSelectorProps {
  selectedChannels: string[];
  toggleChannel: (channelId: string) => void;
}

export const useChannelSelector = ({
  selectedChannels,
  toggleChannel,
}: UseChannelSelectorProps) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { data: channelsData, isLoading, error } = useGetPrivateChannels();
  const createChannelMutation = useCreateChannel();

  // Open create channel modal
  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  // Close create channel modal
  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  // Clear error
  const clearError = () => {
    // Error handling is managed by React Query
  };

  return {
    // State
    channels: channelsData?.channels || [],
    isLoading,
    error: error?.message || null,
    isCreateModalOpen,
    isCreatingChannel: createChannelMutation.isPending,
    selectedChannels,

    // Actions
    toggleChannel,
    openCreateModal,
    closeCreateModal,
    clearError,
  };
};
