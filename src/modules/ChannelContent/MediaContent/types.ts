import { RenderItem } from "../types";

export interface MediaContentProps {
  item: RenderItem;
  liveContentUrl: string;
  /** Set true for the first few above-the-fold images to trigger LCP preload */
  priority?: boolean;
  /** Hint to the browser about the image's display size — used for responsive image selection */
  displayWidth?: number;
}
