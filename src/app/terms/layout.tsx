import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Review the Terms of Service for using Telephotos, the unlimited telegram-based cloud photo gallery.',
  openGraph: {
    title: 'Terms of Service',
    description: 'Review the Terms of Service for using Telephotos, the unlimited telegram-based cloud photo gallery.',
    url: 'https://telephotos.app/terms',
  },
  alternates: {
    canonical: 'https://telephotos.app/terms',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
