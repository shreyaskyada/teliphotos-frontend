import { ChannelContent } from "@telephotos/modules";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Gallery",
  description: "Browse and manage your private Telegram photo gallery.",
};

export default async function ChannelContentPage() {
  return <ChannelContent />;
}
