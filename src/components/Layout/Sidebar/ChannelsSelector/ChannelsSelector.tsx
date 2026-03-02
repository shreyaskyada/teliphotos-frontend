"use client";

import { Skeleton } from "@telephotos/ui";
import { Lock, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { CreateChannelDialog } from "./CreateChannelDialog";
import { DeleteChannelDialog } from "./DeleteChannelDialog";
import { useChannelSelector } from "./useChannelSelector";

interface ChannelsSelectorProps {
  selectedChannels: string[];
  toggleChannel: (channelId: string) => void;
}

const ChannelsSelector: React.FC<ChannelsSelectorProps> = ({
  toggleChannel,
  selectedChannels,
}) => {
  const {
    channels,
    isLoading,
    error,
    isCreateModalOpen,
    openCreateModal,
    closeCreateModal,
  } = useChannelSelector({
    selectedChannels,
    toggleChannel,
  });

  const [deleteChannelData, setDeleteChannelData] = useState<{
    isOpen: boolean;
    channelId: string;
    channelName: string;
  }>({
    isOpen: false,
    channelId: "",
    channelName: "",
  });

  const openDeleteModal = (channelId: string, channelName: string) => {
    setDeleteChannelData({
      isOpen: true,
      channelId,
      channelName,
    });
  };

  const closeDeleteModal = () => {
    setDeleteChannelData({
      isOpen: false,
      channelId: "",
      channelName: "",
    });
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-2 min-h-0 custom-scrollbar">
      <div className="space-y-1">
        {/* Error State */}
        {error && <div className="text-destructive text-sm p-3">{error}</div>}
        {/* Loading State (Skeletons) */}
        {isLoading &&
          Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={idx}
              className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-full"
            >
              <Skeleton className="w-5 h-5 rounded-full !bg-slate-700/60" style={{ animationDelay: `${idx * 0.1}s` }} />
              <Skeleton className={`h-4 rounded ${idx % 2 === 0 ? 'w-28' : 'w-20'}`} style={{ animationDelay: `${idx * 0.1}s` }} />
            </div>
          ))}
        {/* Channel list */}
        {!isLoading &&
          !error &&
          channels.map((channel) => {
            const isActive = selectedChannels.includes(channel.channelId);
            return (
              <div
                key={channel._id}
                className="w-full flex items-center space-x-3 px-4 py-2 rounded-full transition-all duration-200 group"
              >
                <button
                  type="button"
                  aria-pressed={isActive}
                  aria-label={`Select channel ${channel.title}`}
                  onClick={() => toggleChannel(channel.channelId)}
                  className={`flex items-center space-x-3 flex-1 min-w-0 text-left cursor-pointer rounded-full px-2 py-1 transition-colors ${
                    isActive
                      ? "text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Lock className={`w-4 h-4 shrink-0 ${isActive ? "text-primary" : "text-muted-foreground"}`} aria-hidden="true" />
                  <span className="truncate text-sm">{channel.title}</span>
                </button>

                {/* Actions */}
                <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    aria-label={`Delete channel ${channel.title}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      openDeleteModal(channel.channelId, channel.title);
                    }}
                    className="p-1.5 hover:bg-destructive/10 rounded-full hover:text-destructive transition-colors min-w-[28px] min-h-[28px] flex items-center justify-center"
                  >
                    <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            );
          })}
      </div>

      <button
        type="button"
        aria-label="Create new channel"
        onClick={openCreateModal}
        className="w-full mt-4 flex items-center space-x-3 px-4 py-2.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all duration-200"
      >
        <Plus className="w-5 h-5" aria-hidden="true" />
        <span className="text-sm font-medium">New Channel</span>
      </button>

      {/* Create Channel Dialog */}
      <CreateChannelDialog
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
      />

      {/* Delete Channel Dialog */}
      <DeleteChannelDialog
        isOpen={deleteChannelData.isOpen}
        onClose={closeDeleteModal}
        channelId={deleteChannelData.channelId}
        channelName={deleteChannelData.channelName}
      />
    </div>
  );
};

export default ChannelsSelector;
