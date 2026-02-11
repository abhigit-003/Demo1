import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, X, ShoppingBag, ArrowRight, Trash2, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const Cart = () => {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/home/checkout");
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-6 py-24 text-center">
        <div className="relative mb-8">
          <ShoppingBag className="h-16 w-16 text-white/10" />
          <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-raffine-pink flex items-center justify-center animate-bounce">
            <span className="text-[10px] font-bold text-white">0</span>
          </div>
        </div>
        <h1 className="text-3xl font-light text-white uppercase tracking-[0.2em] mb-4">Your Bag is Empty</h1>
        <p className="mt-2 text-gray-400 max-w-md mx-auto italic font-light">
          Your curated collection of beauty and wellness awaits.
          Discover our signature treatments and products.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <Link to="/home/spa" className="rounded-lg bg-raffine-pink px-10 py-4 text-[11px] font-bold text-white uppercase tracking-[0.2em] transition-all hover:scale-[1.05] shadow-lg shadow-raffine-pink/20">
            Browse Services
          </Link>
          <Link to="/home/shop" className="rounded-lg border border-white/10 bg-white/5 px-10 py-4 text-[11px] font-bold text-white uppercase tracking-[0.2em] transition-all hover:bg-white/10">
            Shop Collection
          </Link>
        </div>
      </div>
    );
  }

  const tax = totalPrice * 0.18; // 18% GST example
  const grandTotal = totalPrice + tax;

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex items-end justify-between border-b border-white/5 pb-8 mb-10">
        <div>
          <span className="text-raffine-gold text-xs font-bold tracking-[0.2em] uppercase block mb-2">Checkout Details</span>
          <h1 className="text-3xl md:text-4xl font-light text-white uppercase tracking-[0.1em]">Your Bag</h1>
        </div>
        <p className="text-gray-400 font-light italic">{items.length} {items.length === 1 ? 'Selection' : 'Selections'}</p>
      </div>

      <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_400px]">
        {/* Items List */}
        <div className="space-y-6">
          {items.map((item) => (
            <div key={item.id} className="group flex flex-col sm:flex-row items-center gap-6 rounded-2xl border border-white/5 bg-white/[0.03] p-6 transition-all hover:bg-white/[0.06] hover:border-raffine-gold/10">
              <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-xl bg-raffine-burgundy/50 border border-white/5 shadow-inner">
                <img src="/placeholder.svg" alt={item.name} className="h-full w-full object-cover opacity-50 transition-opacity group-hover:opacity-80" />
              </div>

              <div className="flex-1 text-center sm:text-left min-w-0">
                <div className="flex items-center justify-center sm:justify-start gap-3 mb-1">
                  <span className="px-2 py-0.5 rounded-sm bg-raffine-gold/10 text-raffine-gold text-[9px] font-bold uppercase tracking-widest">{item.type}</span>
                </div>
                <h3 className="text-lg font-medium text-white truncate mb-4">{item.name}</h3>

                <div className="flex items-center justify-center sm:justify-start gap-4">
                  <div className="flex items-center gap-3 bg-black/20 rounded-full px-3 py-1.5 border border-white/5">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="flex h-6 w-6 items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="text-sm font-bold text-white w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="flex h-6 w-6 items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center sm:items-end gap-2 w-full sm:w-auto">
                <p className="text-xl font-bold text-white tracking-widest">₹{(item.price * item.quantity).toLocaleString()}</p>
                <button
                  onClick={() => {
                    removeItem(item.id);
                    toast.info(`Removed ${item.name} from bag`);
                  }}
                  className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-500 hover:text-raffine-pink transition-colors"
                >
                  <X className="h-3.5 w-3.5" /> Remove
                </button>
              </div>
            </div>
          ))}

          <div className="pt-4">
            <button onClick={clearCart} className="text-[11px] font-bold text-gray-500 uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2">
              <Trash2 className="size-4" /> Reset Bag Selection
            </button>
          </div>
        </div>

        {/* Summary Sidebar */}
        <div className="lg:sticky lg:top-28 h-fit">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-transparent p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-raffine-pink/10 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2"></div>

            <h2 className="text-xl font-light text-white uppercase tracking-[0.2em] mb-8 border-b border-white/5 pb-4">Summary</h2>

            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Retail Total</span>
                <span className="text-white font-medium">₹{totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">GST (Estimated)</span>
                <span className="text-white font-medium">₹{tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Service Fee</span>
                <span className="text-raffine-gold font-medium uppercase text-[10px] tracking-widest">Complimentary</span>
              </div>

              <div className="border-t border-white/10 pt-6 mt-6 flex flex-col gap-2">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Grand Total</span>
                  <span className="text-3xl font-bold text-raffine-pink tracking-tight">₹{grandTotal.toLocaleString()}</span>
                </div>
                <p className="text-[9px] text-gray-500 italic text-right">*Shipping calculated at next step</p>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="mt-10 w-full group relative overflow-hidden rounded-xl bg-raffine-pink py-4 text-[11px] font-bold text-white uppercase tracking-[0.2em] transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-raffine-pink/20"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Secure Checkout <ArrowRight className="size-4 animate-pulse" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>

            <Link to="/home/shop" className="mt-6 flex items-center justify-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-white transition-colors">
              Continue Exploration
            </Link>
          </div>

          <div className="mt-8 p-6 rounded-2xl border border-white/5 bg-white/[0.02] flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-raffine-gold/10 flex items-center justify-center">
              <ShieldCheck className="text-raffine-gold size-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-white uppercase tracking-widest leading-none mb-1">Authenticity Guaranteed</p>
              <p className="text-[9px] text-gray-500">Every treatment and product is 100% verified</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
