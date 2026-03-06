import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the Telephotos team. We are here to help you ditch iCloud limits and reclaim your digital memories.',
  openGraph: {
    images: [{ url: '/api/og?title=Contact%20Us', width: 1200, height: 630, alt: 'Contact Us' }],
    title: 'Contact Us',
    description: 'Get in touch with the Telephotos team. We are here to help you ditch iCloud limits and reclaim your digital memories.',
    url: 'https://telephotos.app/contact',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us',
    images: ['/api/og?title=Contact%20Us'],
  },
  alternates: {
    canonical: 'https://telephotos.app/contact',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
