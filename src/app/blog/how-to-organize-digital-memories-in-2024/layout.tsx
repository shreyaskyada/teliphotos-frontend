import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to Organize Digital Memories in 2024',
  description: 'If your camera roll has become an infinite scroll of screenshots, memes, and thousands of unorganized vacation photos, you\'re not alone. Managing digital assets...',
  openGraph: {
    title: 'How to Organize Digital Memories in 2024',
    description: 'If your camera roll has become an infinite scroll of screenshots, memes, and thousands of unorganized vacation photos, you\'re not alone. Managing digital assets...',
    url: 'https://telephotos.app/blog/how-to-organize-digital-memories-in-2024',
    type: 'article',
  },
  alternates: {
    canonical: 'https://telephotos.app/blog/how-to-organize-digital-memories-in-2024',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
