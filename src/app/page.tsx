"use client";

import { PublicFooter } from "@telephotos/components/PublicFooter";
import { PublicNavbar } from "@telephotos/components/PublicNavbar";
import {
  ArrowRight,
  Cloud,
  FolderOpen,
  ImagePlus,
  LayoutGrid,
  Lock,
  Play,
  Rocket,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BENTO_FEATURES = [
  {
    title: "Unlimited Storage",
    description: "Leverage Telegram's incredibly generous cloud to store as many memories as you want without monthly fees.",
    icon: Cloud,
    gradient: "from-blue-500 to-cyan-500",
    colSpan: "col-span-1 md:col-span-2",
  },
  {
    title: "Stunning Gallery UI",
    description: "Forget endless chat scrolling. See your photos neatly arranged in a blazing fast, grid-based dashboard.",
    icon: LayoutGrid,
    gradient: "from-violet-500 to-purple-500",
    colSpan: "col-span-1 md:col-span-1",
  },
  {
    title: "Absolute Privacy",
    description: "We don't host your files. They stay strictly inside your private Telegram channels, encrypted and secure.",
    icon: ShieldCheck,
    gradient: "from-emerald-400 to-green-600",
    colSpan: "col-span-1 md:col-span-1",
  },
  {
    title: "Channel Albums",
    description: "Easily group your photos into Telegram channels. Use different channels for events, trips, or family memories.",
    icon: FolderOpen,
    gradient: "from-pink-500 to-rose-500",
    colSpan: "col-span-1 md:col-span-2",
  },
];

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGetStarted = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 overflow-x-hidden selection:bg-violet-500/30">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-violet-600/20 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] bg-cyan-600/20 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute top-[40%] left-[20%] w-[60%] h-[40%] bg-blue-600/10 blur-[100px] rounded-full mix-blend-screen animate-pulse duration-[10000ms]" />
        
        {/* subtle grid patterns */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-60"></div>
      </div>

      {/* Navigation */}
      <PublicNavbar />

      {/* Hero Section */}
      <section className="relative z-10 pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center header-content">
        <div
           className="animate-fade-in-up inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-violet-300 text-sm font-medium mb-8 hover:bg-white/10 transition-colors cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>The Ultimate Telegram Cloud Gallery</span>
        </div>

        <h1
          className="animate-fade-in text-5xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.1] mb-8"
          style={{ animationDelay: "100ms" }}
        >
          Unlimited Storage.
          <br className="max-md:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400">
            {" "}Zero Server Fees.
          </span>
        </h1>

        <p
          className="animate-fade-in text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed drop-shadow-sm opacity-0"
          style={{ animationDelay: "200ms" }}
        >
          Turn your Telegram account into a premium, limitless photo gallery. Organize your memories into albums and access them anywhere without ever touching iCloud or Google Photos again.
        </p>

        <div
           className="animate-fade-in-up flex flex-col sm:flex-row items-center gap-4 opacity-0"
           style={{ animationDelay: "300ms" }}
        >
          <button
            onClick={handleGetStarted}
            className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 rounded-full text-white font-bold text-lg transition-all shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] hover:scale-105 active:scale-95 group"
          >
            Start Your Gallery
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <a
            href="#how-it-works"
            className="flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-semibold text-lg transition-all hover:scale-105 active:scale-95"
          >
            <Play className="w-5 h-5 text-slate-300" />
            Watch Demo
          </a>
        </div>

        {/* Hero Image / Mockup */}
        <div
           className="animate-fade-in-up mt-20 relative w-full max-w-5xl rounded-2xl overflow-hidden glass-panel border border-white/10 shadow-2xl p-2 opacity-0"
           style={{ animationDelay: "400ms", animationDuration: "1s" }}
        >
           <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10"></div>
           <div className="w-full bg-slate-950/80 rounded-xl overflow-hidden relative border border-white/5">
             <div className="flex items-center px-4 py-3 bg-slate-900/50 border-b border-white/5">
               <div className="flex gap-2">
                 <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                 <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                 <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
               </div>
               <div className="mx-auto bg-slate-800/50 text-slate-400 text-xs px-4 py-1.5 rounded-md flex items-center gap-2">
                 <Lock className="w-3 h-3" />
                 <span>telephotos.app/dashboard</span>
               </div>
             </div>
             {/* Mock Dashboard Area — local images for zero-latency LCP */}
             <div className="grid grid-cols-2 md:grid-cols-4 backdrop-blur-md">
                {[
                  { src: "/hero/h1.jpg", alt: "Scenic landscape" },
                  { src: "/hero/h2.jpg", alt: "Nature photo" },
                  { src: "/hero/h3.jpg", alt: "Waterfall" },
                  { src: "/hero/h4.jpg", alt: "Flowers" },
                  { src: "/hero/h5.jpg", alt: "Mountain" },
                  { src: "/hero/h6.jpg", alt: "Misty hills" },
                  { src: "/hero/h7.jpg", alt: "Lake view" },
                  { src: "/hero/h8.jpg", alt: "Coastal scene" },
                ].map(({ src, alt }, i) => (
                  <div key={i} className="aspect-[4/3] sm:aspect-square border border-slate-900/50 overflow-hidden bg-slate-800 relative group">
                     <Image
                      src={src}
                      alt={alt}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      priority={i < 4}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                ))}
             </div>
           </div>
        </div>
      </section>


      {/* Features Bento Grid */}
      <section id="features" className="py-24 px-6 relative z-10">
         <div className="max-w-7xl mx-auto">
           <div className="text-center mb-16 max-w-3xl mx-auto">
             <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">Everything you need. <br className="hidden md:block"/> Nothing you don't.</h2>
             <p className="text-slate-400 text-lg">We took the infinite storage power of Telegram and wrapped it in a drop-dead gorgeous, easy-to-use gallery interface.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {BENTO_FEATURES.map((feature, idx) => (
                <div key={idx} className={`p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group relative overflow-hidden ${feature.colSpan}`}>
                   <div className={`absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br ${feature.gradient} opacity-20 blur-3xl group-hover:opacity-40 transition-opacity`}></div>
                   
                   <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform`}>
                     <feature.icon className="w-7 h-7 text-white" />
                   </div>
                   
                   <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{feature.title}</h3>
                   <p className="text-slate-400 leading-relaxed text-sm lg:text-base">
                     {feature.description}
                   </p>
                </div>
              ))}
           </div>
         </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 px-6 bg-slate-900/30 border-y border-white/5">
         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
               <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">How it works</h2>
               <p className="text-lg text-slate-400">Transform your Telegram account into a photo powerhouse in three simple steps. No credit card required, ever.</p>
               
               <div className="space-y-6">
                 {[
                   { title: "Connect Telegram", desc: "Log in securely using your phone number. We strictly use the official API and do not store your data independently." },
                   { title: "Select or Create a Channel", desc: "Pick an existing private channel or create a new one to act as your gallery folder." },
                   { title: "Upload & Browse effortlessly", desc: "Drag and drop photos via our beautiful interface. They instantly sync back to Telegram and your gallery dashboard." }
                 ].map((step, idx) => (
                   <div key={idx} className="flex gap-4 group">
                      <div className="flex flex-col items-center">
                         <div className="w-10 h-10 rounded-full bg-violet-500/20 border border-violet-500/40 text-violet-400 font-bold flex items-center justify-center shrink-0 group-hover:bg-violet-500 group-hover:text-white transition-colors">
                           {idx + 1}
                         </div>
                         {idx !== 2 && <div className="w-[1px] h-full bg-white/10 mt-2"></div>}
                      </div>
                      <div className="pb-6">
                         <h4 className="text-xl font-bold text-slate-200 mb-2">{step.title}</h4>
                         <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                      </div>
                   </div>
                 ))}
               </div>

               <button
                  onClick={handleGetStarted}
                  className="mt-4 px-6 py-3 bg-white text-slate-900 rounded-full font-bold hover:scale-105 active:scale-95 transition-transform"
                >
                  Create your first gallery
                </button>
            </div>

            <div className="flex-1 w-full relative">
               <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/30 to-cyan-600/30 blur-[100px] rounded-full"></div>
               <div className="relative bg-slate-900 border border-white/10 rounded-[2rem] p-4 shadow-2xl glass-panel">
                  <div className="rounded-[1.5rem] bg-slate-950 overflow-hidden relative">
                     {/* Mocked UI for "How it works" */}
                     <div className="p-6 border-b border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 bg-violet-500/20 rounded-xl flex items-center justify-center">
                              <ImagePlus className="w-5 h-5 text-violet-400" />
                           </div>
                           <div>
                              <div className="text-sm font-bold text-white">Upload Photos</div>
                              <div className="text-xs text-slate-400">Drop files anywhere</div>
                           </div>
                        </div>
                        <div className="flex gap-1">
                           <div className="w-2 h-2 rounded-full bg-green-400/80 animate-pulse"></div>
                           <div className="text-xs text-green-400 font-medium">Syncing</div>
                        </div>
                     </div>
                     <div className="p-4 grid grid-cols-3 gap-2 opacity-50">
                        {[1,2,3,4,5,6].map(i => (
                           <div key={i} className="aspect-square bg-slate-800 rounded-lg"></div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>


      {/* FAQ Section */}
      <section id="faq" className="py-24 px-6 relative z-10">
         <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">Frequently Asked Questions</h2>
               <p className="text-lg text-slate-400">Everything you need to know about Telephotos and how we secure your data.</p>
            </div>
            
            <div className="space-y-6">
              {[
                { 
                  q: "Is Telephotos really free?",
                  a: "Yes. By leveraging the official Telegram API, we use your existing Telegram cloud storage. Telegram provides unlimited storage for free, and our gallery interface simply reads it for you."
                },
                {
                  q: "Can you see my photos?",
                  a: "Absolutely not. We have a strict zero-knowledge architecture. Your images are hosted directly on Telegram's servers and we never download or save them to our databases. We act merely as a frontend viewer."
                },
                {
                  q: "Are my files compressed?",
                  a: "Telegram does offer compression for fast chat sharing, but if you upload files as documents, they remain fully uncompressed. Telephotos supports highest-quality media streaming directly to your browser."
                },
                {
                  q: "What happens if I stop using Telephotos?",
                  a: "You lose absolutely nothing. Because all your photos are securely uploaded to your private Telegram Channels or Saved Messages, you can easily view, download, or delete them inside the official Telegram app at any time."
                }
              ].map((faq, idx) => (
                <div key={idx} className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 hover:bg-slate-800/50 transition-colors">
                   <h3 className="text-xl font-bold text-white mb-2">{faq.q}</h3>
                   <p className="text-slate-400 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
         </div>
      </section>

      {/* Massive SEO Context Explanation Block */}
      <section className="py-24 px-6 bg-slate-900/30 border-t border-b border-white/5 relative z-10">
         <div className="max-w-4xl mx-auto prose prose-invert lg:prose-xl prose-headings:text-white prose-p:text-slate-400 prose-a:text-cyan-400">
            <h2 className="text-4xl font-extrabold mb-8">Unleashing the True Potential of Cloud Storage with Telephotos</h2>
            <p>
              In today's fast-paced digital era, our smartphones and digital cameras are capturing moments with unprecedented detail. Each high-resolution photograph, each sweeping 4K panoramic video, and each consecutive burst mode sequence consumes massive chunks of binary data. The result? We are constantly running into arbitrary storage limits imposed by major tech conglomerates. We are told that we must upgrade, that we must pay a recurring monthly subscription fee indefinitely just to retain our own memories. Telephotos exists to challenge this exact paradigm. By fundamentally rethinking how cloud storage can be accessed and utilized, Telephotos delivers an unparalleled, infinite photo gallery experience completely free of arbitrary subscription walls.
            </p>
            <p>
              The core innovation behind Telephotos is surprisingly elegant. Rather than attempting to build and monopolize a massive array of expensive server farms—costs which would ultimately be passed down to you, the user—Telephotos leverages the world's most generous, heavily optimized, and decentralized messaging infrastructure: the official Telegram network. For years, Telegram has offered its users unlimited cloud storage in the form of "Saved Messages" and private, encrypted channels. Millions of people have attempted to use these chat interfaces to back up their family photos and work documents. However, a chat interface is inherently linear. It is designed for messaging, not for media archiving. Scrolling backwards through thousands of messages to find a single photograph from years ago is a deeply frustrating user experience. It lacks the visual hierarchy, the lazy-loaded grids, and the album-based organization of a true gallery app.
            </p>
            
            <h3 className="text-2xl font-bold mt-12 mb-4">A Zero-Knowledge Bridge to Infinite Storage</h3>
            <p>
              Telephotos acts as a sophisticated, bridge-like frontend. When you authenticate with our web application, you do so using your own Telegram credentials. We do not create a proprietary account for you; we utilize the secure, official MTProto API to request a local session right on your browser. This establishes a zero-knowledge architecture. Our database servers do not ingest, copy, or retain your raw photographs. The bits and bytes flow directly from your device, through temporary routing tunnels, straight into the encrypted vault of your Telegram channels. Because we do not store your data, we cannot scan your data. We cannot sell your metadata to advertising agencies, nor can we algorithmically analyze your facial features for demographic profiling. Your privacy remains absolute, bounded by the industry-leading encryption standards set forth by the Telegram network itself.
            </p>
            <p>
              Furthermore, the structural mechanism of Telephotos ensures that your data remains fundamentally uncompressed. This is a critical distinction in the cloud storage market. Many popular platforms, such as Google Photos or Apple iCloud, employ aggressive lossy compression algorithms on their free or low-tier plans to save server space. They analyze your crisp, beautiful RAW image and reduce its color depth, strip away vital EXIF metadata like timestamps and geographical coordinates, and compress the pixel density. A 15-megabyte photograph might be quietly reduced to a 2-megabyte approximation. With Telephotos, you upload your imagery 'as documents' via the Telegram API, which explicitly signals the network to bypass any visual compression algorithms entirely. What you upload into Telephotos is a mathematically identical bit-for-bit copy. You get the peace of mind knowing that when you download these files a decade from now, they will contain the exact data they had the moment the camera shutter clicked.
            </p>

            <h3 className="text-2xl font-bold mt-12 mb-4">Engineered for Velocity and Reliability</h3>
            <p>
              Building a buttery-smooth viewing experience on top of a decentralized chat protocol requires intense technical optimization. If Telephotos attempted to download and render 50 uncompressed 15-megabyte photos simultaneously onto your screen, your browser tab would immediately crash from memory exhaustion, and your mobile data plan would be entirely vaporized in seconds. To solve this, Telephotos implements aggressive, dynamic asynchronous rendering utilizing the BlurHash algorithm and lightweight thumbnail generation. When you upload a picture, the API generates a microscopic blurred preview placeholder alongside a highly optimized compressed thumbnail. As you scroll through your Telephotos gallery grid, only these ultra-lightweight thumbnails are rendered. The grid behaves instantly, providing a seamless visual collage of your albums. 
            </p>
            <p>
              It is only when you actively click on a specific thumbnail to view the image in full-screen mode that the application fetches the massive, uncompressed original file from the Telegram cloud. This sophisticated architecture ensures that navigating through thousands of family memories feels as instant and tactile as a native operating system application native to your iPhone or Android, completely masking the complex decentralized network humming beneath the surface.
            </p>

            <h3 className="text-2xl font-bold mt-12 mb-4">Reclaiming Your Digital Independence</h3>
            <p>
              Perhaps the most profound benefit of using Telephotos is the total eradication of vendor lock-in. When you entrust your entire photo library to closed ecosystems, attempting to migrate to a competing platform is made intentionally arduous. Export tools are often slow, buggy, or deliver disorganized 'Takeout' zip files peppered with confusing JSON metadata fragments. Cloud providers know that the longer they hold your data, the harder it is for you to leave their ecosystem, practically guaranteeing that you will eventually upgrade to a higher paid subscription tier out of sheer exhaustion and convenience.
            </p>
            <p>
              Telephotos destroys this dynamic. Because every album you create and every photo you upload via Telephotos simply corresponds to a native Telegram private channel, your data exists independently of our web interface. If tomorrow you decide you no longer wish to use the Telephotos dashboard, you simply close the tab. You lose nothing. All of your photos, meticulously organized in the channels you created, remain safely tucked inside your standard Telegram application. You can view them on your desktop, forward them to friends in normal chats, or highlight thousands of them and click 'Save to Downloads' flawlessly. You use Telephotos solely because the gallery interface is gorgeous, fast, and highly functional, not because your files are held hostage behind a proprietary wall. 
            </p>

            <h3 className="text-2xl font-bold mt-12 mb-4">Empowering Photographers, Travelers, and Families Alike</h3>
            <p>
              This boundless capacity unlocks new, expansive use cases that were previously financially unviable for ordinary consumers. Professional photographers out on major shoots can use Telephotos as a rapid proxy dump, sending raw files securely to the cloud without monitoring an artificial quota bar. Heavy travelers and content creators capturing constant 4K vlogs can synchronize their media instantaneously, confident that dropping a 2-gigabyte file into a private channel folder will execute reliably. And for the everyday family user, it represents an end to anxiety—an end to manually triaging and deleting old memories simply to make room for a new holiday video.
            </p>
            <p>
              Ultimately, Telephotos is more than just a gallery interface; it is a movement towards data ownership. We believe that your digital history should belong to you, without strings attached, without compression, and without monthly rent. By marrying the profound technological achievements of the Telegram API with a world-class, design-forward interface, Telephotos offers the definitive solution for next-generation infinite cloud storage. Join us in reclaiming your digital independence today, and transform the way you interact with your memories forever.
            </p>
         </div>
      </section>

      {/* Footer CTA */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">Ready to ditch iCloud limits?</h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Join Telephotos today and reclaim your storage space using the secure infrastructure of Telegram.
          </p>
          <button
              onClick={handleGetStarted}
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-full text-white font-bold text-xl transition-all shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_50px_rgba(6,182,212,0.5)] hover:scale-105 active:scale-95"
            >
              Start for Free
              <Rocket className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Footer Links */}
      <PublicFooter />
    </div>
  );
}
