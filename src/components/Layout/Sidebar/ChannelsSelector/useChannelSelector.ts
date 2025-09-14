import {
  createChannel,
  getPrivateChannels,
  PrivateChannel,
} from "@teliphotos/services/channels";
import { useEffect, useState } from "react";
import { CreateChannelData } from "./CreateChannelDialog/types";

interface UseChannelSelectorProps {
  selectedChannels: string[];
  setSelectedChannels: React.Dispatch<React.SetStateAction<string[]>>;
  toggleChannel: (channelId: string) => void;
}

export const useChannelSelector = ({
  selectedChannels,
  setSelectedChannels,
  toggleChannel,
}: UseChannelSelectorProps) => {
  const [channels, setChannels] = useState<PrivateChannel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreatingChannel, setIsCreatingChannel] = useState(false);

  // Fetch channels on mount
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const channelData = await getPrivateChannels();
        setChannels(channelData.data.channels);
      } catch (err) {
        setError("Failed to load channels.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  // Handle channel creation
  const handleCreateChannel = async (data: CreateChannelData) => {
    try {
      setIsCreatingChannel(true);
      await createChannel(data);

      // Refresh the channels list
      const channelData = await getPrivateChannels();
      setChannels(channelData.data.channels);

      // Close modal
      setIsCreateModalOpen(false);

      // Clear any previous errors
      setError(null);
    } catch (err: any) {
      console.error("Failed to create channel:", err);
      setError(err.message || "Failed to create channel. Please try again.");
    } finally {
      setIsCreatingChannel(false);
    }
  };

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
    setError(null);
  };

  return {
    // State
    channels,
    isLoading,
    error,
    isCreateModalOpen,
    isCreatingChannel,
    selectedChannels,

    // Actions
    toggleChannel,
    handleCreateChannel,
    openCreateModal,
    closeCreateModal,
    clearError,
  };
};
