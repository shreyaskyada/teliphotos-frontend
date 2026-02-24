import clientAxiosInstance from "@telephotos/axios/clientAxiosInstance";

export const deleteMedia = async (channelId: string, messageIds: string[]) => {
  try {
    const response = await clientAxiosInstance.delete(
      `/channels/${channelId}/messages`,
      {
        data: {
          messageIds,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting media:", error);
    throw error;
  }
};
