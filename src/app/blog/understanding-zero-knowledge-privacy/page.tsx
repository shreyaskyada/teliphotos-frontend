import { PublicFooter } from "@telephotos/components/PublicFooter";
import { PublicNavbar } from "@telephotos/components/PublicNavbar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BlogPost3() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200">
      <PublicNavbar />
      
      <main className="pt-32 pb-24 px-6 max-w-3xl mx-auto space-y-16">
        <Link href="/blog" className="inline-flex items-center gap-2 text-violet-400 hover:text-white transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
        </Link>
        <article className="prose prose-invert lg:prose-xl mx-auto max-w-none prose-headings:text-white prose-a:text-cyan-400">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Understanding Zero-Knowledge Privacy in Cloud Storage</h1>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-400 mb-12 uppercase tracking-wider">
               <time>February 15, 2024</time>
               <span>•</span><span>7 min read</span>
            </div>
            
            <p>
                In an era dominated by massive data breaches and algorithmic surveillance, privacy is a luxury. When you upload photos to most cloud galleries, their algorithms immediately scan the contents—finding faces, mapping locations, categorizing objects to "improve search" but at the cost of your absolute privacy. 
            </p>
            <p>
                A true zero-knowledge service encrypts your files on your own device with a key only you hold, so the provider has no way to see what you store. It is the strongest privacy model there is, and you deserve to know exactly which services offer it and which do not. Here is an honest look at where Telephotos stands.
            </p>

            <h2>Telephotos Is Not Zero-Knowledge</h2>
            <p>
                We want to be upfront: Telephotos is not a zero-knowledge or end-to-end encrypted service, and neither are Telegram&apos;s cloud channels. Telegram encrypts cloud data between your device and its servers and stores it encrypted, but Telegram manages those keys. End-to-end encryption on Telegram only applies to Secret Chats, which cannot hold channel albums.
            </p>
            <p>
                Telephotos also needs a Telegram login session to work. Like logging in to Telegram on a new device, this session lets our servers upload, list, and load the media in the channels you use with Telephotos. We store that session encrypted, use it only for those channels, and you can revoke it at any time from Telegram &rarr; Settings &rarr; Devices.
            </p>

            <h2>What We Actually Store</h2>
            <p>
                Your original photos and videos live permanently in your own Telegram channels, not on our servers. When you upload, the file passes through our server on its way to Telegram and the temporary copy is deleted as soon as the upload finishes. To keep the gallery fast, we cache small preview thumbnails for about an hour, then delete them automatically. Beyond that, our database holds only what the gallery needs: your account identifiers, channel details, and file references such as message IDs and dimensions.
            </p>

            <h2>What We Will Never Do</h2>
            <p>
                Tech giants make money primarily by scanning your photos and metadata to build advertising profiles. We don&apos;t. Telephotos is funded by ads, but those ads are never based on the content of your photos. Nobody at Telephotos browses your media, we never sell your data, and we never use your photos to train AI. For the complete details, read our <Link href="/privacy">Privacy Policy</Link>.
            </p>
        </article>
      </main>

      <PublicFooter />
    </div>
  );
}
