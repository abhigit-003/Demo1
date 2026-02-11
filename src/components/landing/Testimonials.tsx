import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Sophia L.", review: "Raffine transformed my self-care routine. The booking experience is seamless, and every spa I've visited through them has been exceptional.", avatar: "S" },
  { name: "Marcus T.", review: "As a fitness coach, switching to Raffine doubled my client bookings. The vendor dashboard is incredibly intuitive.", avatar: "M" },
  { name: "Elena R.", review: "The product curation is outstanding. Every item I've purchased feels truly premium. This is the future of wellness.", avatar: "E" },
];

const Testimonials = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-24">
      <div className={`mx-auto max-w-7xl px-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="text-center text-3xl font-bold text-foreground sm:text-4xl">What Our Community Says</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-2xl border border-border bg-card p-8">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">"{t.review}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
                  {t.avatar}
                </div>
                <span className="text-sm font-semibold text-card-foreground">{t.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
