export const getPhotoVideoThumbnailURL = (
  channelId: string,
  messageId: string
) =>
  `${process.env.NEXT_PUBLIC_R2_PUBLIC_BASE}/${channelId}/${messageId}_thumb1.jpg`;
