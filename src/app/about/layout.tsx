import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about the mission behind Telephotos and why we built an unlimited, private photo gallery alternative powered by Telegram.',
  openGraph: {
    title: 'About Us',
    description: 'Learn about the mission behind Telephotos and why we built an unlimited, private photo gallery alternative powered by Telegram.',
    url: 'https://telephotos.app/about',
  },
  alternates: {
    canonical: 'https://telephotos.app/about',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
