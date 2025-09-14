"use server";

import axiosInstance from "@teliphotos/axios/axiosInstance";

export interface CreateChannelRequest {
  name: string;
  description?: string;
}

export interface CreateChannelResponse {
  success: boolean;
  data: {
    channel: {
      _id: string;
      channelId: string;
      title: string;
      description?: string;
      phoneNumber: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
  };
  message: string;
}

export const createChannel = async (
  data: CreateChannelRequest
): Promise<CreateChannelResponse> => {
  try {
    const response = await axiosInstance.post(
      "/channel",
      {
        channel_name: data.name,
        description: data.description,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Error creating channel:", error);

    // Handle different error types
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else if (error.response?.status === 401) {
      throw new Error("Unauthorized. Please log in again.");
    } else if (error.response?.status === 403) {
      throw new Error("You don't have permission to create channels.");
    } else if (error.response?.status === 409) {
      throw new Error("A channel with this name already exists.");
    } else if (error.response?.status >= 500) {
      throw new Error("Server error. Please try again later.");
    } else {
      throw new Error("Failed to create channel. Please try again.");
    }
  }
};
