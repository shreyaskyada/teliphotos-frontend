import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Secure Photo Sharing with Friends and Family',
  description: 'Sharing high-quality photos from events, weddings, or vacations with friends is usually a pain. Email has tiny attachment limits. WhatsApp heavily compresses yo...',
  openGraph: {
    images: [{ url: '/api/og?title=Secure%20Photo%20Sharing%20with%20Friends%20and%20Family', width: 1200, height: 630, alt: 'Secure Photo Sharing with Friends and Family' }],
    title: 'Secure Photo Sharing with Friends and Family',
    description: 'Sharing high-quality photos from events, weddings, or vacations with friends is usually a pain. Email has tiny attachment limits. WhatsApp heavily compresses yo...',
    url: 'https://telephotos.app/blog/secure-photo-sharing-with-friends-and-family',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Secure Photo Sharing with Friends and Family',
    images: ['/api/og?title=Secure%20Photo%20Sharing%20with%20Friends%20and%20Family'],
  },
  alternates: {
    canonical: 'https://telephotos.app/blog/secure-photo-sharing-with-friends-and-family',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
