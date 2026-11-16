import { RenderItem } from "../types";

export interface MediaContentProps {
  item: RenderItem;
  channelId: string;
  liveContentUrl?: string;
  /** Set true for the first few above-the-fold images to trigger LCP preload */
  priority?: boolean;
}
