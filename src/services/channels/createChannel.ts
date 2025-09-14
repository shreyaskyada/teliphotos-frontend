"use server";

import axiosInstance from "@teliphotos/axios/axiosInstance";

export interface CreateChannelRequest {
  name: string;
  description?: string;
  photo?: File;
}

export interface CreateChannelResponse {
  success: boolean;
  data: {
    channel: {
      id: string;
      title: string;
      description?: string;
      photo?: string;
      createdAt: string;
    };
  };
  message: string;
}

export const createChannel = async (
  data: CreateChannelRequest
): Promise<CreateChannelResponse> => {
  try {
    const formData = new FormData();
    formData.append("name", data.name);

    if (data.description) {
      formData.append("description", data.description);
    }

    if (data.photo) {
      formData.append("photo", data.photo);
    }

    const response = await axiosInstance.post("/channels", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

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
