

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
           <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
             About <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Telephotos</span>
           </h1>
           <p className="text-lg text-slate-400 max-w-2xl mx-auto">
             Redefining how you store and secure your personal memories using the power of Telegram.
           </p>
        </div>

        <div className="space-y-8 bg-slate-900/50 p-8 rounded-3xl border border-white/10 glass-panel">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Our Mission</h2>
            <p className="text-slate-400 leading-relaxed">
              At Telephotos, we believe that everyone deserves unlimited, reliable, and highly secure storage for their digital memories without the burden of expensive monthly cloud subscriptions. Traditional cloud providers lock your photos behind paywalls and strict storage tiers. Our mission is to democratize secure photo storage by bridging intuitive gallery interfaces with the unmatched, free data storage capabilities provided by Telegram's cloud network.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Why We Built This</h2>
            <p className="text-slate-400 leading-relaxed">
              The idea for Telephotos was born out of frustration with "Storage Full" notifications. While Telegram offers an incredible "Saved Messages" and private channel feature to store unlimited files for free, navigating thousands of photos in a chat interface is tedious and unorganized. 
            </p>
            <p className="text-slate-400 leading-relaxed">
              We built Telephotos as a beautiful layer on top of Telegram. It acts as an interactive dashboard that securely reads your private media channels and displays them as a lightning-fast, modern photo grid. We handle the heavy lifting of parsing, thumbnail generation, and uploading—you just enjoy your memories.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Privacy by Design</h2>
            <p className="text-slate-400 leading-relaxed">
              We operate under a strict "Zero Host" policy. Telephotos does not store your images, videos, or messages on our own database servers. Our backend strictly acts as a pipeline to the official Telegram infrastructure. Your files live only inside your encrypted Telegram channels, to which only you have access.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Get in Touch</h2>
            <p className="text-slate-400 leading-relaxed">
              We are a team of passionate developers aiming to build the best alternative gallery app. If you have any questions, feedback, or need support, we are always eager to hear from our users.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
