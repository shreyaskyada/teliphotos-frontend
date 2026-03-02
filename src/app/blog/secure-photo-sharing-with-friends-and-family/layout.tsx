import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Secure Photo Sharing with Friends and Family',
  description: 'Sharing high-quality photos from events, weddings, or vacations with friends is usually a pain. Email has tiny attachment limits. WhatsApp heavily compresses yo...',
  openGraph: {
    title: 'Secure Photo Sharing with Friends and Family',
    description: 'Sharing high-quality photos from events, weddings, or vacations with friends is usually a pain. Email has tiny attachment limits. WhatsApp heavily compresses yo...',
    url: 'https://telephotos.app/blog/secure-photo-sharing-with-friends-and-family',
    type: 'article',
  },
  alternates: {
    canonical: 'https://telephotos.app/blog/secure-photo-sharing-with-friends-and-family',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
