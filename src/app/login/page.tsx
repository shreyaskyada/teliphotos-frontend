import { Login } from "@telephotos/modules";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to Telephotos with your Telegram account to access your personal photo gallery.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return <Login />;
}
