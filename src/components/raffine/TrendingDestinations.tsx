import { Star, MapPin, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const destinations = [
    {
        name: "Lume Wellness Spa",
        location: "Downtown District",
        rating: 4.9,
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDUhGyfxQOTVQeWWyc-ieD7TiEw31ujudXKr9Lj8iCGteqcXMWaqQ9PC11CQ3kv4A2eZC69dxzBmoNkzi_3nC_i-X8J3Ke-dm18hIm94A-zBc0pqenCUKrGR1Ak_oD7XDb1vRmbW_cMl7d7brcaAEW6NR4kUFrUsTAPwJZLeL2uUBZ04AA6NvBKBHoe1h04Cgbltffc3tuOxL4YDWSeH0w0kATYF1_gbN97O2zT5dNnAbihjQyx2-Jr4GjZNvkjKl37mBxWlDAXlfg",
    },
    {
        name: "Atelier Hair",
        location: "Westside Avenue",
        rating: 4.8,
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBGUMF584r13priPAZKh7VuSRhL5Yg_u6OKAFC8QpymfmjN-u9Q6zyusDVXEdY5FbFO5WDhYh8rstYtGVi5NVNsilwIvD8PdfWBfkdmPOtl-lFUTQJcgyMvSJUlcdoAs1_VMfhUvvDg5LvD8ozvTWQD_1JTbuK7NNewFzjRhkhjRCmLrN2LOduPTzX9ZWs4G-v0wAbxLkVxKcrZRXEDO0LuAvOPPn4nV49NSrp4NzkkPb7ApWpB2SLw2-3NIXgF1lU_n_BxQC_WjNw",
    },
    {
        name: "Glow Studios",
        location: "Uptown Plaza",
        rating: 4.9,
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBLJewU8GiMXFpcfmu_DlS1ZosGLjk_oDptFsDLYBo3ItisG7g_7CEqFfUqsg9iLHNp8DSsyR1KRtYv4XjDFYo-ADN3inkTBwBX92l-SL9VWdknaDADQe-PbBs7VONdl9fP3Pv1E5kCc8XXaT5YTOTS7KX3gApiKe_kCTTkgiQRcv6JEu2c6BPOOjsrfWvPIkwLh4xCNOz_MhX80NDaa7qjhxMB261lA-rEVHV8-NGaoAWWh2LfdpE4prqZKsoOJTiPhRTeawSmkyI",
    },
    {
        name: "The Nail Bar",
        location: "SoHo District",
        rating: 5.0,
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDBLBIDNiPFE2zigIoeq3ltsN5b0lpotwoyRYvATOeDDH_xw9Qze5SzkP7tFmUB00SGgnr6ZXo2OxoZh7P81fp1TrPSNlg0khg0pBPv3JxHMWDIW-RjxTctRqF9kfXUrZ1kDPQiz4ihKqi5EWSKGLnjaJ4i7taNpvEKhbgo1cAqsrNgmNJSIqE8h5HNr9v4fiOZ0fSJMI4lV-eNZ5RCb3ZjC6uLTtMY1qdmCldmLO_RgCScochwcWy0CNDrv4diob1jqYLSJIb10b0",
    },
];

const TrendingDestinations = () => {
    const navigate = useNavigate();

    return (
        <section className="py-16 md:py-24 px-4 md:px-10 max-w-[1440px] mx-auto">
            <div className="flex items-end justify-between mb-10 px-2">
                <div>
                    <span className="text-raffine-gold text-xs font-bold tracking-[0.15em] uppercase block mb-2">
                        Sanctuaries
                    </span>
                    <h3 className="text-white text-2xl md:text-3xl font-medium">
                        Trending Destinations
                    </h3>
                </div>
                <Link
                    to="/services"
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
                        onClick={() => navigate("/services")}
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
