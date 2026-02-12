import { useScrollReveal } from "@/hooks/useScrollReveal";
import { LayoutDashboard, Package, Users } from "lucide-react";
import { Link } from "react-router-dom";

const vendorFeatures = [
  { icon: LayoutDashboard, title: "Smart Dashboard", desc: "Real-time analytics, revenue tracking, and business insights at a glance." },
  { icon: Package, title: "Inventory Management", desc: "Effortlessly manage your products, services, and availability." },
  { icon: Users, title: "Customer Insights", desc: "Understand your clients with detailed booking and purchase history." },
];

const VendorSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-24 bg-surface/30">
      <div className={`mx-auto max-w-6xl px-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Grow Your Wellness <span className="text-gradient">Business</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            Join Raffine to manage bookings, sell products, and track revenue — all from one premium platform built for wellness professionals.
          </p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {vendorFeatures.map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-card p-8 transition-transform hover:scale-[1.02]">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-card-foreground">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/dashboard" className="inline-flex h-12 items-center rounded-lg bg-primary px-8 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]">
            Open Vendor Dashboard
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VendorSection;
