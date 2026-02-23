import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useCart } from "./CartContext";
import { useAuth } from "./AuthContext";
import api from "@/lib/api";
import { toast } from "sonner";

export interface WishlistItem {
    id: string;
    name: string;
    price: number;
    image?: string;
    type: "product" | "service";
}

interface WishlistContextType {
    wishlist: WishlistItem[];
    addToWishlist: (item: WishlistItem) => void;
    removeFromWishlist: (id: string) => void;
    moveToCart: (item: WishlistItem) => void;
    isInWishlist: (id: string) => boolean;
    wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
    const { addItem } = useCart();
    const { user } = useAuth();
    const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

    useEffect(() => {
        if (user) {
            api.get('/wishlist').then(({ data }) => {
                const mapped = data.map((w: any) => {
                    if (w.serviceId && w.Service) {
                        return {
                            id: w.serviceId,
                            name: w.Service.name,
                            price: w.Service.price,
                            type: 'service',
                            image: w.Service.image
                        };
                    } else if (w.productId && w.Product) {
                        return {
                            id: w.productId,
                            name: w.Product.name,
                            price: w.Product.price,
                            type: 'product',
                            image: w.Product.image
                        };
                    }
                    return null;
                }).filter(Boolean);
                setWishlist(mapped);
            }).catch(() => setWishlist([]));
        } else {
            const stored = localStorage.getItem("raffine_wishlist");
            if (stored) setWishlist(JSON.parse(stored));
        }
    }, [user]);

    useEffect(() => {
        if (!user) {
            localStorage.setItem("raffine_wishlist", JSON.stringify(wishlist));
        }
    }, [wishlist, user]);

    const addToWishlist = async (item: WishlistItem) => {
        if (user) {
             try {
                await api.post('/wishlist', { itemId: item.id, itemType: item.type });
                setWishlist(prev => {
                    if (prev.find(i => i.id === item.id)) return prev;
                    return [...prev, item];
                });
                toast.success(`${item.name} added to wishlist`);
             } catch (e) {
                 toast.error('Failed to add to wishlist');
             }
        } else {
            setWishlist((prev) => {
                if (prev.find((i) => i.id === item.id)) return prev;
                toast.success(`${item.name} added to wishlist`);
                return [...prev, item];
            });
        }
    };

    const removeFromWishlist = async (id: string) => {
        const item = wishlist.find(i => i.id === id);
        if (!item) return;

        if (user) {
            try {
                await api.delete(`/wishlist/${id}?type=${item.type}`);
                setWishlist((prev) => prev.filter((i) => i.id !== id));
            } catch (e) {
                toast.error('Failed to remove from wishlist');
            }
        } else {
            setWishlist((prev) => prev.filter((i) => i.id !== id));
        }
    };

    const moveToCart = (item: WishlistItem) => {
        addItem({
            id: item.id,
            name: item.name,
            price: item.price,
            type: item.type
        });
        removeFromWishlist(item.id);
        toast.success(`${item.name} moved to cart`);
    };

    const isInWishlist = (id: string) => wishlist.some((item) => item.id === id);

    const wishlistCount = wishlist.length;

    return (
        <WishlistContext.Provider value={{
            wishlist,
            addToWishlist,
            removeFromWishlist,
            moveToCart,
            isInWishlist,
            wishlistCount
        }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const ctx = useContext(WishlistContext);
    if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
    return ctx;
};
