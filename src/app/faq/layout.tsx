import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Got questions? Find answers about Telephotos storage limits, privacy, image compression, and how it uses the Telegram API.',
  openGraph: {
    title: 'Frequently Asked Questions',
    description: 'Got questions? Find answers about Telephotos storage limits, privacy, image compression, and how it uses the Telegram API.',
    url: 'https://telephotos.app/faq',
  },
  alternates: {
    canonical: 'https://telephotos.app/faq',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
