"use client";

import { PublicFooter } from "@telephotos/components/PublicFooter";
import { PublicNavbar } from "@telephotos/components/PublicNavbar";



export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200">
      <PublicNavbar />
      
      <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto space-y-16">
        <div className="text-center space-y-4 border-b border-white/5 pb-12">
           <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
             How <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Telephotos</span> Works
           </h1>
           <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
             A deep dive into the technology and secure architecture that powers our infinite photo gallery. Understand exactly how your files move from your browser into Telegram's encrypted cloud.
           </p>
        </div>

        <div className="space-y-16 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
            
            <TimelineStep 
                num="1" 
                title="Secure Telegram Authentication"
                content="The journey begins when you log into Telephotos. You are not creating a new account on our platform; instead, you authenticate using your existing Telegram phone number. We utilize the official MTProto Telegram API. We request a session hash that allows our client to read your channel structure and upload files on your behalf. This session is securely stored directly on your local device—our backend servers temporarily bridge the connection but do not save your credentials."
            />

            <TimelineStep 
                num="2" 
                title="Channel Creation & Organization"
                content="Once logged in, Telephotos scans your account for private channels you designate as 'albums'. If you don't have any, you simply click 'Create New Channel' inside our dashboard. Under the hood, we instruct the Telegram API to create a brand new private channel with you as the sole admin. This ensures that every photo you upload into this channel acts as a segregated folder on Telegram, invisible to the public and perfectly organized on your Telephotos gallery."
            />

            <TimelineStep 
                num="3" 
                title="The Upload Pipeline"
                content="When you drag and drop high-resolution photos into Telephotos, your browser securely slices these files into chunks. Our frontend streams these encrypted chunks directly into Telegram's decentralized network of datacenters. Crucially, we specify that the media should be uploaded as 'Documents' instead of standard 'Photos'. This API instruction forces Telegram to bypass its notorious compression algorithms, preserving your file's absolute quality, EXIF metadata, and exact pixel dimensions."
            />

            <TimelineStep 
                num="4" 
                title="Asynchronous Rendering"
                content="As you browse your gallery, displaying raw 10MB images directly would crash your browser. To fix this, after a file is uploaded securely to Telegram, Telephotos generates a tiny, blurred preview hash (using an algorithm like BlurHash) and requests Telegram to provide an optimized thumbnail. The Telephotos dashboard then loads a fast, grid-based layout using these lightweight thumbnails. Only when you click a photo to view it full-screen does the application fetch the original, uncompressed image from Telegram's cloud."
            />

            <TimelineStep 
                num="5" 
                title="Permanent Ownership"
                content="The final and most important step of how it works is your total ownership of the data. Because Telephotos acts only as a sophisticated viewer and uploader, the master copies of your photos live natively on Telegram. You can at any moment open the standard Telegram application on your tablet or smartphone, navigate to the private channels you created, and manually view, forward, or delete the files. We do not lock you into a proprietary ecosystem."
            />

        </div>

        <div className="text-center mt-20">
             <h2 className="text-3xl font-bold text-white mb-6">Ready to set up your gallery?</h2>
             <a href="/dashboard" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-full text-white font-bold text-lg hover:scale-105 active:scale-95 transition-transform shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                 Start Now for Free
             </a>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}

function TimelineStep({ num, title, content }: { num: string, title: string, content: string }) {
    return (
        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            {/* Timeline Line Icon */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/5 bg-slate-900 text-slate-400 font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow flex-col absolute left-0 md:left-1/2 z-10">
                {num}
            </div>
            
            {/* Content card */}
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-900/50 p-6 md:p-8 rounded-2xl border border-white/5 hover:border-violet-500/30 transition-colors ml-auto md:ml-0 shadow-lg">
                <div className="flex flex-col space-y-3">
                    <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
                    <p className="text-slate-400 leading-relaxed">
                        {content}
                    </p>
                </div>
            </div>
        </div>
    )
}
