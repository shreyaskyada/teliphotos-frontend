import Link from "next/link";



export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-white mb-6">Terms of Service</h1>
        <p>Last updated: February 24, 2025</p>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">1. Agreement to Terms</h2>
          <p>
            By accessing or using Telephotos at telephotos.app (the &quot;Service&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, you should not use the Service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">2. Description of Service</h2>
          <p>
            Telephotos is a photo gallery application that integrates with Telegram. The Service allows you to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Log in using your Telegram account.</li>
            <li>Create Telegram channels for organizing your photos.</li>
            <li>Upload photos to your personal Telegram channels through our interface.</li>
            <li>Browse and view your Telegram channel photos in a gallery format.</li>
          </ul>
          <p>
            Your photos are stored in your own Telegram channel. Telephotos does not store, host, or have ownership of your photo files. We only store basic metadata (such as photo file IDs and timestamps) to provide the gallery functionality.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">3. User Accounts and Telegram Login</h2>
          <p>
            To use the Service, you must log in with a valid Telegram account. You are responsible for:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Maintaining the security of your Telegram account credentials.</li>
            <li>All activities that occur under your account.</li>
            <li>Immediately notifying us if you suspect any unauthorized use of your account.</li>
          </ul>
          <p>
            We do not store your Telegram password. Authentication is handled through Telegram&apos;s secure login process.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">4. User Responsibilities</h2>
          <p>
            When using our Service, you agree to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Only upload photos that you own or have the right to use.</li>
            <li>Not upload illegal, harmful, obscene, or otherwise objectionable content.</li>
            <li>Not use the Service for spamming, phishing, or distributing malware.</li>
            <li>Comply with Telegram&apos;s Terms of Service and any applicable laws.</li>
            <li>Not attempt to disrupt, interfere with, or compromise the Service&apos;s infrastructure.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">5. Intellectual Property</h2>
          <p>
            The Service, including its design, code, features, and content (excluding user-generated content), is owned by Telephotos and is protected by applicable intellectual property laws. You retain full ownership of the photos you upload through the Service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">6. Photo Storage and Data</h2>
          <p>
            Your photos are uploaded directly to your own Telegram channel. Telephotos does not:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Store, host, or back up your photo files on our servers.</li>
            <li>Access, view, or modify the content of your photos.</li>
            <li>Share your photos with third parties.</li>
          </ul>
          <p>
            You are responsible for managing your photos through your Telegram account. If you delete photos from your Telegram channel, they will no longer be accessible through our Service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">7. Third-Party Services and Advertising</h2>
          <p>
            Our Service integrates with and may display content from third-party services:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Telegram:</strong> The Service relies on Telegram&apos;s API for authentication and photo channel management. Your use of Telegram is subject to their terms and policies.</li>
            <li><strong>Google AdSense:</strong> The Service displays advertisements through Google AdSense. Google may collect data and use cookies as described in their privacy policy. For more details, refer to our <a href="/privacy" className="text-violet-400 hover:text-cyan-400 transition-colors underline">Privacy Policy</a>.</li>
          </ul>
          <p>
            We are not responsible for the practices or content of third-party services.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">8. Disclaimers</h2>
          <p>
            The Service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied. We do not guarantee that:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>The Service will be uninterrupted, error-free, or secure.</li>
            <li>Any data stored in your Telegram channel will be preserved (this is managed by Telegram).</li>
            <li>The Service will meet your specific requirements.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">9. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, Telephotos shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of data, profits, or goodwill, arising from your use of the Service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">10. Termination</h2>
          <p>
            We may terminate or suspend your access to the Service at our sole discretion, without prior notice, for any reason, including if you breach these Terms. Upon termination, we will delete the metadata associated with your account from our database. Your photos will remain in your Telegram channel, as we do not control them.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">11. Changes to These Terms</h2>
          <p>
            We reserve the right to update or modify these Terms at any time. Changes will be effective when posted on this page with an updated &quot;Last updated&quot; date. Your continued use of the Service after any changes constitutes acceptance of the new Terms.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">12. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of India, without regard to conflict of law principles.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">13. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <p>
            Email: <a href="mailto:telephotos.app@gmail.com" className="text-violet-400 hover:text-cyan-400 transition-colors underline">telephotos.app@gmail.com</a>
          </p>
        </section>

        <div className="pt-8 flex justify-center mt-12">
            <Link href="/" className="text-violet-400 hover:text-cyan-400 transition-colors">
              &larr; Back to Home
            </Link>
        </div>
      </div>
    </div>
  );
}
