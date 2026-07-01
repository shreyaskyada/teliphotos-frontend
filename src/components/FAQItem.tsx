"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItemProps {
  faq: { q: string; a: string };
  large?: boolean;
}

export function FAQItem({ faq, large = false }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={`bg-slate-900/50 border border-white/5 rounded-2xl transition-all duration-300 overflow-hidden ${
        isOpen ? 'bg-white/[0.04] border-white/10 shadow-[0_0_30px_rgba(139,92,246,0.1)]' : 'hover:bg-white/[0.02]'
      }`}
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full text-left flex items-center justify-between focus:outline-none gap-4 group ${
          large ? 'p-6 sm:p-8' : 'p-6'
        }`}
      >
        {large ? (
          <h2 className={`text-xl sm:text-2xl font-bold transition-colors ${isOpen ? 'text-violet-300' : 'text-white group-hover:text-violet-200'}`}>
            {faq.q}
          </h2>
        ) : (
          <h3 className={`text-xl font-bold transition-colors ${isOpen ? 'text-violet-300' : 'text-white group-hover:text-violet-200'}`}>
            {faq.q}
          </h3>
        )}
        <div className={`rounded-full flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-all duration-300 flex-shrink-0 ${
          large 
            ? `w-10 h-10 ${isOpen ? 'rotate-180 bg-violet-500/20 text-violet-300' : 'text-slate-400'}`
            : `w-8 h-8 ${isOpen ? 'rotate-180 bg-violet-500/20 text-violet-300' : 'text-slate-400'}`
        }`}>
          <ChevronDown className={large ? "w-6 h-6" : "w-5 h-5"} />
        </div>
      </button>
      <div 
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className={large ? "px-6 sm:px-8 pb-6 sm:pb-8" : "px-6 pb-6"}>
            {large && <div className="w-12 h-1 bg-violet-500/50 mb-4 rounded-full"></div>}
            <p className={`text-slate-400 leading-relaxed ${large ? 'text-lg' : ''}`}>
              {faq.a}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
