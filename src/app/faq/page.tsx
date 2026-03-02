"use client";

import { PublicFooter } from "@telephotos/components/PublicFooter";
import { PublicNavbar } from "@telephotos/components/PublicNavbar";

const faqs = [
  {
    q: "What is Telephotos and how does it actually work?",
    a: "Telephotos is a modern gallery interface built on top of the Telegram API. Instead of paying for expensive cloud providers like iCloud, Google Photos, or Dropbox, Telephotos lets you use your own private Telegram channels or Saved Messages to store unlimited photos securely. We provide a beautiful, fast interface to browse, organize, and upload your memories, while all the actual data remains safely encrypted on Telegram's servers. This ensures you keep full control over your precious files while enjoying a premium viewing experience."
  },
  {
    q: "Is Telephotos really 100% free with unlimited storage?",
    a: "Yes! Because we leverage the official Telegram API, your files are stored within your Telegram account. Telegram famously provides unlimited cloud storage for all users, up to 2GB per file (or 4GB for Premium users). We do not charge you for the data storage because we do not host your files. Our service acts purely as a dashboard or remote viewer for the files existing in your Telegram cloud."
  },
  {
    q: "Will Telephotos compress or reduce the quality of my photos?",
    a: "No, we ensure highest quality retention. Unlike many other platforms that silently compress images to save space, when you upload through Telephotos as files, they are saved as raw documents on Telegram. This means the original resolution, metadata, and EXIF data of your photography is completely preserved. What you upload is exactly what you can download years later."
  },
  {
    q: "Can Telephotos or anyone else see my private photos?",
    a: "Absolutely not. Telephotos is built with a zero-knowledge architecture. All photos are stored directly in your personal Telegram space. We do not download, host, or mirror your images on our servers. Your data is protected by the same world-class encryption that Telegram uses for its private chats and secret channels. Our backend strictly pipes the data straight between you and Telegram without ever looking at the contents."
  },
  {
    q: "What happens if I decide to stop using Telephotos?",
    a: "You have complete freedom to leave at any time without losing a single file. Since all media exists within your Telegram application, deleting or stopping your use of Telephotos has zero impact on your files. You can just open the official Telegram app on your phone or desktop, navigate to the channel you used as your photo album, and all your high-quality files will be right there."
  },
  {
    q: "Can I organize my photos into folders or albums?",
    a: "Yes. In Telephotos, you organize your media using Telegram Channels. Each private channel acts as an album or a folder. You might create a channel named 'Europe Trip 2024' or 'Family Gatherings', and upload photos directly to it through Telephotos. Our dashboard then segregates these channels, letting you view and manage separate collections effortlessly."
  },
  {
    q: "Do I need a Telegram account to sign up?",
    a: "Yes, an active Telegram account is required since all the backend storage operations happen through your account. When you log in to Telephotos, you authorize our app using your Telegram phone number, strictly for accessing your own storage."
  }
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200">
      <PublicNavbar />
      
      <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
           <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
             Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Questions</span>
           </h1>
           <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
             Everything you need to know about Telephotos, your new unlimited photo gallery powered by Telegram's cloud storage. Learn how we keep your data secure and accessible.
           </p>
        </div>

        <div className="space-y-6 pt-8">
          {faqs.map((faq, idx) => (
            <section key={idx} className="bg-slate-900/50 border border-white/5 rounded-2xl p-8 hover:bg-slate-800/50 transition-colors">
               <h2 className="text-2xl font-bold text-white mb-4">{faq.q}</h2>
               <div className="w-12 h-1 bg-violet-500/50 mb-4 rounded-full"></div>
               <p className="text-slate-400 leading-relaxed text-lg">
                 {faq.a}
               </p>
            </section>
          ))}
        </div>

        <div className="mt-16 bg-slate-900 border border-white/10 rounded-2xl p-8 text-center space-y-4 shadow-xl glass-panel relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/10 to-cyan-600/10 z-0"></div>
            <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white">Still have questions?</h3>
                <p className="text-slate-400 mb-6">Our support team is always here to help you get the most out of your infinite gallery.</p>
                <a href="/contact" className="inline-block px-8 py-3 bg-white text-slate-900 font-bold rounded-full hover:scale-105 transition-transform">
                    Contact Support
                </a>
            </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
