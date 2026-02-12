import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";

const categories = [
  { name: "Spa", desc: "Massages, facials & body treatments" },
  { name: "Hair", desc: "Styling, color & premium care" },
  { name: "Fitness", desc: "Personal training & group sessions" },
  { name: "Wellness", desc: "Meditation, yoga & holistic healing" },
];

const CategorySection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-24 bg-surface/30">
      <div className={`mx-auto max-w-7xl px-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="text-center text-3xl font-bold text-foreground sm:text-4xl">
          Explore by Category
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/${cat.name.toLowerCase()}`}
              className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-transform hover:scale-[1.02]"
            >
              <img
                src="/placeholder.svg"
                alt={cat.name}
                className="absolute inset-0 h-full w-full object-cover opacity-25 transition-all duration-500 group-hover:scale-105 group-hover:opacity-30"
              />
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-foreground">{cat.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
