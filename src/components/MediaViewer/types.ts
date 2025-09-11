export type MediaItem = {
  id: string | number;
  kind: "photo" | "video";
  lowResUrl: string | undefined;
  messageId: string;
  width?: number;
  height?: number;
};

export type FetchHQUrl = (args: {
  channelId: string | number;
  messageId: string | number;
}) => Promise<string | undefined>;

export type MediaViewerProps = {
  items: MediaItem[];
  startIndex: number;
  channelId: string | number;
  isOpen: boolean;
  onClose: () => void;
};
