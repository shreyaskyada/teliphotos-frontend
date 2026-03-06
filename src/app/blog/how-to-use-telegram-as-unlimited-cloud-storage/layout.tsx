import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to Use Telegram as Unlimited Cloud Storage in 2024',
  description: 'In 2024, our digital lives are larger than ever. We take hundreds of high-resolution photos, record 4K videos, and accumulate documents rapidly. Consequently, w...',
  openGraph: {
    images: [{ url: '/api/og?title=How%20to%20Use%20Telegram%20as%20Unlimited%20Cloud%20Storage%20in%202024', width: 1200, height: 630, alt: 'How to Use Telegram as Unlimited Cloud Storage in 2024' }],
    title: 'How to Use Telegram as Unlimited Cloud Storage in 2024',
    description: 'In 2024, our digital lives are larger than ever. We take hundreds of high-resolution photos, record 4K videos, and accumulate documents rapidly. Consequently, w...',
    url: 'https://telephotos.app/blog/how-to-use-telegram-as-unlimited-cloud-storage',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Use Telegram as Unlimited Cloud Storage in 2024',
    images: ['/api/og?title=How%20to%20Use%20Telegram%20as%20Unlimited%20Cloud%20Storage%20in%202024'],
  },
  alternates: {
    canonical: 'https://telephotos.app/blog/how-to-use-telegram-as-unlimited-cloud-storage',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
