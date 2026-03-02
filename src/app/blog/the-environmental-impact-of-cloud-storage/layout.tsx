import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Environmental Impact of Cloud Storage',
  description: 'With digital storage feeling invisible and limitless to the end consumer, it\'s easy to forget that "the cloud" is simply massive physical warehouses filled with...',
  openGraph: {
    title: 'The Environmental Impact of Cloud Storage',
    description: 'With digital storage feeling invisible and limitless to the end consumer, it\'s easy to forget that "the cloud" is simply massive physical warehouses filled with...',
    url: 'https://telephotos.app/blog/the-environmental-impact-of-cloud-storage',
    type: 'article',
  },
  alternates: {
    canonical: 'https://telephotos.app/blog/the-environmental-impact-of-cloud-storage',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
