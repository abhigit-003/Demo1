import { useParams, Link } from "react-router-dom";
import { Star, MapPin, Clock, ChevronLeft, Heart } from "lucide-react";
import { services } from "@/data/mockData";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";

const ServiceDetail = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const svc = services.find((s) => s.id === id);

  if (!svc) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Service not found</h1>
          <Link to="/home/spa" className="mt-4 inline-block text-primary hover:text-primary/80">← Back to Services</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <Link to="/home/spa" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="h-4 w-4" /> Back to Services
        </Link>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_380px]">
          {/* Main Content */}
          <div>
            {/* Gallery */}
            <div className="grid gap-3 grid-cols-2">
              <div className="col-span-2 aspect-[16/9] overflow-hidden rounded-2xl bg-surface">
                <img src="/placeholder.svg" alt={svc.name} className="h-full w-full object-cover opacity-30" />
              </div>
              <div className="aspect-video overflow-hidden rounded-xl bg-surface">
                <img src="/placeholder.svg" alt="" className="h-full w-full object-cover opacity-20" />
              </div>
              <div className="aspect-video overflow-hidden rounded-xl bg-surface">
                <img src="/placeholder.svg" alt="" className="h-full w-full object-cover opacity-20" />
              </div>
            </div>

            <div className="flex items-center justify-between mt-8">
              <h1 className="text-3xl font-bold text-white">{svc.name}</h1>
              <button
                onClick={() => {
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
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-white hover:bg-white/5 transition-colors"
                aria-label="Toggle Wishlist"
              >
                <Heart className={`h-6 w-6 ${isInWishlist(svc.id) ? "fill-raffine-pink text-raffine-pink border-none" : ""}`} />
              </button>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {svc.location}</span>
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {svc.duration}</span>
              <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-primary text-primary" /> {svc.rating} ({svc.reviews} reviews)</span>
            </div>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">{svc.description}</p>

            {/* Amenities */}
            <h2 className="mt-10 text-lg font-bold text-white">Amenities</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {svc.amenities.map((a) => (
                <span key={a} className="rounded-full border border-border bg-secondary px-4 py-1.5 text-sm text-secondary-foreground">{a}</span>
              ))}
            </div>

            {/* Specialist */}
            <h2 className="mt-10 text-lg font-bold text-white">Your Specialist</h2>
            <div className="mt-4 flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary text-lg font-bold">
                {svc.specialist.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-card-foreground">{svc.specialist}</p>
                <p className="text-sm text-muted-foreground">Senior {svc.category === "spa" ? "Therapist" : svc.category === "hair" ? "Stylist" : svc.category === "fitness" ? "Trainer" : "Practitioner"}</p>
              </div>
            </div>

            {/* Reviews placeholder */}
            <h2 className="mt-10 text-lg font-bold text-white">Reviews</h2>
            <div className="mt-4 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-center gap-2">
                    <div className="flex">{Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-3.5 w-3.5 fill-primary text-primary" />)}</div>
                    <span className="text-xs text-muted-foreground">2 weeks ago</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">Exceptional experience from start to finish. The atmosphere was incredibly relaxing and the specialist was highly skilled.</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sticky Booking Panel */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="text-3xl font-bold text-foreground">₹{svc.price}</p>
              <p className="text-sm text-muted-foreground">{svc.duration} session</p>
              <button
                onClick={() => {
                  addItem({ id: svc.id, name: svc.name, price: svc.price, type: "service" });
                  toast.success(`${svc.name} added to your bag`);
                }}
                className="mt-6 w-full rounded-lg bg-raffine-pink py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 shadow-lg shadow-raffine-pink/20 uppercase tracking-widest"
              >
                Book Now
              </button>
              <p className="mt-3 text-center text-xs text-muted-foreground">Free cancellation up to 24h before</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
