"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy submit
    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 py-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Us</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
             Need support with your galleries? Have a feature request? We normally reply within a few hours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl">
           
           <div className="space-y-8 glass-panel border border-white/10 p-8 rounded-3xl bg-slate-900/50 h-fit">
              <h2 className="text-2xl font-bold text-white tracking-tight">Get in touch</h2>
              <p className="text-slate-400">
                You can reach us through our official support channels below or send us a quick mail through the form to your right.
              </p>
              
              <div className="flex items-center gap-4 group">
                 <div className="flex-shrink-0 w-12 h-12 rounded-full border border-violet-500/20 bg-violet-500/10 flex items-center justify-center group-hover:bg-violet-500/20 transition-colors">
                   <Mail className="w-5 h-5 text-violet-400" />
                 </div>
                 <div>
                    <h3 className="text-slate-200 font-semibold mb-1">Email</h3>
                    <a href="mailto:support@telephotos.app" className="text-slate-400 hover:text-white transition-colors">support@telephotos.app</a>
                 </div>
              </div>

              <div className="flex items-center gap-4 group">
                 <div className="flex-shrink-0 w-12 h-12 rounded-full border border-cyan-500/20 bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                   <MessageCircle className="w-5 h-5 text-cyan-400" />
                 </div>
                 <div>
                    <h3 className="text-slate-200 font-semibold mb-1">Telegram Helpdesk</h3>
                    <a href="https://t.me/telephotos_support" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">@telephotos_support</a>
                 </div>
              </div>

              <div className="flex items-center gap-4 group">
                 <div className="flex-shrink-0 w-12 h-12 rounded-full border border-emerald-500/20 bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                   <MapPin className="w-5 h-5 text-emerald-400" />
                 </div>
                 <div>
                    <h3 className="text-slate-200 font-semibold mb-1">Office Location</h3>
                    <span className="text-slate-400">Developer Cloud St, Block 8, Tech City</span>
                 </div>
              </div>
           </div>

           <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-[2rem] shadow-xl">
             <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300">Your Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-slate-950 border border-white/5 text-slate-200 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all font-medium placeholder:text-slate-600"
                  placeholder="John Doe"
                />
             </div>
             <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-slate-950 border border-white/5 text-slate-200 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all font-medium placeholder:text-slate-600"
                  placeholder="name@company.com"
                />
             </div>
             <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300">Message</label>
                <textarea 
                  required
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full min-h-[140px] bg-slate-950 border border-white/5 text-slate-200 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all font-medium placeholder:text-slate-600 resize-none"
                  placeholder="How can we help you?"
                />
             </div>
             
             {submitted ? (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 font-medium text-center">
                 Thanks for reaching out! We will get back to you soon.
               </motion.div>
             ) : (
               <button 
                 type="submit" 
                 className="w-full py-4 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] active:scale-95"
               >
                 Send Message
               </button>
             )}
           </form>

        </div>
      </div>
    </div>
  );
}
