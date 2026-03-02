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
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">The Environmental Impact of Cloud Storage</h1>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-400 mb-12 uppercase tracking-wider">
               <time>March 18, 2024</time>
               <span>•</span><span>4 min read</span>
            </div>
            
            <p>
                With digital storage feeling invisible and limitless to the end consumer, it's easy to forget that "the cloud" is simply massive physical warehouses filled with millions of hard drives. Those datacenters require astounding amounts of electricity to run, and even larger amounts of water and power to keep the servers cool.
            </p>

            <h2>The Carbon Cost of Your Camera Roll</h2>
            <p>
                The average user creates gigabytes of duplicate files over the years. Every accidental video taken in your pocket, every duplicate meme, and every continuous burst photo takes up physical sectors on a magnetic drive. Backing up useless data constantly across multi-device sync loops puts tangible strain on the grid. Data centers currently account for a rapidly growing percentage of global greenhouse gas emissions.
            </p>

            <h2>Efficiency Through Minimalist Stacks</h2>
            <p>
                Building entirely new, redundant datacenters strictly for a new startup photo app contributes to massive hardware waste. By piggybacking on existing, massively optimized global infrastructure (like Telegram's API), tools like Telephotos act as highly efficient software proxies. 
            </p>
            <p>
                Telegram's datacenters are engineered to handle the throughput of nearly a billion active users simultaneously messaging each day. They are heavily optimized for energy efficiency. Leveraging that existing pipeline for file storage instead of firing up individual, redundant servers for every new app limits unnecessary physical hardware build-outs.
            </p>
            <p>
                The most sustainable practice you can adopt is routine file hygiene. Combine that with utilizing optimized, pre-existing secure networks rather than sprawling legacy cloud accounts, and you dramatically reduce the carbon footprint of your personal memories.
            </p>
        </article>
      </main>

      <PublicFooter />
    </div>
  );
}
