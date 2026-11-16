import { FAQItem } from "@telephotos/components/FAQItem";
import { PublicFooter } from "@telephotos/components/PublicFooter";
import { PublicNavbar } from "@telephotos/components/PublicNavbar";



const faqs = [
  {
    q: "What is Telephotos and how does it actually work?",
    a: "Telephotos is a modern gallery interface built on top of the Telegram API. Instead of paying for expensive cloud providers like iCloud, Google Photos, or Dropbox, Telephotos lets you use your own private Telegram channels or Saved Messages to store unlimited photos securely. We provide a beautiful, fast interface to browse, organize, and upload your memories, while all the actual data remains safely encrypted on Telegram's servers. This ensures you keep full control over your precious files while enjoying a premium viewing experience."
  },
  {
    q: "Is Telephotos really 100% free with unlimited storage?",
    a: "Yes! Because we leverage the official Telegram API, your files are stored within your Telegram account. Telegram famously provides unlimited cloud storage for all users, up to 2GB per file (or 4GB for Premium users). We do not charge you for the data storage because your files live in your Telegram account, not on our servers. Our service acts as a dashboard for the files in your Telegram cloud, and it is funded by ads. Storage remains subject to Telegram's own limits and policies."
  },
  {
    q: "Will Telephotos compress or reduce the quality of my photos?",
    a: "No, we ensure highest quality retention. Unlike many other platforms that silently compress images to save space, when you upload through Telephotos as files, they are saved as raw documents on Telegram. This means the original resolution, metadata, and EXIF data of your photography is completely preserved. What you upload is exactly what you can download years later."
  },
  {
    q: "Can Telephotos or anyone else see my private photos?",
    a: "Nobody at Telephotos looks through your photos, and we never keep permanent copies of them. Your originals are stored in your own Telegram channels, protected by Telegram's cloud encryption. To make the gallery work, our servers do handle your media briefly and automatically: uploads pass through our server on their way to Telegram and are deleted right after, and small preview thumbnails are cached for about an hour so your grid loads fast. Telephotos is not end-to-end encrypted: like any app you log in to with Telegram, our servers hold a login session for your account, which you can end anytime from Telegram → Settings → Devices. Our Privacy Policy explains exactly what we store."
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
    a: "Yes, an active Telegram account is required since all the backend storage operations happen through your account. When you log in to Telephotos, you authorize our app using your Telegram phone number. This adds a Telegram session for Telephotos, which we use only to manage the channels and media you work with in Telephotos. Telephotos is an independent app and is not affiliated with Telegram."
  }
];

// Collapsible FAQ item logic is handled in the shared client component @telephotos/components/FAQItem

export default function FAQPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
            <FAQItem key={idx} faq={faq} large={true} />
          ))}
        </div>

        <div className="mt-16 bg-slate-900 border border-white/10 rounded-2xl p-8 text-center space-y-4 shadow-xl glass-panel relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/10 to-cyan-600/10 z-0"></div>
            <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white">Still have questions?</h2>
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
