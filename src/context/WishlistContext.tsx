import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useCart } from "./CartContext";
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
    const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
        const stored = localStorage.getItem("raffine_wishlist");
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem("raffine_wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (item: WishlistItem) => {
        setWishlist((prev) => {
            if (prev.find((i) => i.id === item.id)) return prev;
            toast.success(`${item.name} added to wishlist`);
            return [...prev, item];
        });
    };

    const removeFromWishlist = (id: string) => {
        setWishlist((prev) => prev.filter((i) => i.id !== id));
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
