import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the Telephotos team. We are here to help you ditch iCloud limits and reclaim your digital memories.',
  openGraph: {
    title: 'Contact Us',
    description: 'Get in touch with the Telephotos team. We are here to help you ditch iCloud limits and reclaim your digital memories.',
    url: 'https://telephotos.app/contact',
  },
  alternates: {
    canonical: 'https://telephotos.app/contact',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
