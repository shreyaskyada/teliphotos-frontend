import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stop Paying for iCloud: Tips and Tricks',
  description: 'We\'ve all seen the notification: "iCloud Storage is Full. Your iPhone cannot be backed up." At that point, Apple highly encourages you to bump up to the next ti...',
  openGraph: {
    title: 'Stop Paying for iCloud: Tips and Tricks',
    description: 'We\'ve all seen the notification: "iCloud Storage is Full. Your iPhone cannot be backed up." At that point, Apple highly encourages you to bump up to the next ti...',
    url: 'https://telephotos.app/blog/stop-paying-for-icloud-tips-and-tricks',
    type: 'article',
  },
  alternates: {
    canonical: 'https://telephotos.app/blog/stop-paying-for-icloud-tips-and-tricks',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
