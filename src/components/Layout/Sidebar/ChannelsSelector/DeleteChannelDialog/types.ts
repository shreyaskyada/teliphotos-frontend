export interface DeleteChannelDialogProps {
  isOpen: boolean;
  onClose: () => void;
  channelId: string;
  channelName: string;
}

export interface UseDeleteChannelModalProps {
  onClose: () => void;
  channelId: string;
}
