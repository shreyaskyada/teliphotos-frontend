export interface CreateChannelDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateChannelData) => Promise<void>;
  isLoading?: boolean;
}

export interface CreateChannelData {
  name: string;
  description?: string;
}

export interface UseCreateChannelModalProps {
  onSubmit: (data: CreateChannelData) => Promise<void>;
  isLoading?: boolean;
}
