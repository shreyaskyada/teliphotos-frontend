"use client";

import { motion } from "framer-motion";
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
import Link from "next/link";
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
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-slate-950/80 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden ring-1 ring-white/10 group-hover:ring-violet-500/50 transition-all">
              <Image src="/logo.png" alt="Telephotos Logo" width={40} height={40} className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white group-hover:text-violet-200 transition-colors">
              Telephotos
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleGetStarted}
              className="px-5 py-2.5 bg-white text-slate-900 hover:bg-slate-200 rounded-full font-semibold text-sm transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:scale-105 active:scale-95"
            >
              Get Started
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center header-content">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-violet-300 text-sm font-medium mb-8 hover:bg-white/10 transition-colors cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>The Ultimate Telegram Cloud Gallery</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.1] mb-8"
        >
          Unlimited Storage.
          <br className="max-md:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400">
            {" "}Zero Server Fees.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed drop-shadow-sm"
        >
          Turn your Telegram account into a premium, limitless photo gallery. Organize your memories into albums and access them anywhere without ever touching iCloud or Google Photos again.
        </motion.p>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.3 }}
           className="flex flex-col sm:flex-row items-center gap-4"
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
        </motion.div>

        {/* Hero Image / Mockup */}
        <motion.div
           initial={{ opacity: 0, y: 80 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
           className="mt-20 relative w-full max-w-5xl rounded-2xl overflow-hidden glass-panel border border-white/10 shadow-2xl p-2"
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
             {/* Mock Dashboard Area */}
             <div className="grid grid-cols-2 md:grid-cols-4 backdrop-blur-md">
                {[
                  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=400",
                  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=400",
                  "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&q=80&w=400",
                  "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&q=80&w=400",
                  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=400",
                  "https://images.unsplash.com/photo-1470071131384-001b85755536?auto=format&fit=crop&q=80&w=400",
                  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=400",
                  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=400"
                ].map((src, i) => (
                  <div key={i} className="aspect-[4/3] sm:aspect-square border border-slate-900/50 overflow-hidden bg-slate-800 relative group">
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                     <img src={src} alt="Gallery Mockup" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                ))}
             </div>
           </div>
        </motion.div>
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
      <footer className="py-12 px-6 border-t border-white/5 relative z-10 bg-[#020617]">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
               <Image src="/logo.png" alt="Telephotos Logo" width={32} height={32} />
               <span className="font-bold text-lg text-white">Telephotos</span>
            </div>
            
            <div className="flex items-center gap-8 text-sm font-medium text-slate-400">
               <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
               <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
               <a href="mailto:support@telephotos.app" className="hover:text-white transition-colors">Contact</a>
            </div>

            <div className="text-sm text-slate-500">
               &copy; {new Date().getFullYear()} Telephotos. All rights reserved.
            </div>
         </div>
      </footer>
    </div>
  );
}
