import { Search, Heart, User, ShoppingBag, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";

const Header = () => {
    const { totalItems } = useCart();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    // Prevent scrolling when search is open
    useEffect(() => {
        if (isSearchOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isSearchOpen]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchOpen(false);
            setSearchQuery("");
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-raffine-bg-dark backdrop-blur-md text-white">
            <div className="px-4 md:px-10 py-4 flex items-center justify-between max-w-[1440px] mx-auto">
                {/* Logo Section */}
                <Link to="/" className="flex items-center gap-4">
                    <div className="size-6 text-raffine-primary">
                        <svg
                            fill="none"
                            viewBox="0 0 48 48"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-full h-full"
                        >
                            <path
                                clipRule="evenodd"
                                d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z"
                                fill="currentColor"
                                fillRule="evenodd"
                            ></path>
                        </svg>
                    </div>
                    <h1 className="text-xl font-bold tracking-wide uppercase">Raffine</h1>
                </Link>

                {/* Desktop Nav Links */}
                <nav className="hidden md:flex flex-1 justify-center gap-10">
                    <Link
                        to="/services?category=spa"
                        className="text-raffine-gold hover:text-white text-sm font-semibold tracking-wider transition-colors uppercase"
                    >
                        Spa
                    </Link>
                    <Link
                        to="/services?category=hair"
                        className="text-raffine-gold hover:text-white text-sm font-semibold tracking-wider transition-colors uppercase"
                    >
                        Hair
                    </Link>
                    <Link
                        to="/services?category=fitness"
                        className="text-raffine-gold hover:text-white text-sm font-semibold tracking-wider transition-colors uppercase"
                    >
                        Fitness
                    </Link>
                    <Link
                        to="/services?category=wellness"
                        className="text-raffine-gold hover:text-white text-sm font-semibold tracking-wider transition-colors uppercase"
                    >
                        Wellness
                    </Link>
                    <Link
                        to="/shop"
                        className="text-raffine-gold hover:text-white text-sm font-semibold tracking-wider transition-colors uppercase"
                    >
                        Shop
                    </Link>
                    <Link
                        to="/editorial"
                        className="text-raffine-gold hover:text-white text-sm font-semibold tracking-wider transition-colors uppercase"
                    >
                        Editorial
                    </Link>
                </nav>

                {/* Utility Icons */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="flex items-center justify-center size-10 rounded-full hover:bg-white/5 text-raffine-gold hover:text-white transition-colors"
                    >
                        <Search className="size-[22px]" />
                    </button>
                    <Link to="/cart" className="flex items-center justify-center size-10 rounded-full hover:bg-white/5 text-raffine-gold hover:text-white transition-colors">
                        <Heart className="size-[22px]" />
                    </Link>
                    <Link to="/dashboard" className="flex items-center justify-center size-10 rounded-full hover:bg-white/5 text-raffine-gold hover:text-white transition-colors">
                        <User className="size-[22px]" />
                    </Link>
                    <Link to="/cart" className="relative flex items-center justify-center size-10 rounded-full hover:bg-white/5 text-raffine-gold hover:text-white transition-colors">
                        <ShoppingBag className="size-[22px]" />
                        {totalItems > 0 && (
                            <span className="absolute top-2 right-2 flex items-center justify-center size-4 bg-raffine-primary rounded-full text-[10px] font-bold text-white">
                                {totalItems}
                            </span>
                        )}
                    </Link>
                </div>
            </div>

            {/* Search Overlay */}
            {isSearchOpen && (
                <div className="absolute top-full left-0 w-full z-[100] bg-raffine-bg-dark border-b border-white/10 animate-in slide-in-from-top duration-300 shadow-2xl">
                    <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-6 md:py-8 flex items-center justify-between gap-6">
                        <form onSubmit={handleSearch} className="flex-1">
                            <div className="relative flex items-center gap-4 group">
                                <Search className="size-6 md:size-7 text-raffine-gold group-focus-within:text-raffine-primary transition-colors flex-shrink-0" />
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Search experiences, salons, products..."
                                    className="flex-1 bg-transparent border-b-2 border-white/10 py-2 md:py-3 text-xl md:text-2xl font-light focus:outline-none focus:border-raffine-primary transition-colors text-white placeholder:text-white/20 min-w-0"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </form>
                        <button
                            onClick={() => setIsSearchOpen(false)}
                            className="text-raffine-gold hover:text-white transition-colors p-2 flex-shrink-0"
                            aria-label="Close search"
                        >
                            <X className="size-6 md:size-7" />
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
