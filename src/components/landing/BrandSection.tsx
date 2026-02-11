import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Check } from "lucide-react";

const features = [
  "Verified Professionals",
  "Transparent Pricing",
  "Seamless Booking",
  "Premium Product Curation",
];

const BrandSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-24">
      <div className={`mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-2 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        {/* Image placeholder */}
        <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-surface border border-border">
          <img src="/placeholder.svg" alt="Raffine wellness experience" className="h-full w-full object-cover opacity-40" />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            A Curated Wellness <span className="text-gradient">Marketplace</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Discover premium spas and salons. Book services instantly. Shop luxury beauty 
            and wellness products from trusted specialists — all in one elegant platform 
            designed around your wellbeing.
          </p>
          <ul className="mt-8 space-y-4">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm font-medium text-foreground">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Check className="h-3.5 w-3.5" />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default BrandSection;
