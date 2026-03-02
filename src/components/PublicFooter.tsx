import Image from "next/image";
import Link from "next/link";

export function PublicFooter() {
  return (
    <footer className="py-12 px-6 border-t border-white/5 relative z-10 bg-[#020617]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg overflow-hidden ring-1 ring-white/10 bg-slate-900">
             <Image src="/logo.png" alt="Telephotos Logo" width={32} height={32} className="w-full h-full object-cover" />
          </div>
          <span className="font-bold text-lg text-white">Telephotos</span>
        </div>
        
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-6 text-sm font-medium text-slate-400">
          <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
          <Link href="/features" className="hover:text-white transition-colors">Features</Link>
          <Link href="/how-it-works" className="hover:text-white transition-colors">How it Works</Link>
          <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
          <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
        </div>

        <div className="text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Telephotos. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
