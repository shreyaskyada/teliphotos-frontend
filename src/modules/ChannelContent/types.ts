export type Message = any;

export interface ChannelContentProps {
  messages: Message[];
}

export type RenderItem = {
  id: string | number;
  kind: "photo" | "video";
  width: number;
  height: number;
  messageId: string;
  imageURL?: string;
};
