import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Read our Privacy Policy to understand how Telephotos operates with a strict Zero Host policy and protects your personal data.',
  openGraph: {
    title: 'Privacy Policy',
    description: 'Read our Privacy Policy to understand how Telephotos operates with a strict Zero Host policy and protects your personal data.',
    url: 'https://telephotos.app/privacy',
  },
  alternates: {
    canonical: 'https://telephotos.app/privacy',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
