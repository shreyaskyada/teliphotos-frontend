"use client";

import { PublicFooter } from "@telephotos/components/PublicFooter";
import { PublicNavbar } from "@telephotos/components/PublicNavbar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200">
      <PublicNavbar />
      
      <main className="pt-32 pb-24 px-6 max-w-3xl mx-auto space-y-16">
        <Link href="/blog" className="inline-flex items-center gap-2 text-violet-400 hover:text-white transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
        </Link>
        <article className="prose prose-invert lg:prose-xl mx-auto max-w-none prose-headings:text-white prose-a:text-cyan-400">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">The Future of Decentralized Photo Galleries</h1>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-400 mb-12 uppercase tracking-wider">
               <time>March 1, 2024</time>
               <span>•</span><span>6 min read</span>
            </div>
            
            <p>
                As our smartphone cameras capture ever larger file sizes, the need for robust photo storage solutions has never been more obvious. For the past decade, consumers have largely trusted giant, centralized servers with their entire digital libraries. But what happens when these centralized points of failure break, or change their terms of service overnight? This is where decentralized photo galleries step in as the obvious future. 
            </p>

            <h2>Why Centralization is Failing Photographers</h2>
            <p>
                When a single corporation hosts millions of gigabytes of your personal life, they effectively own your data. Centralized architectures use data deduplication, algorithmic compression, and even AI scanning to lower their overhead costs and monetize your memories. We've seen platforms suddenly remove their unlimited tiers, silently degrading your image quality, or even locking accounts accidentally by rogue automated systems.
            </p>

            <h2>The Decentralized Promise</h2>
            <p>
                Decentralization introduces a completely different paradigm. Rather than saving to "one big server," a decentralized or federated network stores data across various nodes. This dramatically increases both resilience and privacy.
            </p>
            <p>
                In the context of Telephotos, while Telegram is a large entity, its backend operates on a globally distributed network of datacenters. By using Telegram's decentralized MTProto infrastructure as a storage layer, Telephotos allows you to physically divorce your application interface (the gallery viewer) from the underlying storage mechanism.
            </p>

            <h2>True Data Ownership</h2>
            <p>
                Decentralized galleries empower true data sovereignty. In an era where "Your Data is the Product", architectures that utilize end-to-end encryption tunnels and separate the front-end rendering from back-end hosting give control back to you. The future is an internet where moving providers doesn't mean manually exporting massive ZIP files, but simply plugging your data source into a new, improved interface. 
            </p>
        </article>
      </main>

      <PublicFooter />
    </div>
  );
}
