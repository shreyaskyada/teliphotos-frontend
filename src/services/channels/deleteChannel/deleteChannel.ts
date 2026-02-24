"use client";

import clientAxiosInstance from "@telephotos/axios/clientAxiosInstance";

export interface DeleteChannelRequest {
  channelId: string;
}

export interface DeleteChannelResponse {
  success: boolean;
  message: string;
}

export const deleteChannel = async (
  channelId: string
): Promise<DeleteChannelResponse> => {
  try {
    const response = await clientAxiosInstance.delete(`/channel/${channelId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Error deleting channel:", error);

    // Handle different error types
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else if (error.response?.status === 401) {
      throw new Error("Unauthorized. Please log in again.");
    } else if (error.response?.status === 403) {
      throw new Error("You don't have permission to delete this channel.");
    } else if (error.response?.status === 404) {
      throw new Error("Channel not found.");
    } else if (error.response?.status >= 500) {
      throw new Error("Server error. Please try again later.");
    } else {
      throw new Error("Failed to delete channel. Please try again.");
    }
  }
};
