"use client";

import { PublicFooter } from "@telephotos/components/PublicFooter";
import { PublicNavbar } from "@telephotos/components/PublicNavbar";
import { Cloud, FolderOpen, ImagePlus, LayoutGrid, ShieldCheck, Zap } from "lucide-react";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200">
      <PublicNavbar />
      
      <main className="pt-32 pb-24 px-6 max-w-5xl mx-auto space-y-16">
        <div className="text-center space-y-4">
           <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
             Telephotos Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Features</span>
           </h1>
           <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
             Our platform turns your standard Telegram account into an incredibly powerful photo gallery. We build the stunning interface, you keep the private unlimited storage. Explore what makes Telephotos different.
           </p>
        </div>

        <div className="space-y-12">
            
            <FeatureSection 
                title="1. Endless Cloud Storage, No Subscriptions"
                description={
                    <>
                        <p>One of the biggest concerns with modern smartphones is running out of storage space. Services like Google One or Apple iCloud limit your free tier strictly, constantly pushing you towards recurring monthly payments. Over the years, these costs add up significantly, effectively taxing you for wanting to keep your memories.</p>
                        <p>Telephotos utilizes Telegram's native cloud API, which currently offers essentially unlimited storage to its users completely for free. As long as you respect Telegram's terms, you can upload thousands of your highest-quality photos directly through Telephotos to your private Telegram channels without ever hitting a paywall. There are no sudden account freezes, no aggressive "Storage Full" popups, and absolutely zero hidden fees.</p>
                    </>
                }
                icon={<Cloud className="w-10 h-10 text-cyan-400" />}
                align="left"
            />

            <FeatureSection 
                title="2. Absolute Zero-Knowledge Privacy"
                description={
                    <>
                        <p>Unlike standard cloud galleries that index your images on their servers for varied purposes like ad-targeting or AI training, Telephotos is architectured so that your files never rest on our databases. We believe that your private photos should remain strictly private.</p>
                        <p>Our application acts exclusively as a secure frontend tunnel. When a file is uploaded, it is channeled directly to your Telegram 'Saved Messages' or private 'Channel'. The media is entirely encrypted by Telegram's MTProto protocol, and only you hold the keys via your phone number. Because we do not store the images, we physically cannot access them, ensuring total confidentiality.</p>
                    </>
                }
                icon={<ShieldCheck className="w-10 h-10 text-emerald-400" />}
                align="right"
            />

            <FeatureSection 
                title="3. Beautiful, Lightning-Fast Gallery"
                description={
                    <>
                        <p>Browsing through media via chat bubbles is a nightmare when you have thousands of vacation pictures scattered across years. You need a dedicated, immersive interface to truly appreciate your photography.</p>
                        <p>Telephotos provides a dedicated, optimized, full-screen gallery grid. We dynamically cache thumbnails and seamlessly lazy-load your albums. The result is a buttery smooth viewing experience indistinguishable from native operating system gallery applications, but fundamentally decentralized on Telegram. You get the infinite storage of a chat application combined with the premium aesthetics of a professional photo manager.</p>
                    </>
                }
                icon={<LayoutGrid className="w-10 h-10 text-violet-400" />}
                align="left"
            />

            <FeatureSection 
                title="4. Native Channel Organization"
                description={
                    <>
                        <p>Folders are crucial for photo management. A giant, unsorted bucket of files is functionally useless. We needed a way to translate traditional folder structures into the decentralized web without losing performance.</p>
                        <p>We handle grouping through native Telegram Channels. You can create a new channel named 'My Wedding Photos' right inside Telephotos, and it syncs immediately to your Telegram app. This dual-access means you can drop a file on our dashboard, and instantly view it inside a chat folder on your phone, providing a level of backup security unmatched in the industry. It's an elegant solution to complex album curation.</p>
                    </>
                }
                icon={<FolderOpen className="w-10 h-10 text-rose-400" />}
                align="right"
            />
            
            <FeatureSection 
                title="5. Fast Media Uploaders"
                description={
                    <>
                        <p>Waiting hours for large videos or massive RAW photo dumps to upload is a massive bottleneck. Traditional REST APIs can be sluggish, constantly pausing or dropping connections midway through a large transfer.</p>
                        <p>Our interface includes drag-and-drop mechanics supporting multiple simultaneous file uploads. The backend uses async web-workers to handle massive batches without freezing your browser. We directly pipeline your bytes into Telegram's optimized UDP-based framework with parallel chunking, ensuring you get the maximum possible upload speeds that your local internet connection can physically provide.</p>
                    </>
                }
                icon={<Zap className="w-10 h-10 text-amber-400" />}
                align="left"
            />

            <FeatureSection 
                title="6. High Fidelity Metadata Retention"
                description={
                    <>
                        <p>When you backup your images, the location data, timestamp, and EXIF parameters act as the silent backbone of your memories. They tell the story of where and when a moment happened. Standard messaging apps strip this data to save space.</p>
                        <p>We preserve these exact data structures perfectly. By uploading your images as documents under the hood, Telegram skips its standard chat image compression entirely. What we store is a bit-by-bit identical copy of your raw photo, ensuring that every megapixel, every GPS tag, and every unique color profile is safely archived for decades to come.</p>
                    </>
                }
                icon={<ImagePlus className="w-10 h-10 text-blue-400" />}
                align="right"
            />
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}

function FeatureSection({ title, description, icon, align }: { title: string, description: React.ReactNode, icon: React.ReactNode, align: "left"|"right" }) {
    return (
        <section className={`bg-slate-900/50 p-8 md:p-12 rounded-3xl border border-white/5 flex flex-col md:flex-row gap-8 items-center ${align === "right" ? "md:flex-row-reverse" : ""}`}>
            <div className="shrink-0 w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl glass-panel">
                {icon}
            </div>
            <div className="flex-1 space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{title}</h3>
                <div className="text-slate-400 leading-relaxed text-lg space-y-4">
                    {description}
                </div>
            </div>
        </section>
    )
}
