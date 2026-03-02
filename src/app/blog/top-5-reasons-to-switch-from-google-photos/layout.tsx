import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Top 5 Reasons to Switch from Google Photos',
  description: 'In 2021, tech giants changed their unlimited cloud service policies. Google Photos ended its famous "High Quality" tier which provided infinite uploads for coun...',
  openGraph: {
    title: 'Top 5 Reasons to Switch from Google Photos',
    description: 'In 2021, tech giants changed their unlimited cloud service policies. Google Photos ended its famous "High Quality" tier which provided infinite uploads for coun...',
    url: 'https://telephotos.app/blog/top-5-reasons-to-switch-from-google-photos',
    type: 'article',
  },
  alternates: {
    canonical: 'https://telephotos.app/blog/top-5-reasons-to-switch-from-google-photos',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
