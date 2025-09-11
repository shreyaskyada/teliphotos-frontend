export type Message = any;

export interface ChannelContentProps {
  messages: Message[];
}

export type RenderItem = {
  id: string | number;
  kind: "photo" | "video";
  width: number;
  height: number;
  durationSec?: number;
  fileName?: string;
  sizeBytes?: number | string;
  thumbSrc?: string;
  messageId: string;
  imageURL?: string;
};
