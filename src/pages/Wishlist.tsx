import { useWishlist } from "@/context/WishlistContext";
import { Link } from "react-router-dom";
import { X, ShoppingBag, Heart, Trash2 } from "lucide-react";

const Wishlist = () => {
    const { wishlist, removeFromWishlist, moveToCart } = useWishlist();

    if (wishlist.length === 0) {
        return (
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-6 py-24 text-center">
                <div className="relative mb-6">
                    <Heart className="h-16 w-16 text-muted-foreground/20" />
                    <Heart className="absolute inset-0 h-16 w-16 text-raffine-pink animate-pulse" />
                </div>
                <h1 className="text-2xl font-bold text-white uppercase tracking-widest">Your wishlist is empty</h1>
                <p className="mt-2 text-gray-400">Save your favorite beauty rituals and products here</p>
                <div className="mt-8">
                    <Link to="/spa" className="rounded-lg bg-raffine-pink px-8 py-3.5 text-sm font-bold text-white uppercase tracking-widest transition-transform hover:scale-[1.05] shadow-lg shadow-raffine-pink/20">
                        Explore Portfolio
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl px-6 py-12">
            <div className="flex items-end justify-between border-b border-white/5 pb-8 mb-10">
                <div>
                    <span className="text-raffine-gold text-xs font-bold tracking-[0.2em] uppercase block mb-2">My Collection</span>
                    <h1 className="text-3xl md:text-4xl font-light text-white uppercase tracking-[0.1em]">Wishlist</h1>
                </div>
                <p className="text-gray-400 font-light italic">{wishlist.length} {wishlist.length === 1 ? 'Object' : 'Objects'}</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {wishlist.map((item) => (
                    <div key={item.id} className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-4 transition-all hover:bg-white/10 hover:border-raffine-gold/20">
                        {/* Image Wrap */}
                        <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-raffine-burgundy/50">
                            <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110"
                            />
                            <button
                                onClick={() => removeFromWishlist(item.id)}
                                className="absolute top-3 right-3 p-2 bg-black/40 text-white/70 rounded-full backdrop-blur-md opacity-0 transition-opacity group-hover:opacity-100 hover:text-white"
                                aria-label="Remove"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Info */}
                        <div className="mt-4 flex flex-1 flex-col">
                            <div className="flex justify-between items-start mb-1">
                                <span className="text-[10px] font-bold text-raffine-gold/80 uppercase tracking-widest">{item.type}</span>
                                <span className="font-bold text-white text-sm">₹{item.price}</span>
                            </div>
                            <h3 className="text-base font-medium text-white line-clamp-2 leading-snug mb-4">{item.name}</h3>

                            <button
                                onClick={() => moveToCart(item)}
                                className="mt-auto flex w-full items-center justify-center gap-2 rounded-lg bg-white/5 border border-white/10 py-3 text-[10px] font-bold text-white uppercase tracking-[0.15em] transition-all hover:bg-raffine-pink hover:border-raffine-pink active:scale-95"
                            >
                                <ShoppingBag className="h-3.5 w-3.5" /> Move to Bag
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wishlist;
