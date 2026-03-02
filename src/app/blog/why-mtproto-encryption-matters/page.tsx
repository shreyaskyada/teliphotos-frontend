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
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Why MTProto Encryption Matters for Your Photos</h1>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-400 mb-12 uppercase tracking-wider">
               <time>March 5, 2024</time>
               <span>•</span><span>6 min read</span>
            </div>
            
            <p>
                For the average consumer, terms like "end-to-end encryption" or "MTProto" sound like complex cybersecurity buzzwords. However, when we talk about archiving deeply personal, intimate family memories in the cloud, understanding what protects those files is crucial. This is why MTProto matters for your digital galleries.
            </p>

            <h2>The Anatomy of MTProto</h2>
            <p>
                MTProto is the proprietary security protocol developed alongside Telegram. It was built with one primary goal: blazing fast speed combined with military-grade security on weak mobile connections. It features 256-bit symmetric AES encryption, RSA 2048 encryption, and Diffie–Hellman secure key exchange.
            </p>
            <p>
                When you use a platform like Telephotos, you are utilizing this exact infrastructure. As you drag a photo onto our dashboard to upload it into a private channel, the file is immediately chunked and encrypted with MTProto before it even reaches a destination server. 
            </p>

            <h2>The Difference Between Transport and Rest Encryption</h2>
            <p>
                Almost every website today uses TLS/SSL (the "padlock" icon) to encrypt data in transit. But standard cloud providers decrypt your photo the second it lands on their servers, store it on a normal hard drive, and only encrypt the physical hard drive.
            </p>
            <p>
                By using Telegram’s robust backend, your data benefits from highly resilient, distributed key architectures that make mass server breaches practically impossible. Nobody can simply "unplug a hard drive" from the datacenter and read your photos. 
            </p>

            <h2>Speed Without Compromise</h2>
            <p>
                Usually, adding heavy layers of encryption makes file uploading horribly slow. MTProto was deliberately designed to minimize overhead, particularly over UDP. This means when you backup 5GB of heavy RAW photo files through the Telephotos interface, it maxes out your bandwidth securely, providing you with a premium, optimized experience for free.
            </p>
        </article>
      </main>

      <PublicFooter />
    </div>
  );
}
