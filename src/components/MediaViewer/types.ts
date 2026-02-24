export type MediaItem = {
  id: string | number;
  kind: "photo" | "video";
  lowResUrl: string | undefined;
  messageId: string;
  width?: number;
  height?: number;
  durationSec?: number;
  fileName?: string;
  sizeBytes?: number | string;
  createdAt?: number;
  fileSize?: string;
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
  onDownload?: (item: MediaItem) => void;
  onShare?: (item: MediaItem) => void;
  onDelete?: (item: MediaItem) => void;
};

export type ZoomState = {
  scale: number;
  translateX: number;
  translateY: number;
  isZooming: boolean;
};

export type GestureState = {
  startX: number;
  startY: number;
  lastX: number;
  lastY: number;
  isDragging: boolean;
  isZooming: boolean;
  initialDistance: number;
  initialScale: number;
};
