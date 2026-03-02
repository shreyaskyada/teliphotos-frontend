const fs = require('fs');
const path = require('path');

const seoDetails = {
  'about/page.tsx': {
    title: 'About Us',
    desc: 'Learn about the mission behind Telephotos and why we built an unlimited, private photo gallery alternative powered by Telegram.',
    url: '/about'
  },
  'features/page.tsx': {
    title: 'Features',
    desc: 'Explore the features of Telephotos. Discover unlimited free storage, secure encryption, beautiful gallery layouts, and zero-knowledge privacy.',
    url: '/features'
  },
  'how-it-works/page.tsx': {
    title: 'How it Works',
    desc: 'Find out how Telephotos transforms your private Telegram channels into a fast, infinite, and secure personal photo gallery in three simple steps.',
    url: '/how-it-works'
  },
  'faq/page.tsx': {
    title: 'Frequently Asked Questions',
    desc: 'Got questions? Find answers about Telephotos storage limits, privacy, image compression, and how it uses the Telegram API.',
    url: '/faq'
  },
  'contact/page.tsx': {
    title: 'Contact Us',
    desc: 'Get in touch with the Telephotos team. We are here to help you ditch iCloud limits and reclaim your digital memories.',
    url: '/contact'
  },
  'blog/page.tsx': {
    title: 'Blog',
    desc: 'Read the latest updates, tips on organizing digital memories, and insights into decentralized cloud storage from the Telephotos team.',
    url: '/blog'
  },
  'privacy/page.tsx': {
    title: 'Privacy Policy',
    desc: 'Read our Privacy Policy to understand how Telephotos operates with a strict Zero Host policy and protects your personal data.',
    url: '/privacy'
  },
  'terms/page.tsx': {
    title: 'Terms of Service',
    desc: 'Review the Terms of Service for using Telephotos, the unlimited telegram-based cloud photo gallery.',
    url: '/terms'
  }
};

const appDir = path.join(__dirname, 'src', 'app');

for (const [relPath, info] of Object.entries(seoDetails)) {
  const filePath = path.join(appDir, relPath);
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping ${relPath} - not found`);
    continue;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // If it already has an export const metadata, replace it
  const metadataRegex = /export\s+const\s+metadata(?:\s*:\s*Metadata)?\s*=\s*\{[\s\S]*?(?:^export|^const|^function|^export default|;$)/m;
  const oldMetadata = /export\s+const\s+metadata(.|\n)*?\};?\n/m;
  
  const metadataStr = `
export const metadata = {
  title: "${info.title} | Telephotos",
  description: "${info.desc}",
  openGraph: {
    title: "${info.title} | Telephotos",
    description: "${info.desc}",
    url: "https://telephotos.app${info.url}",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "https://telephotos.app${info.url}",
  },
};
`.trim() + '\n\n';

  if (content.includes('export const metadata')) {
    content = content.replace(oldMetadata, metadataStr);
  } else {
    // Inject after imports or "use client"
    const lines = content.split('\n');
    let insertIdx = 0;
    while (insertIdx < lines.length && (lines[insertIdx].startsWith('import ') || lines[insertIdx].startsWith('"use client') || lines[insertIdx].trim() === '')) {
      insertIdx++;
    }
    lines.splice(insertIdx, 0, metadataStr);
    content = lines.join('\n');
  }
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated ${relPath}`);
}
