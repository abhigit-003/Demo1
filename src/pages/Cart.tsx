import { Link } from "react-router-dom";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

const Cart = () => {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-6 py-24 text-center">
        <ShoppingBag className="h-16 w-16 text-muted-foreground" />
        <h1 className="mt-6 text-2xl font-bold text-foreground">Your bag is empty</h1>
        <p className="mt-2 text-muted-foreground">Discover our premium services and products</p>
        <div className="mt-8 flex gap-4">
          <Link to="/services" className="rounded-lg bg-raffine-pink px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]">
            Browse Services
          </Link>
          <Link to="/" className="rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]">
            Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-3xl font-bold text-white uppercase tracking-widest">Your Bag</h1>
      <p className="mt-1 text-gray-400">{items.length} item{items.length !== 1 ? "s" : ""}</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Items */}
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 transition-all hover:bg-white/10">
              <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-raffine-burgundy/50">
                <img src="/placeholder.svg" alt={item.name} className="h-full w-full object-cover opacity-30" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-white truncate">{item.name}</h3>
                <p className="text-xs text-gray-400 capitalize">{item.type}</p>
                <div className="mt-2 flex items-center gap-3">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 text-white hover:bg-white/10 transition-colors">
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="text-sm font-medium text-white">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 text-white hover:bg-white/10 transition-colors">
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-raffine-gold">₹{item.price * item.quantity}</p>
                <button onClick={() => removeItem(item.id)} className="mt-1 text-gray-500 hover:text-raffine-pink transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:sticky lg:top-24 h-fit">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h2 className="text-lg font-bold text-white uppercase tracking-widest">Order Summary</h2>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Subtotal</span>
                <span className="text-white">₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Tax</span>
                <span className="text-white">₹{(totalPrice * 0.08).toFixed(2)}</span>
              </div>
              <div className="border-t border-white/10 pt-3 flex justify-between">
                <span className="font-bold text-white">Total</span>
                <span className="font-bold text-raffine-pink">₹{(totalPrice * 1.08).toFixed(2)}</span>
              </div>
            </div>
            <button className="mt-6 w-full rounded-lg bg-raffine-pink py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90">
              Checkout
            </button>
            <button onClick={clearCart} className="mt-3 w-full text-center text-xs text-gray-500 hover:text-white transition-colors">
              Clear bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
