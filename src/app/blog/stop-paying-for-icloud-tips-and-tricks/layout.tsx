import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stop Paying for iCloud: Tips and Tricks',
  description: 'We\'ve all seen the notification: "iCloud Storage is Full. Your iPhone cannot be backed up." At that point, Apple highly encourages you to bump up to the next ti...',
  openGraph: {
    images: [{ url: '/api/og?title=Stop%20Paying%20for%20iCloud%3A%20Tips%20and%20Tricks', width: 1200, height: 630, alt: 'Stop Paying for iCloud: Tips and Tricks' }],
    title: 'Stop Paying for iCloud: Tips and Tricks',
    description: 'We\'ve all seen the notification: "iCloud Storage is Full. Your iPhone cannot be backed up." At that point, Apple highly encourages you to bump up to the next ti...',
    url: 'https://telephotos.app/blog/stop-paying-for-icloud-tips-and-tricks',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stop Paying for iCloud: Tips and Tricks',
    images: ['/api/og?title=Stop%20Paying%20for%20iCloud%3A%20Tips%20and%20Tricks'],
  },
  alternates: {
    canonical: 'https://telephotos.app/blog/stop-paying-for-icloud-tips-and-tricks',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
