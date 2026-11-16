import { PublicFooter } from "@telephotos/components/PublicFooter";
import { PublicNavbar } from "@telephotos/components/PublicNavbar";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200">
      <PublicNavbar />

      <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-white mb-6">Privacy Policy</h1>
        <p className="text-slate-400">Last updated: November 16, 2026</p>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">1. Introduction</h2>
          <p className="text-slate-400 leading-relaxed">
            Welcome to Telephotos (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We operate the website telephotos.app (the &quot;Service&quot;). We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains, in plain terms, what information we collect, why we collect it, how long we keep it, who we share it with, and the rights you have over it.
          </p>
          <p className="text-slate-400 leading-relaxed">
            Telephotos is an independent, unofficial app built on the Telegram API. It is not affiliated with, endorsed by, or sponsored by Telegram.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">2. What Our Service Does</h2>
          <p className="text-slate-400 leading-relaxed">
            Telephotos is a photo gallery application that works with Telegram. When you use our Service:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-400 leading-relaxed">
            <li>You log in using your Telegram account.</li>
            <li>You can create Telegram channels through our interface to organize your photos.</li>
            <li>You can upload photos and videos, which are stored in your own Telegram channels.</li>
            <li>Our Service provides a gallery view to browse the media in those channels.</li>
          </ul>
          <p className="text-slate-400 leading-relaxed">
            <strong>Important:</strong> Your original photos and videos are stored permanently in your own Telegram channels, not on our servers. To make the gallery work, our servers do process your media briefly, as described in Section 3. We never sell your photos, never use them for advertising, and never use them to train artificial intelligence or machine-learning models.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">3. Data We Collect</h2>
          <p className="text-slate-400 leading-relaxed">
            We collect and store the following information:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-400 leading-relaxed">
            <li><strong>Telegram Account Information:</strong> Your phone number and Telegram account identifiers (such as your user ID and username), as provided during Telegram login.</li>
            <li><strong>Telegram Login Session:</strong> When you log in, Telegram creates an authorized session for Telephotos, similar to logging in to Telegram on a new device. We store this session on our servers so the Service can act on your behalf, including in the background (for example, to generate thumbnails). A Telegram session technically grants access to your Telegram account. We only use it to create, list, and delete the channels you manage through Telephotos, and to upload, list, download, and delete media in those channels. We do not read your private chats, contacts, or messages outside those channels. You can end this session at any time by logging out of Telephotos or from Telegram &rarr; Settings &rarr; Devices.</li>
            <li><strong>Channel Metadata:</strong> Information about the channels you create through our Service, such as the channel ID, the access identifier Telegram issues for it, and the channel name.</li>
            <li><strong>Photo and Video Metadata:</strong> Reference information such as Telegram message and file IDs, file types, dimensions, upload timestamps, and related media details returned by Telegram, which allow us to display your gallery.</li>
            <li><strong>Media While It Is Being Processed:</strong> When you upload a file, it passes through our servers on its way to Telegram and is temporarily saved to disk while it is prepared (for example, HEIC photos are converted to JPEG so they display everywhere). These temporary files are deleted once the upload to Telegram finishes. To make the gallery load quickly, we also generate small preview thumbnails and cache them with our storage provider for about one hour before they are automatically deleted. This processing is fully automated; we do not manually view your media.</li>
            <li><strong>Technical Data:</strong> IP address, browser type, device information, and usage data such as pages visited, collected through server logs and privacy-friendly website analytics. Server logs are rotated automatically and kept only as long as needed for troubleshooting and security.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">4. How We Use Your Data</h2>
          <p className="text-slate-400 leading-relaxed">
            We use the collected data for the following purposes:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-400 leading-relaxed">
            <li>To authenticate you via your Telegram account and provide access to the Service.</li>
            <li>To upload, organize, and display the media in your Telegram channels.</li>
            <li>To generate thumbnails and keep the gallery fast.</li>
            <li>To keep the Service secure, prevent abuse, and fix problems.</li>
            <li>To measure and improve the Service.</li>
            <li>To show advertisements that keep the Service free (see Section 7).</li>
            <li>To comply with legal obligations.</li>
          </ul>
          <p className="text-slate-400 leading-relaxed">
            Where data protection laws require a legal basis, we rely on: performing our agreement with you (providing the Service), our legitimate interests (security, troubleshooting, and improving the Service), your consent (personalized advertising where consent is required), and compliance with legal obligations. We do not sell your personal data.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">5. Data Security</h2>
          <p className="text-slate-400 leading-relaxed">
            We take reasonable technical and organizational measures to protect your data. Connections to our Service use encrypted HTTPS, Telegram login sessions are encrypted at rest on our servers, access to our systems is restricted, and cached thumbnails are deleted automatically. However, no method of transmission over the Internet or electronic storage is 100% secure. Your original media is stored in your Telegram channels and is also subject to Telegram&apos;s security measures. Telephotos is not an end-to-end encrypted service. If a data breach affects your personal data, we will notify you and the relevant authorities where the law requires it.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">6. Third-Party Services</h2>
          <p className="text-slate-400 leading-relaxed">
            We share data only with the service providers we need to run the Service, and only for that purpose:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-400 leading-relaxed">
            <li><strong>Telegram:</strong> We use Telegram&apos;s API to log you in and to store and retrieve the media in your channels. Your use of Telegram is subject to <a href="https://telegram.org/privacy" className="text-violet-400 hover:text-cyan-400 transition-colors underline" target="_blank" rel="noopener noreferrer">Telegram&apos;s Privacy Policy</a>.</li>
            <li><strong>Infrastructure providers:</strong> We use hosting, database, job-queue, and storage providers (including Cloudflare for temporary thumbnail storage and Vercel for website hosting and analytics) to operate the Service. They process data on our behalf and may store it outside your country.</li>
            <li><strong>Advertising partners:</strong> Google AdSense and other third-party advertising networks display ads on the Service (see Section 7). We never share your photos, videos, or Telegram session with advertising partners.</li>
            <li><strong>Legal requirements:</strong> We may disclose information if required by law, or to protect the rights, safety, and security of our users, the public, or the Service.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">7. Advertising, Cookies and Tracking</h2>
          <p className="text-slate-400 leading-relaxed">
            Telephotos is free because it shows advertisements. Google AdSense ads appear on our public pages, and banner ads from other third-party advertising networks may appear across the Service, including inside the gallery. Ads are never based on the content of your photos.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-400 leading-relaxed">
            <li><strong>Essential Storage:</strong> Required for the Service to function, such as the authentication tokens that keep you logged in.</li>
            <li><strong>Advertising Cookies:</strong> Third-party vendors, including Google, use cookies and similar technologies to serve ads based on your prior visits to this and other websites. Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visits. You can opt out of personalized advertising from Google at <a href="https://www.google.com/settings/ads" className="text-violet-400 hover:text-cyan-400 transition-colors underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>, and from many other vendors at <a href="https://www.aboutads.info/choices" className="text-violet-400 hover:text-cyan-400 transition-colors underline" target="_blank" rel="noopener noreferrer">www.aboutads.info</a>.</li>
            <li><strong>Analytics:</strong> We use Vercel Web Analytics to count page views. It does not use cookies.</li>
          </ul>
          <p className="text-slate-400 leading-relaxed">
            Where the law requires it (for example, in the European Economic Area, the United Kingdom, and Switzerland), we ask for your consent before personalized ads are shown, and you can change your choice at any time. You can also block or delete cookies through your browser settings.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">8. Data Retention</h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-400 leading-relaxed">
            <li><strong>Telegram login sessions:</strong> kept until you log out. Logging out ends the session with Telegram and removes it from our records.</li>
            <li><strong>Account, channel, and media metadata:</strong> kept for as long as your account is active, or until you ask us to delete it.</li>
            <li><strong>Temporary upload files:</strong> deleted as soon as the upload to Telegram finishes.</li>
            <li><strong>Cached thumbnails:</strong> deleted automatically after about one hour.</li>
            <li><strong>Server logs:</strong> rotated automatically.</li>
          </ul>
          <p className="text-slate-400 leading-relaxed">
            To delete your data, contact us at the email address below and we will remove the data stored in our systems. Photos in your Telegram channels are managed by you through Telegram directly and stay there unless you delete them.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">9. Your Rights</h2>
          <p className="text-slate-400 leading-relaxed">
            Depending on your location (including under the EU and UK GDPR and India&apos;s Digital Personal Data Protection Act, 2023), you may have the following rights regarding your personal data:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-400 leading-relaxed">
            <li>The right to access the personal data we hold about you.</li>
            <li>The right to request correction of inaccurate data.</li>
            <li>The right to request deletion of your data.</li>
            <li>The right to object to or restrict processing of your data.</li>
            <li>The right to receive your data in a portable format.</li>
            <li>The right to withdraw consent at any time, where we rely on consent.</li>
            <li>The right to file a complaint with your data protection authority (for example, your EU or UK supervisory authority, or the Data Protection Board of India).</li>
          </ul>
          <p className="text-slate-400 leading-relaxed">
            To exercise any of these rights or to raise a grievance, please contact us at the email address provided below. We aim to respond within 30 days.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">10. Children&apos;s Privacy</h2>
          <p className="text-slate-400 leading-relaxed">
            Our Service is intended only for people aged 18 or older. We do not knowingly collect personal data from anyone under 18. If we become aware that we have collected data from someone under 18, we will take steps to delete that information.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">11. Changes to This Policy</h2>
          <p className="text-slate-400 leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. We encourage you to review this Privacy Policy periodically.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">12. Contact Us</h2>
          <p className="text-slate-400 leading-relaxed">
            If you have any questions about this Privacy Policy, want to exercise your rights, or have a grievance about how we handle your data, please contact us at:
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
