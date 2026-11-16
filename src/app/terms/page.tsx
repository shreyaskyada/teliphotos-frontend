import { PublicFooter } from "@telephotos/components/PublicFooter";
import { PublicNavbar } from "@telephotos/components/PublicNavbar";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200">
      <PublicNavbar />

      <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-white mb-6">Terms of Service</h1>
        <p className="text-slate-400">Last updated: November 16, 2026</p>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">1. Agreement to Terms</h2>
          <p className="text-slate-400 leading-relaxed">
            By accessing or using Telephotos at telephotos.app (the &quot;Service&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;) and our <a href="/privacy" className="text-violet-400 hover:text-cyan-400 transition-colors underline">Privacy Policy</a>. If you do not agree to these Terms, you should not use the Service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">2. Description of Service</h2>
          <p className="text-slate-400 leading-relaxed">
            Telephotos is a photo gallery application that integrates with Telegram. The Service allows you to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-400 leading-relaxed">
            <li>Log in using your Telegram account.</li>
            <li>Create Telegram channels for organizing your photos.</li>
            <li>Upload photos and videos to your personal Telegram channels through our interface.</li>
            <li>Browse and view the media in your Telegram channels in a gallery format.</li>
          </ul>
          <p className="text-slate-400 leading-relaxed">
            Your original files are stored in your own Telegram channels. Telephotos does not keep permanent copies of your media and does not claim ownership of it. Our servers process your media briefly to provide the Service, as described in our <a href="/privacy" className="text-violet-400 hover:text-cyan-400 transition-colors underline">Privacy Policy</a>.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">3. Unofficial App</h2>
          <p className="text-slate-400 leading-relaxed">
            Telephotos is an independent, unofficial app built on the Telegram API. It is not affiliated with, endorsed by, or sponsored by Telegram. &quot;Telegram&quot; is a trademark of its respective owner. Telegram may change or restrict its API or services at any time, which may affect or end the availability of Telephotos.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">4. Eligibility</h2>
          <p className="text-slate-400 leading-relaxed">
            You must be at least 18 years old to use the Service. By using the Service, you confirm that you meet this requirement and that you are allowed to use Telegram under Telegram&apos;s own terms.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">5. User Accounts and Telegram Login</h2>
          <p className="text-slate-400 leading-relaxed">
            To use the Service, you must log in with a valid Telegram account. Logging in creates a Telegram session for Telephotos, which you can see and end at any time in Telegram &rarr; Settings &rarr; Devices, or by logging out of Telephotos. You are responsible for:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-400 leading-relaxed">
            <li>Maintaining the security of your Telegram account and devices.</li>
            <li>All activities that occur under your account.</li>
            <li>Immediately notifying us if you suspect any unauthorized use of your account.</li>
          </ul>
          <p className="text-slate-400 leading-relaxed">
            We never ask for or store your Telegram cloud password. We store the login session Telegram issues so that the Service can work, and we use it only as described in our <a href="/privacy" className="text-violet-400 hover:text-cyan-400 transition-colors underline">Privacy Policy</a>.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">6. User Responsibilities</h2>
          <p className="text-slate-400 leading-relaxed">
            When using our Service, you agree to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-400 leading-relaxed">
            <li>Only upload photos and videos that you own or have the right to use.</li>
            <li>Not upload illegal content, including child sexual abuse material, non-consensual intimate imagery, or content that infringes someone else&apos;s rights.</li>
            <li>Not upload harmful, obscene, or otherwise objectionable content.</li>
            <li>Not use the Service for spamming, phishing, or distributing malware.</li>
            <li>Comply with Telegram&apos;s Terms of Service and any applicable laws.</li>
            <li>Not attempt to disrupt, interfere with, or compromise the Service&apos;s infrastructure.</li>
          </ul>
          <p className="text-slate-400 leading-relaxed">
            We may suspend access and report content to the relevant authorities where the law requires it.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">7. Intellectual Property</h2>
          <p className="text-slate-400 leading-relaxed">
            The Service, including its design, code, features, and content (excluding user-generated content), is owned by Telephotos and is protected by applicable intellectual property laws. You retain full ownership of the photos and videos you upload through the Service. You grant us only the limited permission needed to process, transmit, and display your media to you in order to provide the Service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">8. Copyright Complaints</h2>
          <p className="text-slate-400 leading-relaxed">
            If you believe content handled through the Service infringes your copyright, email us at the address below with: a description of the work, where the content appears, your contact details, and a statement that you have a good-faith belief the use is unauthorized and that the information in your notice is accurate. Because media is stored in users&apos; Telegram channels, you may also report it to Telegram directly. We may suspend accounts that repeatedly infringe.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">9. Photo Storage and Data</h2>
          <p className="text-slate-400 leading-relaxed">
            Your photos and videos are uploaded through our servers to your own Telegram channel. Telephotos does not:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-400 leading-relaxed">
            <li>Keep permanent copies or backups of your media on our servers (temporary files and cached thumbnails are deleted automatically).</li>
            <li>Manually view, edit, or curate your media.</li>
            <li>Share your media with third parties, including advertisers.</li>
          </ul>
          <p className="text-slate-400 leading-relaxed">
            You are responsible for managing your media through your Telegram account. If you delete media from your Telegram channel, it will no longer be accessible through our Service. Storage is provided by Telegram and is subject to Telegram&apos;s limits and policies, such as file-size limits and rate limits, which may change at any time.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">10. Telegram Account Risks</h2>
          <p className="text-slate-400 leading-relaxed">
            Your Telegram account is governed by Telegram&apos;s terms, not ours. Telegram may rate-limit, restrict, or suspend accounts at its discretion, including accounts that upload large volumes of files through third-party apps. We are not responsible for any action Telegram takes on your account. Keep your own copies of anything you cannot afford to lose.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">11. Advertising and Monetization</h2>
          <p className="text-slate-400 leading-relaxed">
            The Service is free to use and is funded by advertising. We display:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-400 leading-relaxed">
            <li><strong>Google AdSense</strong> ads on our public pages.</li>
            <li><strong>Banner ads from other third-party advertising networks</strong> across the Service, including inside the gallery.</li>
          </ul>
          <p className="text-slate-400 leading-relaxed">
            These are the only ways we make money from the Service. We do not sell your data, and ads are never based on the content of your photos. Advertising partners may use cookies as described in our <a href="/privacy" className="text-violet-400 hover:text-cyan-400 transition-colors underline">Privacy Policy</a>.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">12. Third-Party Services</h2>
          <p className="text-slate-400 leading-relaxed">
            The Service relies on Telegram&apos;s API for authentication and storage, and on other third-party providers to operate. Your use of Telegram is subject to Telegram&apos;s terms and policies. We are not responsible for the practices or content of third-party services, including the content of third-party ads.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">13. Disclaimers</h2>
          <p className="text-slate-400 leading-relaxed">
            The Service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied. We do not guarantee that:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-400 leading-relaxed">
            <li>The Service will be uninterrupted, error-free, or secure.</li>
            <li>Any data stored in your Telegram channel will be preserved (this is managed by Telegram).</li>
            <li>The Service will meet your specific requirements.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">14. Limitation of Liability</h2>
          <p className="text-slate-400 leading-relaxed">
            To the fullest extent permitted by law, Telephotos shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of data, profits, or goodwill, arising from your use of the Service. Nothing in these Terms limits any liability that cannot be limited under applicable law.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">15. Termination</h2>
          <p className="text-slate-400 leading-relaxed">
            You can stop using the Service at any time by logging out and ending the Telephotos session in Telegram. We may terminate or suspend your access to the Service at our sole discretion, without prior notice, including if you breach these Terms. Upon termination, we will delete the data associated with your account from our systems, except where we must keep it to comply with the law. Your photos will remain in your Telegram channel, as we do not control them.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">16. Changes to These Terms</h2>
          <p className="text-slate-400 leading-relaxed">
            We reserve the right to update or modify these Terms at any time. Changes will be effective when posted on this page with an updated &quot;Last updated&quot; date. Your continued use of the Service after any changes constitutes acceptance of the new Terms.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">17. Governing Law</h2>
          <p className="text-slate-400 leading-relaxed">
            These Terms shall be governed by and construed in accordance with the laws of India, without regard to conflict of law principles. This does not take away any mandatory consumer protections you have under the laws of the country where you live.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">18. Contact Us</h2>
          <p className="text-slate-400 leading-relaxed">
            If you have any questions about these Terms, or want to send a copyright or abuse report, please contact us at:
          </p>
          <p className="text-slate-400 leading-relaxed">
            Email: <a href="mailto:telephotos.app@gmail.com" className="text-violet-400 hover:text-cyan-400 transition-colors underline">telephotos.app@gmail.com</a>
          </p>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
