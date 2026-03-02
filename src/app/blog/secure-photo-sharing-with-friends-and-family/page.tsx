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
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Secure Photo Sharing with Friends and Family</h1>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-400 mb-12 uppercase tracking-wider">
               <time>March 10, 2024</time>
               <span>•</span><span>5 min read</span>
            </div>
            
            <p>
                Sharing high-quality photos from events, weddings, or vacations with friends is usually a pain. Email has tiny attachment limits. WhatsApp heavily compresses your pictures until they are pixelated. Uploading everything to a public Google Drive link can feel like a massive privacy risk if the link falls into the wrong hands.
            </p>

            <h2>The Hidden Risks of Public Links</h2>
            <p>
                When you create a "Share with anyone who has the link" URL on major cloud providers, those links can be indexed by bots, shared unauthorized, or left open for years. It isn’t the safest way to circulate photos of your family.
            </p>

            <h2>Native Ecosystem Sharing</h2>
            <p>
                If you use Telegram-based architecture to back up your photos, you inherently gain access to the most powerful sharing ecosystem available. Since every album you create via Telephotos corresponds directly to a private Telegram Channel, sharing an album is astonishingly secure. 
            </p>
            <p>
                Instead of generating a public web link, you simply invite your friends or family members to your private Telegram channel. The second they join, they can beautifully browse the massive, uncompressed files directly on their own devices. More importantly, as an admin, you can instantly revoke access, restrict saving/forwarding, or remove users, guaranteeing tight control over your private affairs.
            </p>
            
            <h2>Full Resolution and Collaborative Albums</h2>
            <p>
                What's more, you can alter the permissions of that shared Telegram channel to act as a "Group Chat". Now, after a wedding, dozens of guests can securely drop their untouched, full-resolution camera photos into that same repository. It acts as an incredibly powerful, deeply secure, and collaborative vault for your shared memories.
            </p>
        </article>
      </main>

      <PublicFooter />
    </div>
  );
}
