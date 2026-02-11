import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Star, Heart, SlidersHorizontal } from "lucide-react";
import { services } from "@/data/mockData";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { toast } from "sonner";

const categoryLabels: Record<string, string> = {
  spa: "Spa & Massage",
  hair: "Hair & Styling",
  fitness: "Fitness & Training",
  wellness: "Wellness & Healing",
};

interface ServicesProps {
  category?: string;
}

const Services = ({ category: propCategory }: ServicesProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCategory = searchParams.get("category");
  const category = propCategory || urlCategory;

  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addItem } = useCart();
  const { ref, isVisible } = useScrollReveal(0.05);
  const navigate = useNavigate();

  const filtered = category
    ? services.filter((s) => s.category === category)
    : services;

  const setCategory = (cat: string | null) => {
    if (cat) navigate(`/home/${cat}`);
    else navigate('/home/all');
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
            className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all ${!category ? "bg-raffine-pink text-white shadow-lg shadow-raffine-pink/20" : "border border-white/10 text-gray-500 hover:text-white"}`}
          >
            All
          </button>
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setCategory(key)}
              className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all ${category === key ? "bg-raffine-pink text-white shadow-lg shadow-raffine-pink/20" : "border border-white/10 text-gray-500 hover:text-white"}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((svc) => (
            <div key={svc.id} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all hover:bg-white/10 hover:translate-y-[-4px]">
              <Link to={`/services/${svc.id}`} className="block">
                <div className="relative aspect-[16/10] bg-raffine-burgundy/50">
                  <img src="/placeholder.svg" alt={svc.name} className="h-full w-full object-cover opacity-30" />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (isInWishlist(svc.id)) {
                        removeFromWishlist(svc.id);
                      } else {
                        addToWishlist({
                          id: svc.id,
                          name: svc.name,
                          price: svc.price,
                          type: "service",
                          image: "/placeholder.svg"
                        });
                      }
                    }}
                    className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur-md transition-colors hover:bg-white/20"
                  >
                    <Heart className={`h-4.5 w-4.5 ${isInWishlist(svc.id) ? "fill-raffine-pink text-raffine-pink" : "text-white"}`} />
                  </button>
                </div>
              </Link>
              <div className="p-6">
                <Link to={`/services/${svc.id}`}>
                  <h3 className="text-lg font-bold text-white group-hover:text-raffine-gold transition-colors">{svc.name}</h3>
                </Link>
                <p className="mt-1 text-xs text-gray-400 uppercase tracking-widest">{svc.location} · {svc.duration}</p>
                <div className="mt-3 flex items-center gap-2">
                  <Star className="h-4 w-4 fill-raffine-gold text-raffine-gold" />
                  <span className="text-sm font-bold text-white">{svc.rating}</span>
                  <span className="text-sm text-gray-500">({svc.reviews} reviews)</span>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-xl font-black text-raffine-gold">₹{svc.price}</span>
                  <button
                    onClick={() => {
                      addItem({ id: svc.id, name: svc.name, price: svc.price, type: "service" });
                      toast.success(`${svc.name} added to your bag`);
                    }}
                    className="rounded-lg bg-raffine-pink px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90 shadow-lg shadow-raffine-pink/20"
                  >
                    Book Now
                  </button>
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
