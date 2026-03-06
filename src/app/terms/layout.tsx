import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Review the Terms of Service for using Telephotos, the unlimited telegram-based cloud photo gallery.',
  openGraph: {
    images: [{ url: '/api/og?title=Terms%20of%20Service', width: 1200, height: 630, alt: 'Terms of Service' }],
    title: 'Terms of Service',
    description: 'Review the Terms of Service for using Telephotos, the unlimited telegram-based cloud photo gallery.',
    url: 'https://telephotos.app/terms',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service',
    images: ['/api/og?title=Terms%20of%20Service'],
  },
  alternates: {
    canonical: 'https://telephotos.app/terms',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
