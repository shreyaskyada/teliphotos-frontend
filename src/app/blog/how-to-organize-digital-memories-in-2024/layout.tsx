import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to Organize Digital Memories in 2024',
  description: 'If your camera roll has become an infinite scroll of screenshots, memes, and thousands of unorganized vacation photos, you\'re not alone. Managing digital assets...',
  openGraph: {
    images: [{ url: '/api/og?title=How%20to%20Organize%20Digital%20Memories%20in%202024', width: 1200, height: 630, alt: 'How to Organize Digital Memories in 2024' }],
    title: 'How to Organize Digital Memories in 2024',
    description: 'If your camera roll has become an infinite scroll of screenshots, memes, and thousands of unorganized vacation photos, you\'re not alone. Managing digital assets...',
    url: 'https://telephotos.app/blog/how-to-organize-digital-memories-in-2024',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Organize Digital Memories in 2024',
    images: ['/api/og?title=How%20to%20Organize%20Digital%20Memories%20in%202024'],
  },
  alternates: {
    canonical: 'https://telephotos.app/blog/how-to-organize-digital-memories-in-2024',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
