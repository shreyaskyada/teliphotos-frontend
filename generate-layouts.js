const fs = require('fs');
const path = require('path');

const seoDetails = {
  'about': {
    title: 'About Us',
    desc: 'Learn about the mission behind Telephotos and why we built an unlimited, private photo gallery alternative powered by Telegram.',
    url: '/about'
  },
  'features': {
    title: 'Features',
    desc: 'Explore the features of Telephotos. Discover unlimited free storage, secure encryption, beautiful gallery layouts, and zero-knowledge privacy.',
    url: '/features'
  },
  'how-it-works': {
    title: 'How it Works',
    desc: 'Find out how Telephotos transforms your private Telegram channels into a fast, infinite, and secure personal photo gallery in three simple steps.',
    url: '/how-it-works'
  },
  'faq': {
    title: 'Frequently Asked Questions',
    desc: 'Got questions? Find answers about Telephotos storage limits, privacy, image compression, and how it uses the Telegram API.',
    url: '/faq'
  },
  'contact': {
    title: 'Contact Us',
    desc: 'Get in touch with the Telephotos team. We are here to help you ditch iCloud limits and reclaim your digital memories.',
    url: '/contact'
  },
  'blog': {
    title: 'Blog',
    desc: 'Read the latest updates, tips on organizing digital memories, and insights into decentralized cloud storage from the Telephotos team.',
    url: '/blog'
  },
  'privacy': {
    title: 'Privacy Policy',
    desc: 'Read our Privacy Policy to understand how Telephotos operates with a strict Zero Host policy and protects your personal data.',
    url: '/privacy'
  },
  'terms': {
    title: 'Terms of Service',
    desc: 'Review the Terms of Service for using Telephotos, the unlimited telegram-based cloud photo gallery.',
    url: '/terms'
  }
};

const appDir = path.join(__dirname, 'src', 'app');

for (const [folderPath, info] of Object.entries(seoDetails)) {
  const pagePath = path.join(appDir, folderPath, 'page.tsx');
  if (!fs.existsSync(pagePath)) {
    console.log(`Skipping ${folderPath} - page.tsx not found`);
    continue;
  }
  
  // 1. Remove metadata from page.tsx
  let pageContent = fs.readFileSync(pagePath, 'utf8');
  const oldMetadata = /export\s+const\s+metadata(.|\n)*?\};?\n/m;
  if (pageContent.includes('export const metadata')) {
    pageContent = pageContent.replace(oldMetadata, '');
    fs.writeFileSync(pagePath, pageContent);
    console.log(`Cleaned metadata from ${folderPath}/page.tsx`);
  }
  
  // 2. Write a layout.tsx with the metadata
  const layoutPath = path.join(appDir, folderPath, 'layout.tsx');
  const layoutContent = `
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '${info.title.replace(/'/g, "\\'")}',
  description: '${info.desc.replace(/'/g, "\\'")}',
  openGraph: {
    title: '${info.title.replace(/'/g, "\\'")}',
    description: '${info.desc.replace(/'/g, "\\'")}',
    url: 'https://telephotos.app${info.url}',
  },
  alternates: {
    canonical: 'https://telephotos.app${info.url}',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
`;
  
  fs.writeFileSync(layoutPath, layoutContent.trim() + '\n');
  console.log(`Created ${folderPath}/layout.tsx`);
}
