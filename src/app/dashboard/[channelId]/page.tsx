import { ChannelContent } from "@teliphotos/modules";
import { getChannelsContent } from "@teliphotos/services";

export default async function ChannelContentPage({
  params,
}: {
  params: { channelId: string };
}) {
  const { channelId } = await params;

  const res: any = await getChannelsContent(channelId);

  return <ChannelContent messages={res.data.media} />;
}
