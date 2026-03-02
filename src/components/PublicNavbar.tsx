"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function PublicNavbar() {
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
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-slate-950/80 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl overflow-hidden ring-1 ring-white/10 group-hover:ring-violet-500/50 transition-all bg-slate-900">
            <Image src="/logo.png" alt="Telephotos Logo" width={40} height={40} className="w-full h-full object-cover" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white group-hover:text-violet-200 transition-colors">
            Telephotos
          </span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
          <Link href="/features" className="hover:text-white transition-colors">Features</Link>
          <Link href="/how-it-works" className="hover:text-white transition-colors">How it Works</Link>
          <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
          <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
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
  );
}
