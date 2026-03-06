import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Read our Privacy Policy to understand how Telephotos operates with a strict Zero Host policy and protects your personal data.',
  openGraph: {
    images: [{ url: '/api/og?title=Privacy%20Policy', width: 1200, height: 630, alt: 'Privacy Policy' }],
    title: 'Privacy Policy',
    description: 'Read our Privacy Policy to understand how Telephotos operates with a strict Zero Host policy and protects your personal data.',
    url: 'https://telephotos.app/privacy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy',
    images: ['/api/og?title=Privacy%20Policy'],
  },
  alternates: {
    canonical: 'https://telephotos.app/privacy',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
