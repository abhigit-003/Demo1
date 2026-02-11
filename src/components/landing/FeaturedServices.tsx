import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Star, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const services = [
  { id: "s1", name: "Signature Deep Tissue Massage", rating: 4.9, reviews: 128, price: "₹145" },
  { id: "s2", name: "HydraFacial Glow Treatment", rating: 4.8, reviews: 96, price: "₹160" },
  { id: "s3", name: "Hot Stone Therapy", rating: 5.0, reviews: 74, price: "₹180" },
];

const FeaturedServices = () => {
  const { ref, isVisible } = useScrollReveal();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addItem } = useCart();

  return (
    <section id="services" ref={ref} className="py-24">
      <div className={`mx-auto max-w-7xl px-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="text-center text-3xl font-bold text-foreground sm:text-4xl">
          Premium Experiences
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((svc) => (
            <div
              key={svc.name}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-transform hover:scale-[1.02]"
            >
              <Link to={`/home/service/${svc.id}`}>
                <div className="relative aspect-[16/10] bg-surface">
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
                          price: parseFloat(svc.price.replace("₹", "")),
                          type: "service",
                          image: "/placeholder.svg"
                        });
                      }
                    }}
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 backdrop-blur-md transition-colors hover:bg-black/60"
                  >
                    <Heart className={`h-4 w-4 ${isInWishlist(svc.id) ? "fill-raffine-pink text-raffine-pink" : "text-white"}`} />
                  </button>
                </div>
              </Link>
              <div className="p-6">
                <Link to={`/home/service/${svc.id}`}>
                  <h3 className="text-lg font-semibold text-card-foreground hover:text-primary transition-colors">{svc.name}</h3>
                </Link>
                <div className="mt-2 flex items-center gap-2">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="text-sm font-medium text-foreground">{svc.rating}</span>
                  <span className="text-sm text-muted-foreground">({svc.reviews} reviews)</span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold text-foreground">{svc.price}</span>
                  <button
                    onClick={() => {
                      const priceNum = parseFloat(svc.price.replace("₹", ""));
                      addItem({ id: svc.id, name: svc.name, price: priceNum, type: "service" });
                      toast.success(`${svc.name} added to your bag`);
                    }}
                    className="rounded-lg bg-raffine-pink px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 shadow-lg shadow-raffine-pink/10"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/home/all" className="inline-flex h-11 items-center rounded-lg border border-border bg-secondary px-6 text-sm font-semibold text-secondary-foreground transition-transform hover:scale-[1.02]">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
