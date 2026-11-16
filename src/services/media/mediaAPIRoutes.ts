export const getPhotoVideoThumbnailURL = (
  channelId: string,
  messageId: string
) =>
  `${process.env.NEXT_PUBLIC_R2_PUBLIC_BASE}/${channelId}/${messageId}_thumb.jpg`;

// Read in the browser only — the stream endpoint authenticates via the ?token= query param
const getAccessToken = (): string => {
  if (typeof document === "undefined") return "";

  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("telephotos_access_token="))
      ?.split("=")[1] ?? ""
  );
};

// Backend endpoint that serves a photo straight from Telegram. Unlike the signed R2
// thumbnail URLs it works when the thumbnail is missing or the signature has expired.
export const getPhotoStreamURL = (channelId: string, messageId: string) =>
  `${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/channels/stream/photos/${channelId}/${messageId}?token=${getAccessToken()}`;

export const getVideoStreamURL = (channelId: string, messageId: string) =>
  `${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/videos/stream/${channelId}/${messageId}?token=${getAccessToken()}`;
