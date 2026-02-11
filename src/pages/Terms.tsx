import { Link } from "react-router-dom";

const Terms = () => (
  <div className="mx-auto max-w-3xl px-6 py-16">
    <Link to="/" className="text-sm text-raffine-pink hover:text-white transition-colors">← Home</Link>
    <h1 className="mt-6 text-3xl font-bold text-white">Terms of Service</h1>
    <p className="mt-2 text-sm text-gray-400">Last updated: February 2026</p>
    <div className="mt-8 space-y-6 text-sm leading-relaxed text-gray-400">
      <section>
        <h2 className="text-lg font-bold text-white">1. Acceptance of Terms</h2>
        <p className="mt-2">By accessing and using Raffine, you agree to be bound by these Terms of Service. If you do not agree, please discontinue use of the platform immediately.</p>
      </section>
      <section>
        <h2 className="text-lg font-bold text-white">2. Services</h2>
        <p className="mt-2">Raffine provides a marketplace connecting clients with wellness, beauty, and lifestyle service providers. We facilitate bookings and product purchases but are not the direct provider of services.</p>
      </section>
      <section>
        <h2 className="text-lg font-bold text-white">3. Cancellation Policy</h2>
        <p className="mt-2">Bookings may be cancelled free of charge up to 24 hours before the scheduled appointment. Late cancellations may incur a fee of up to 50% of the service price.</p>
      </section>
      <section>
        <h2 className="text-lg font-bold text-white">4. Limitation of Liability</h2>
        <p className="mt-2">Raffine shall not be held liable for any damages arising from the use of services provided by vendors on the platform. Each vendor operates independently.</p>
      </section>
    </div>
  </div>
);

export default Terms;
