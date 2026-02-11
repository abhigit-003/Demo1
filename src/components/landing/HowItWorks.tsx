import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Search, CalendarCheck, Sparkles } from "lucide-react";

const steps = [
  { icon: Search, title: "Discover", desc: "Browse curated spas, salons and wellness studios near you." },
  { icon: CalendarCheck, title: "Book", desc: "Choose your service, pick a time, and confirm instantly." },
  { icon: Sparkles, title: "Experience", desc: "Enjoy premium treatments from verified professionals." },
];

const HowItWorks = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-24 bg-surface/30">
      <div className={`mx-auto max-w-5xl px-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="text-center text-3xl font-bold text-foreground sm:text-4xl">How It Works</h2>
        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.title} className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <step.icon className="h-7 w-7" />
              </div>
              <div className="mt-1 text-sm font-bold text-primary">0{i + 1}</div>
              <h3 className="mt-3 text-xl font-bold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
