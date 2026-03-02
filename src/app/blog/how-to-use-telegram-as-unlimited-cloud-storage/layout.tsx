import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to Use Telegram as Unlimited Cloud Storage in 2024',
  description: 'In 2024, our digital lives are larger than ever. We take hundreds of high-resolution photos, record 4K videos, and accumulate documents rapidly. Consequently, w...',
  openGraph: {
    title: 'How to Use Telegram as Unlimited Cloud Storage in 2024',
    description: 'In 2024, our digital lives are larger than ever. We take hundreds of high-resolution photos, record 4K videos, and accumulate documents rapidly. Consequently, w...',
    url: 'https://telephotos.app/blog/how-to-use-telegram-as-unlimited-cloud-storage',
    type: 'article',
  },
  alternates: {
    canonical: 'https://telephotos.app/blog/how-to-use-telegram-as-unlimited-cloud-storage',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
