import { useScrollReveal } from "@/hooks/useScrollReveal";

const metrics = [
  { value: "10k+", label: "Clients" },
  { value: "500+", label: "Vendors" },
  { value: "4.9", label: "Average Rating" },
  { value: "20+", label: "Cities" },
];

const TrustMetrics = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-20 bg-surface/30">
      <div className={`mx-auto max-w-5xl px-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className="text-center">
              <div className="text-4xl font-extrabold text-gradient">{m.value}</div>
              <div className="mt-2 text-sm font-medium text-muted-foreground">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustMetrics;
