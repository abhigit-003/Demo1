import { Link } from "react-router-dom";

const Privacy = () => (
  <div className="mx-auto max-w-3xl px-6 py-16">
    <Link to="/" className="text-sm text-raffine-pink hover:text-white transition-colors">← Home</Link>
    <h1 className="mt-6 text-3xl font-bold text-white">Privacy Policy</h1>
    <p className="mt-2 text-sm text-gray-400">Last updated: February 2026</p>
    <div className="mt-8 space-y-6 text-sm leading-relaxed text-gray-400">
      <section>
        <h2 className="text-lg font-bold text-white">1. Information We Collect</h2>
        <p className="mt-2">We collect information you provide when creating an account, making a booking, or purchasing products. This includes your name, email address, payment information, and service preferences.</p>
      </section>
      <section>
        <h2 className="text-lg font-bold text-white">2. How We Use Your Information</h2>
        <p className="mt-2">Your information is used to process bookings, deliver products, personalize your experience, and communicate service updates. We never sell your personal data to third parties.</p>
      </section>
      <section>
        <h2 className="text-lg font-bold text-white">3. Data Security</h2>
        <p className="mt-2">We employ industry-standard encryption and security measures to protect your personal information. All payment processing is handled through PCI-compliant providers.</p>
      </section>
      <section>
        <h2 className="text-lg font-bold text-white">4. Your Rights</h2>
        <p className="mt-2">You may request access to, correction of, or deletion of your personal data at any time by contacting our support team at privacy@raffine.com.</p>
      </section>
    </div>
  </div>
);

export default Privacy;
