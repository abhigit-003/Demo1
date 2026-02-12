import { Link } from "react-router-dom";

const Editorial = () => {
    return (
        <section className="w-full px-4 md:px-10 py-8 bg-raffine-bg-dark">
            <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-3xl shadow-2xl border border-white/5 flex items-center justify-center">
                <div
                    className="absolute inset-0 bg-cover bg-fixed bg-center transition-transform duration-700 hover:scale-105"
                    style={{
                        backgroundImage:
                            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCtpmKrQXg4AS-kQnLby_ySRQ4IXoenSf9MvfyMRVieYrEld-rfiRYb9K-WX0dR-MiZ8BBu-u-Kb5s25riHl0jgDQ4-jHMXLHUYH8t-zKwfPnENo0EKNSjqzV_LkOH2o1XwHA6mgEKHhH17oo7DKo9fY4sqo0xRHj42OwDGW-fDsz6lzGYM51g0soCMkvX6fKGj2rD4-Xw0rjs8b4s8PBrr0EUrTCo_bL8OjlttsEOj4-2rG_cuK6J7Z-oFZ8qcv1hHwuAe_sfi59A')",
                    }}
                ></div>
                <div className="absolute inset-0 bg-raffine-bg-dark/40"></div>
                <div className="relative z-10 text-center px-4">
                    <h2 className="text-4xl md:text-6xl font-display text-white mb-6 font-thin tracking-tight">
                        The Art of Self-Care
                    </h2>
                    <p className="text-lg text-white/90 mb-8 max-w-xl mx-auto font-light">
                        Explore our seasonal editorial on establishing rituals that ground
                        and restore.
                    </p>
                    <Link
                        to="/editorial"
                        className="inline-block bg-raffine-primary hover:bg-raffine-primary/90 text-white px-8 py-4 rounded-lg text-sm font-bold uppercase tracking-widest transition-all transform hover:-translate-y-1 shadow-lg shadow-raffine-primary/20"
                    >
                        Read the Journal
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Editorial;
