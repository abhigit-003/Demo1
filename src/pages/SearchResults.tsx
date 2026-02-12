import { useLocation, Link } from "react-router-dom";
import { products, services, items } from "@/data/mockData";
import { Star, ShoppingBag, Clock, MapPin, Package, Sparkles, Tag, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

type SearchResultType = "product" | "service" | "item";

const SearchResults = () => {
    const location = useLocation();
    const { addItem } = useCart();
    const queryParams = new URLSearchParams(location.search);
    const q = queryParams.get("q")?.toLowerCase() || "";

    // Helper function for unified filtering
    const filterData = <T extends { name: string; description: string }>(data: T[], type: SearchResultType): (T & { type: SearchResultType })[] => {
        return data
            .filter((item) =>
                item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)
            )
            .map((item) => ({ ...item, type }));
    };

    const filteredProducts = filterData(products, "product");
    const filteredServices = filterData(services, "service");
    const filteredItems = filterData(items, "item");

    const totalResults = filteredProducts.length + filteredServices.length + filteredItems.length;
    const hasResults = totalResults > 0;

    const ResultCard = ({ item }: { item: any }) => {
        const isProduct = item.type === "product";
        const isService = item.type === "service";
        const isItem = item.type === "item";

        const getLink = () => {
            if (isProduct) return `/product/${item.id}`;
            if (isService) return `/service/${item.id}`;
            return `/item/${item.id}`;
        };

        return (
            <div className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-raffine-primary/50 transition-all duration-300 flex flex-col h-full">
                <div className="aspect-square md:aspect-[16/10] bg-white/5 relative overflow-hidden flex items-center justify-center text-white/10">
                    {isProduct && <ShoppingBag className="size-16" />}
                    {isService && <Sparkles className="size-16" />}
                    {isItem && <Package className="size-16" />}

                    {item.price && (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                addItem({ id: item.id, name: item.name, price: item.price, type: item.type });
                                toast.success(`${item.name} added to your bag`);
                            }}
                            className="absolute bottom-4 right-4 bg-raffine-primary text-white p-3 rounded-full shadow-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10"
                        >
                            <ShoppingBag className="size-5" />
                        </button>
                    )}
                </div>

                <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded border border-white/20 text-raffine-gold/60">
                            {item.type}
                        </span>
                        {item.rating && (
                            <div className="flex items-center gap-1 text-raffine-primary">
                                <Star className="size-3 fill-current" />
                                <span className="text-xs font-bold">{item.rating}</span>
                            </div>
                        )}
                    </div>

                    <h3 className="text-white text-xl font-semibold group-hover:text-raffine-primary transition-colors mb-2">
                        <Link to={getLink()}>{item.name}</Link>
                    </h3>

                    <p className="text-white/60 text-sm line-clamp-2 mb-6">
                        {item.description}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                        {item.price ? (
                            <span className="text-2xl font-bold text-white">₹{item.price}</span>
                        ) : (
                            <span className="text-sm font-medium text-raffine-gold/40">Inquire for Price</span>
                        )}
                        <Link
                            to={getLink()}
                            className="bg-white/10 hover:bg-raffine-primary text-white px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all"
                        >
                            View Details
                        </Link>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-12">
            <div className="mb-12 text-center md:text-left">
                <h1 className="text-3xl md:text-5xl font-display text-white mb-4">
                    Search Results
                </h1>
                <p className="text-raffine-gold/60 text-lg">
                    {hasResults
                        ? `Found ${totalResults} results for "${q}"`
                        : `No results found for "${q}"`}
                </p>
            </div>

            {!hasResults && (
                <div className="py-20 text-center border border-white/10 rounded-3xl bg-white/5 shadow-inner">
                    <div className="size-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Search className="size-10 text-white/20" />
                    </div>
                    <p className="text-white/40 text-xl font-light max-w-md mx-auto">
                        We couldn't find any results matching your search. Try different keywords or browse our categories.
                    </p>
                    <Link
                        to="/"
                        className="mt-8 inline-block bg-raffine-pink text-white px-8 py-4 rounded-lg text-sm font-bold uppercase tracking-widest hover:opacity-90 transition-all transform hover:-translate-y-1 shadow-lg"
                    >
                        Explore Collections
                    </Link>
                </div>
            )}

            <div className="space-y-20">
                {/* Services Group */}
                {filteredServices.length > 0 && (
                    <section>
                        <div className="flex items-center gap-4 mb-8">
                            <Sparkles className="size-6 text-raffine-pink" />
                            <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-widest">
                                Experiences & Services
                            </h2>
                            <div className="h-px bg-white/10 flex-1 ml-4" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredServices.map(svc => <ResultCard key={svc.id} item={svc} />)}
                        </div>
                    </section>
                )}

                {/* Products Group */}
                {filteredProducts.length > 0 && (
                    <section>
                        <div className="flex items-center gap-4 mb-8">
                            <ShoppingBag className="size-6 text-raffine-pink" />
                            <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-widest">
                                Clean Beauty Products
                            </h2>
                            <div className="h-px bg-white/10 flex-1 ml-4" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {filteredProducts.map(p => <ResultCard key={p.id} item={p} />)}
                        </div>
                    </section>
                )}

                {/* Items Group */}
                {filteredItems.length > 0 && (
                    <section>
                        <div className="flex items-center gap-4 mb-8">
                            <Tag className="size-6 text-raffine-pink" />
                            <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-widest">
                                Lifestyle Items
                            </h2>
                            <div className="h-px bg-white/10 flex-1 ml-4" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {filteredItems.map(i => <ResultCard key={i.id} item={i} />)}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default SearchResults;
