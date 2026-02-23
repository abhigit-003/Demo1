import { Star, MapPin, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useServices } from "@/hooks/useServices";

const TrendingDestinations = () => {
    const navigate = useNavigate();
    const { data: services, isLoading } = useServices({ limit: 4, sort: 'rating' });

    if (isLoading) return <div className="text-white text-center py-20">Loading trending destinations...</div>;

    const destinations = services?.map(s => ({
        id: s.id,
        name: s.name,
        location: s.location,
        rating: s.rating,
        route: `/services/${s.id}`,
        image: s.image
    })) || [];

    if (destinations.length === 0) return null;

    return (
        <section className="py-16 md:py-24 px-4 md:px-10 max-w-[1440px] mx-auto">
            <div className="flex items-end justify-between mb-10 px-2">
                <div>
                    <span className="text-raffine-gold text-xs font-bold tracking-[0.15em] uppercase block mb-2">
                        Sanctuaries
                    </span>
                    <h3 className="text-white text-2xl md:text-3xl font-medium">
                        Trending Services
                    </h3>
                </div>
                <Link
                    to="/all"
                    className="hidden md:flex items-center gap-1 text-sm text-white/70 hover:text-raffine-primary transition-colors"
                >
                    View All <ArrowRight className="size-[18px]" />
                </Link>
            </div>
            {/* Carousel */}
            <div className="flex overflow-x-auto gap-6 pb-8 no-scrollbar snap-x snap-mandatory">
                {destinations.map((dest, index) => (
                    <div
                        key={index}
                        onClick={() => navigate(dest.route)}
                        className="min-w-[300px] md:min-w-[340px] snap-center group cursor-pointer"
                    >
                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-raffine-bg-dark px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                                <Star className="size-[14px] text-yellow-600 fill-yellow-600" />{" "}
                                {dest.rating}
                            </div>
                            <div
                                className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                style={{ backgroundImage: `url('${dest.image}')` }}
                            ></div>
                        </div>
                        <h4 className="text-white text-lg font-bold mb-1 group-hover:text-raffine-primary transition-colors">
                            {dest.name}
                        </h4>
                        <div className="flex items-center gap-1 text-raffine-gold text-sm">
                            <MapPin className="size-[16px]" />
                            <span>{dest.location}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TrendingDestinations;
