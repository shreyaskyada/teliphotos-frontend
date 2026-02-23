
export const metadata = {
  title: "Privacy Policy | Telephotos",
  description: "Learn how Telephotos protects your privacy and encrypts your photos.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-white mb-6">Privacy Policy</h1>
        <p>Last updated: {new Date().toLocaleDateString()}</p>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">1. Introduction</h2>
          <p>
            Welcome to Telephotos. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">2. The Data We Collect About You</h2>
          <p>
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong>Contact Data</strong> includes your Telegram account information and email address.</li>
            <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
            <li><strong>Usage Data</strong> includes information about how you use our website and services.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">3. How We Use Your Data</h2>
          <p>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
            <li>Where we need to comply with a legal obligation.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">4. Data Security</h2>
          <p>
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed, including end-to-end encryption for your media files. In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">5. Third-Party Links and Advertising</h2>
          <p>
            This website may include links to third-party websites, plug-ins, and applications. We also use third-party advertising partners like Google AdSense to serve ads. These companies may use non-personally identifiable information (such as click stream information, browser type, time and date) to provide advertisements about goods and services likely to be of greater interest to you.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">6. Contact Us</h2>
          <p>
            If you have any questions about this privacy policy or our privacy practices, please contact us at support@telephotos.com.
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
