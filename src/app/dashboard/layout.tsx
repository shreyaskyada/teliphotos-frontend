import { Layout } from "@teliphotos/components";
import React from "react";

export default async function LayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
