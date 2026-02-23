
export const metadata = {
  title: "Terms of Service | Telephotos",
  description: "Read the rules, guidelines, and terms of service for using Telephotos.",
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-white mb-6">Terms of Service</h1>
        <p>Last updated: {new Date().toLocaleDateString()}</p>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">1. Agreement to Terms</h2>
          <p>
            By accessing or using Telephotos, you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">2. Our Services</h2>
          <p>
            Telephotos provides a platform that allows users to encrypt, store, and manage their photos through Telegram integration. We reserve the right to withdraw or amend our service, and any service or material we provide, in our sole discretion without notice.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">3. User Responsibilities</h2>
          <p>
            You are responsible for safeguarding the password and Telegram account that you use to access the Service and for any activities or actions under your account. You agree not to disclose your password or security credentials to any third party.
          </p>
          <p>
            You must not use our service to store illegal content, distribute malware, or engage in any activities that violate international or local laws.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">4. Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are and will remain the exclusive property of Telephotos and its licensors. You retain the copyright and any other rights you already hold in Content which you submit, post or display on or through, the Service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">5. Third-Party Services and Ads</h2>
          <p>
            Our Service may contain links to third-party web sites or services that are not owned or controlled by Telephotos. In addition, our service utilizes third-party advertising partners like Google AdSense. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third party web sites or services.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">6. Termination</h2>
          <p>
            We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">7. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of your jurisdiction, without regard to its conflict of law provisions.
          </p>
        </section>

        <div className="pt-8 flex justify-center mt-12">
            <a href="/" className="text-violet-400 hover:text-cyan-400 transition-colors">
              &larr; Back to Home
            </a>
        </div>
      </div>
    </div>
  );
}
