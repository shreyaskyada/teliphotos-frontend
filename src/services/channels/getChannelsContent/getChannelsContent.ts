"use server";

import serverAxiosInstance from "@teliphotos/axios/serverAxiosInstance";

export interface ChannelMessage {
  id: number;
  date: number;
  message: string;
  views: number;
  forwards: number;
  media?: {
    id: string;
    mimeType: string;
    size: number;
    fileName?: string;
    duration?: number;
    width?: number;
    height?: number;
    thumbs?: {
      type: string;
      w?: number;
      h?: number;
      size?: number;
    }[];
  };
}

export interface ChannelInfo {
  id: string;
  accessHash: string;
  title: string;
  username?: string | null;
}

export interface GetChannelContentResponse {
  message: string;
  data: {
    channel: ChannelInfo;
    media: ChannelMessage[];
    pagination: {
      limit: string;
      offset: string;
      total: string;
      batchId: string;
    };
  };
}

export const getChannelContent = async (
  channelId: string,
  offset: number = 0
): Promise<GetChannelContentResponse> => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL;

  if (!baseURL) {
    throw new Error("Backend URL is not configured");
  }

  const response = await serverAxiosInstance.get<GetChannelContentResponse>(
    `${baseURL}/channels/${channelId}/content?offset=${offset}`
  );

  return response.data;
};
