import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How it Works',
  description: 'Find out how Telephotos transforms your private Telegram channels into a fast, infinite, and secure personal photo gallery in three simple steps.',
  openGraph: {
    title: 'How it Works',
    description: 'Find out how Telephotos transforms your private Telegram channels into a fast, infinite, and secure personal photo gallery in three simple steps.',
    url: 'https://telephotos.app/how-it-works',
  },
  alternates: {
    canonical: 'https://telephotos.app/how-it-works',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
