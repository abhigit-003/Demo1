import { useParams, Link } from "react-router-dom";
import { Star, ChevronLeft, Minus, Plus, ShoppingBag, Heart } from "lucide-react";
import { useState } from "react";
import { products } from "@/data/mockData";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const ProductDetail = () => {
  const { id } = useParams();
  const { items, addItem } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const product = products.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [selectedShade, setSelectedShade] = useState(0);

  if (!product) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white uppercase tracking-widest">Product not found</h1>
          <Link to="/home" className="mt-4 inline-block text-raffine-pink hover:opacity-80 transition-opacity">← Back to Home</Link>
        </div>
      </div>
    );
  }

  const handleAddToBag = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({ id: product.id, name: product.name, price: product.price, type: "product" });
    }
    toast.success(`${quantity} ${product.name} added to your bag`);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <Link to="/home" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors">
        <ChevronLeft className="h-4 w-4" /> Back
      </Link>

      <div className="mt-8 grid gap-12 lg:grid-cols-2">
        {/* Images */}
        <div>
          <div className="aspect-square overflow-hidden rounded-2xl bg-white/5 border border-white/5">
            <img src="/placeholder.svg" alt={product.name} className="h-full w-full object-cover opacity-30" />
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square overflow-hidden rounded-xl border border-white/5 bg-white/5 cursor-pointer hover:border-raffine-pink transition-colors">
                <img src="/placeholder.svg" alt="" className="h-full w-full object-cover opacity-20" />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white uppercase tracking-wider">{product.name}</h1>
            <button
              onClick={() => {
                if (isInWishlist(product.id)) {
                  removeFromWishlist(product.id);
                } else {
                  addToWishlist({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    type: "product",
                    image: "/placeholder.svg"
                  });
                }
              }}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-white hover:bg-white/5 transition-colors"
              aria-label="Toggle Wishlist"
            >
              <Heart className={`h-6 w-6 ${isInWishlist(product.id) ? "fill-raffine-pink text-raffine-pink border-none" : ""}`} />
            </button>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <div className="flex">{Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-4 w-4 fill-raffine-pink text-raffine-pink" />)}</div>
            <span className="text-sm text-gray-400">{product.rating} ({product.reviews} reviews)</span>
          </div>
          <p className="mt-4 text-2xl font-bold text-raffine-gold">₹{product.price}</p>
          <p className="mt-4 text-base leading-relaxed text-gray-400">{product.description}</p>

          {/* Shades */}
          {product.shades && (
            <div className="mt-6">
              <p className="text-sm font-semibold text-white uppercase tracking-widest">Shade: {product.shades[selectedShade]}</p>
              <div className="mt-3 flex gap-2">
                {product.shades.map((shade, i) => (
                  <button
                    key={shade}
                    onClick={() => setSelectedShade(i)}
                    className={`rounded-full border px-4 py-1.5 text-sm transition-all ${i === selectedShade ? "border-raffine-pink bg-raffine-pink text-white" : "border-white/10 text-gray-400 hover:text-white"}`}
                  >
                    {shade}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6">
            <p className="text-sm font-semibold text-white uppercase tracking-widest">Quantity</p>
            <div className="mt-3 flex items-center gap-3">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white hover:bg-white/5 transition-colors">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-semibold text-white">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white hover:bg-white/5 transition-colors">
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToBag}
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-raffine-pink py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            <ShoppingBag className="h-4 w-4" /> Add to Bag — ₹{product.price * quantity}
          </button>

          <Accordion type="multiple" className="mt-8 border-t border-white/10">
            {product.details.map((d) => (
              <AccordionItem key={d.label} value={d.label} className="border-white/10">
                <AccordionTrigger className="text-sm font-semibold text-white uppercase tracking-widest hover:text-raffine-pink">{d.label}</AccordionTrigger>
                <AccordionContent className="text-sm text-gray-400 leading-relaxed">{d.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <h2 className="mt-10 text-lg font-bold text-white uppercase tracking-widest">Reviews</h2>
          <div className="mt-4 space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="rounded-xl border border-white/5 bg-white/5 p-5">
                <div className="flex items-center gap-2">
                  <div className="flex">{Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-3.5 w-3.5 fill-raffine-pink text-raffine-pink" />)}</div>
                  <span className="text-xs text-gray-500">1 month ago</span>
                </div>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">Absolutely love this product. The quality is outstanding and results are visible within days.</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
