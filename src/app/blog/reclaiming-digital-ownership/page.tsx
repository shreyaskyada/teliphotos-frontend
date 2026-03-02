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
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Reclaiming Digital Ownership</h1>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-400 mb-12 uppercase tracking-wider">
               <time>March 14, 2024</time>
               <span>•</span><span>6 min read</span>
            </div>
            
            <p>
                What does it actually mean to "own" something on the internet? If you buy a physical photo album, it belongs to you. No subscription fee secures its existence. But digital files are ephemeral, largely managed by distant mega-corporations utilizing confusing End User License Agreements to dictate what remains online.
            </p>

            <h2>The Illusion of Free</h2>
            <p>
                For a very long time, companies offered us free storage in exchange for metadata. But as data centers get more expensive, tech firms use strategies to monetize your gigabytes. If you fail to login for a certain amount of time, companies like Google reserve the right to wipe your accounts to clear server space. That is not ownership. It is long-term renting.
            </p>

            <h2>Shifting the Paradigm</h2>
            <p>
                Real digital ownership requires moving away from proprietary cloud ecosystems that enforce vendor lock-in. It means keeping files in versatile formats (like raw JPEGs, PDFs) rather than closed library files (like the massive, cryptic Apple Photos Library package). 
            </p>
            <p>
                Telephotos actively pushes against vendor lock-in. By leaning into an API-first interface layered atop a messaging giant, you are empowered to view your photos outside the bounds of our software perfectly intact. If you want to use a different application to view your files tomorrow, you do so effortlessly because the "files" sit independently on your assigned Telegram cloud. We merely build the window. That separation of concerns guarantees true, lasting ownership.
            </p>
        </article>
      </main>

      <PublicFooter />
    </div>
  );
}
