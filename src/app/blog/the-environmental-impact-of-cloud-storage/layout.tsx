import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Environmental Impact of Cloud Storage',
  description: 'With digital storage feeling invisible and limitless to the end consumer, it\'s easy to forget that "the cloud" is simply massive physical warehouses filled with...',
  openGraph: {
    images: [{ url: '/api/og?title=The%20Environmental%20Impact%20of%20Cloud%20Storage', width: 1200, height: 630, alt: 'The Environmental Impact of Cloud Storage' }],
    title: 'The Environmental Impact of Cloud Storage',
    description: 'With digital storage feeling invisible and limitless to the end consumer, it\'s easy to forget that "the cloud" is simply massive physical warehouses filled with...',
    url: 'https://telephotos.app/blog/the-environmental-impact-of-cloud-storage',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Environmental Impact of Cloud Storage',
    images: ['/api/og?title=The%20Environmental%20Impact%20of%20Cloud%20Storage'],
  },
  alternates: {
    canonical: 'https://telephotos.app/blog/the-environmental-impact-of-cloud-storage',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
