import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ShoppingBag, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";

const products = [
  { id: "p1", name: "Midnight Radiance Oil", price: 85 },
  { id: "p2", name: "Velvet Moisture Cloud", price: 42 },
  { id: "p3", name: "Sculpting Stone Roller", price: 34 },
  { id: "p4", name: "Purifying Essence Toner", price: 48 },
];

const FeaturedProducts = () => {
  const { ref, isVisible } = useScrollReveal();
  const { addItem } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  return (
    <section id="products" ref={ref} className="py-24">
      <div className={`mx-auto max-w-7xl px-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="text-center text-3xl font-bold text-foreground sm:text-4xl">Daily Essentials</h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <div key={p.name} className="group overflow-hidden rounded-2xl border border-border bg-card transition-transform hover:scale-[1.02]">
              <Link to={`/home/product/${p.id}`}>
                <div className="relative aspect-square bg-surface">
                  <img src="/placeholder.svg" alt={p.name} className="h-full w-full object-cover opacity-30" />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (isInWishlist(p.id)) {
                        removeFromWishlist(p.id);
                      } else {
                        addToWishlist({
                          id: p.id,
                          name: p.name,
                          price: p.price,
                          type: "product",
                          image: "/placeholder.svg"
                        });
                      }
                    }}
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 backdrop-blur-md transition-colors hover:bg-black/60"
                  >
                    <Heart className={`h-4 w-4 ${isInWishlist(p.id) ? "fill-raffine-pink text-raffine-pink" : "text-white"}`} />
                  </button>
                </div>
              </Link>
              <div className="p-5">
                <Link to={`/home/product/${p.id}`}>
                  <h3 className="text-sm font-semibold text-card-foreground hover:text-primary transition-colors">{p.name}</h3>
                </Link>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">₹{p.price}</span>
                  <button
                    onClick={() => {
                      addItem({ id: p.id, name: p.name, price: p.price, type: "product" });
                      toast.success(`${p.name} added to your bag`);
                    }}
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    <ShoppingBag className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/home/shop" className="text-sm font-semibold text-primary transition-colors hover:text-primary/80">
            View All Products →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
