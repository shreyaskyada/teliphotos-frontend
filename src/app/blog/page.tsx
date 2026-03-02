"use client";

import { PublicFooter } from "@telephotos/components/PublicFooter";
import { PublicNavbar } from "@telephotos/components/PublicNavbar";
import Link from "next/link";

const posts = [
  {
    title: "How to Use Telegram as Unlimited Cloud Storage in 2024",
    slug: "how-to-use-telegram-as-unlimited-cloud-storage",
    date: "February 24, 2024",
    excerpt: "Discover the hidden features of Telegram that let you store unlimited files, photos, and videos for free without ever paying a subscription fee.",
    readTime: "5 min read",
  },
  {
    title: "Top 5 Reasons to Switch from Google Photos to Telephotos",
    slug: "top-5-reasons-to-switch-from-google-photos",
    date: "February 22, 2024",
    excerpt: "Google Photos ended its unlimited free storage. If you're tired of 'Storage Full' notifications, see why moving to a Telegram-backed gallery is the smartest choice.",
    readTime: "4 min read",
  },
  {
    title: "Understanding Zero-Knowledge Privacy in Cloud Storage",
    slug: "understanding-zero-knowledge-privacy",
    date: "February 15, 2024",
    excerpt: "What does zero-knowledge architecture actually mean? Learn how Telephotos keeps your data safe by acting purely as a secure frontend to your encrypted Telegram channels.",
    readTime: "7 min read",
  },
  {
    title: "The Future of Decentralized Photo Galleries",
    slug: "the-future-of-decentralized-photo-galleries",
    date: "March 1, 2024",
    excerpt: "What happens when centralized servers break or change their terms? Dive into why decentralized photo galleries and zero-trust architectures are the future.",
    readTime: "6 min read",
  },
  {
    title: "How to Organize Digital Memories in 2024",
    slug: "how-to-organize-digital-memories-in-2024",
    date: "March 2, 2024",
    excerpt: "Finding one specific photo from three years ago shouldn't feel like digging through a digital landfill. Here is how you can organize effectively.",
    readTime: "5 min read",
  },
  {
    title: "Why MTProto Encryption Matters for Your Photos",
    slug: "why-mtproto-encryption-matters",
    date: "March 5, 2024",
    excerpt: "Understanding the MTProto protocol and how it drastically differs from standard TLS when it comes to keeping your intimate family memories secure.",
    readTime: "6 min read",
  },
  {
    title: "Stop Paying for iCloud: Tips and Tricks",
    slug: "stop-paying-for-icloud-tips-and-tricks",
    date: "March 8, 2024",
    excerpt: "Running out of space on your iPhone? Stop paying recurring sub fees. Transfer those heavy 4K videos off your device and into unlimited storage correctly.",
    readTime: "5 min read",
  },
  {
    title: "Secure Photo Sharing with Friends and Family",
    slug: "secure-photo-sharing-with-friends-and-family",
    date: "March 10, 2024",
    excerpt: "Public cloud links are dangerous. Learn how to securely share entire, uncompressed albums with family over private channels without compression.",
    readTime: "5 min read",
  },
  {
    title: "Reclaiming Digital Ownership",
    slug: "reclaiming-digital-ownership",
    date: "March 14, 2024",
    excerpt: "Real digital ownership requires escaping proprietary ecosystems. Move away from vendor lock-in by segmenting how your cloud gallery accesses data.",
    readTime: "6 min read",
  },
  {
    title: "The Environmental Impact of Cloud Storage",
    slug: "the-environmental-impact-of-cloud-storage",
    date: "March 18, 2024",
    excerpt: "The massive server farms maintaining your camera roll have a major carbon cost. Maximize efficiency by using shared secure infrastructure instead.",
    readTime: "4 min read",
  }
];

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200">
      <PublicNavbar />
      
      <main className="pt-32 pb-24 px-6 max-w-5xl mx-auto space-y-16">
        <div className="text-center space-y-4 border-b border-white/5 pb-12">
           <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
             The Telephotos <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Blog</span>
           </h1>
           <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
             Read our latest articles on cloud storage alternatives, privacy technology, and tips on how to manage your digital life more efficiently.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
            {posts.map((post) => (
               <article key={post.slug} className="bg-slate-900 border border-white/10 rounded-3xl p-6 hover:bg-slate-800/80 transition-all hover:scale-[1.02] flex flex-col justify-between group h-full shadow-lg">
                  <div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-4 uppercase tracking-wider">
                          <time>{post.date}</time>
                          <span>•</span>
                          <span>{post.readTime}</span>
                      </div>
                      <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-violet-400 transition-colors leading-tight">
                        <Link href={`/blog/${post.slug}`}>
                            {post.title}
                        </Link>
                      </h2>
                      <p className="text-slate-400 text-sm leading-relaxed mb-6">
                        {post.excerpt}
                      </p>
                  </div>
                  <Link href={`/blog/${post.slug}`} className="text-cyan-400 font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read Article &rarr;
                  </Link>
               </article>
            ))}
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
