const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, 'src', 'app', 'blog');
const dirs = fs.readdirSync(appDir).filter(item => fs.statSync(path.join(appDir, item)).isDirectory());

for (const dirName of dirs) {
  const pagePath = path.join(appDir, dirName, 'page.tsx');
  if (!fs.existsSync(pagePath)) continue;

  const content = fs.readFileSync(pagePath, 'utf8');
  
  // Extract Title from h1
  const titleMatch = content.match(/<h1[^>]*>([^<]+)<\/h1>/);
  let title = titleMatch ? titleMatch[1].trim() : dirName.replace(/-/g, ' ');
  // capitalizing title if it was grabbed from folder name
  if (!titleMatch) {
    title = title.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }

  // Extract description from the first paragraph after the title
  let desc = 'Read the full article on the Telephotos blog to learn more about private photo sharing and unlimited storage on Telegram.';
  
  const pMatch = content.match(/<\/div>\s*<p>([\s\S]*?)<\/p>/);
  if (pMatch) {
    desc = pMatch[1].trim()
      .replace(/<[^>]+>/g, '') // remove inner HTML tags
      .replace(/\s+/g, ' ') // normalize spaces
      .substring(0, 160) + '...'; // truncate
  }

  const url = `/blog/${dirName}`;
  
  const layoutContent = `
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '${title.replace(/'/g, "\\'")}',
  description: '${desc.replace(/'/g, "\\'")}',
  openGraph: {
    title: '${title.replace(/'/g, "\\'")}',
    description: '${desc.replace(/'/g, "\\'")}',
    url: 'https://telephotos.app${url}',
    type: 'article',
  },
  alternates: {
    canonical: 'https://telephotos.app${url}',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
`;

  fs.writeFileSync(path.join(appDir, dirName, 'layout.tsx'), layoutContent.trim() + '\n');
  console.log(`Generated layout SEO for ${dirName}`);
}
