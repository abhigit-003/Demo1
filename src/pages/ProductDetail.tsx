import { useParams, Link } from "react-router-dom";
import { Star, ChevronLeft, Minus, Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { products } from "@/data/mockData";
import { useCart } from "@/context/CartContext";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Footer from "@/components/landing/Footer";

const ProductDetail = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const product = products.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [selectedShade, setSelectedShade] = useState(0);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Product not found</h1>
          <Link to="/" className="mt-4 inline-block text-primary hover:text-primary/80">← Back to Home</Link>
        </div>
      </div>
    );
  }

  const handleAddToBag = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({ id: product.id, name: product.name, price: product.price, type: "product" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="h-4 w-4" /> Back
        </Link>

        <div className="mt-8 grid gap-12 lg:grid-cols-2">
          {/* Images */}
          <div>
            <div className="aspect-square overflow-hidden rounded-2xl bg-surface">
              <img src="/placeholder.svg" alt={product.name} className="h-full w-full object-cover opacity-30" />
            </div>
            <div className="mt-3 grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-xl border border-border bg-surface cursor-pointer hover:border-primary transition-colors">
                  <img src="/placeholder.svg" alt="" className="h-full w-full object-cover opacity-20" />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex">{Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-4 w-4 fill-primary text-primary" />)}</div>
              <span className="text-sm text-muted-foreground">{product.rating} ({product.reviews} reviews)</span>
            </div>
            <p className="mt-4 text-2xl font-bold text-foreground">₹{product.price}</p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{product.description}</p>

            {/* Shades */}
            {product.shades && (
              <div className="mt-6">
                <p className="text-sm font-semibold text-foreground">Shade: {product.shades[selectedShade]}</p>
                <div className="mt-3 flex gap-2">
                  {product.shades.map((shade, i) => (
                    <button
                      key={shade}
                      onClick={() => setSelectedShade(i)}
                      className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${i === selectedShade ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground"}`}
                    >
                      {shade}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6">
              <p className="text-sm font-semibold text-foreground">Quantity</p>
              <div className="mt-3 flex items-center gap-3">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground hover:bg-secondary transition-colors">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-semibold text-foreground">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground hover:bg-secondary transition-colors">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToBag}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
            >
              <ShoppingBag className="h-4 w-4" /> Add to Bag — ₹{product.price * quantity}
            </button>

            <Accordion type="multiple" className="mt-8">
              {product.details.map((d) => (
                <AccordionItem key={d.label} value={d.label}>
                  <AccordionTrigger className="text-sm font-semibold text-foreground">{d.label}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{d.content}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <h2 className="mt-10 text-lg font-bold text-foreground">Reviews</h2>
            <div className="mt-4 space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-center gap-2">
                    <div className="flex">{Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-3.5 w-3.5 fill-primary text-primary" />)}</div>
                    <span className="text-xs text-muted-foreground">1 month ago</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">Absolutely love this product. The quality is outstanding and results are visible within days.</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
