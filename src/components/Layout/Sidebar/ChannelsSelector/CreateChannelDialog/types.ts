export interface CreateChannelDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface CreateChannelData {
  name: string;
  description?: string;
}

export interface UseCreateChannelModal
  extends Pick<CreateChannelDialogProps, "onClose"> {}
