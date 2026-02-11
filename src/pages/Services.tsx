import { useSearchParams, Link } from "react-router-dom";
import { Star, Heart, SlidersHorizontal } from "lucide-react";
import { services } from "@/data/mockData";
import { useFavorites } from "@/context/FavoritesContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const categoryLabels: Record<string, string> = {
  spa: "Spa & Massage",
  hair: "Hair & Styling",
  fitness: "Fitness & Training",
  wellness: "Wellness & Healing",
};

const Services = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");
  const { toggleFavorite, isFavorite } = useFavorites();
  const { ref, isVisible } = useScrollReveal(0.05);

  const filtered = category
    ? services.filter((s) => s.category === category)
    : services;

  const setCategory = (cat: string | null) => {
    if (cat) setSearchParams({ category: cat });
    else setSearchParams({});
  };

  return (
    <div className="pb-20">
      <div ref={ref} className={`mx-auto max-w-7xl px-6 py-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          {category ? categoryLabels[category] || "Services" : "All Services"}
        </h1>
        <p className="mt-2 text-white/60">
          {filtered.length} experience{filtered.length !== 1 ? "s" : ""} available
        </p>

        {/* Filters */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          <button
            onClick={() => setCategory(null)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${!category ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:text-foreground"}`}
          >
            All
          </button>
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setCategory(key)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${category === key ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:text-foreground"}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((svc) => (
            <div key={svc.id} className="group overflow-hidden rounded-2xl border border-border bg-card transition-transform hover:scale-[1.02]">
              <Link to={`/services/${svc.id}`} className="block">
                <div className="relative aspect-[16/10] bg-surface">
                  <img src="/placeholder.svg" alt={svc.name} className="h-full w-full object-cover opacity-30" />
                  <button
                    onClick={(e) => { e.preventDefault(); toggleFavorite(svc.id); }}
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/60 backdrop-blur-sm transition-colors hover:bg-background/80"
                  >
                    <Heart className={`h-4 w-4 ${isFavorite(svc.id) ? "fill-primary text-primary" : "text-foreground"}`} />
                  </button>
                </div>
              </Link>
              <div className="p-6">
                <Link to={`/services/${svc.id}`}>
                  <h3 className="text-lg font-semibold text-card-foreground hover:text-primary transition-colors">{svc.name}</h3>
                </Link>
                <p className="mt-1 text-xs text-muted-foreground">{svc.location} · {svc.duration}</p>
                <div className="mt-2 flex items-center gap-2">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="text-sm font-medium text-foreground">{svc.rating}</span>
                  <span className="text-sm text-muted-foreground">({svc.reviews})</span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold text-foreground">₹{svc.price}</span>
                  <Link to={`/services/${svc.id}`} className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]">
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
