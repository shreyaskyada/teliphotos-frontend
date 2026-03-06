import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Got questions? Find answers about Telephotos storage limits, privacy, image compression, and how it uses the Telegram API.',
  openGraph: {
    images: [{ url: '/api/og?title=Frequently%20Asked%20Questions', width: 1200, height: 630, alt: 'Frequently Asked Questions' }],
    title: 'Frequently Asked Questions',
    description: 'Got questions? Find answers about Telephotos storage limits, privacy, image compression, and how it uses the Telegram API.',
    url: 'https://telephotos.app/faq',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frequently Asked Questions',
    images: ['/api/og?title=Frequently%20Asked%20Questions'],
  },
  alternates: {
    canonical: 'https://telephotos.app/faq',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
