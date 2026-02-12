import { useNavigate } from "react-router-dom";

const Hero = () => {
    const navigate = useNavigate();

    return (
        <section className="relative w-full min-h-[calc(100vh-80px)] flex flex-col md:flex-row gap-6 px-4 md:px-10 py-8 bg-raffine-bg-dark overflow-hidden">
            {/* Left Pillar: Services */}
            <div className="group relative flex-1 min-h-[50vh] md:min-h-auto w-full overflow-hidden rounded-3xl shadow-2xl border border-white/5">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{
                        backgroundImage:
                            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCWQLcU3MSoOi5p99iVc3KaNBGn0W4lr6yBxiEsnBqUUP5Jgq4o22NyYSUkJMrnLss66lJ2hJ-jaDGTA6kaxsXwPWAiltKV6ltK0GCqq8HX2W_wpSv895cUUQ1CGFHJakkTnvRQrsV_cDn9vsSfDGLjJro3hh0hIhoY3-Rm6zwm1A1N9ve8RvTMdT13qzrKd2zHviXMXd5oEw20ItGJEX39tf8qiWc95pT0--D9rKIsJfXif1YpxMug4ue9UAfbdS4Zr0Tp6_JqXa4')",
                    }}
                ></div>
                <div className="absolute inset-0 bg-raffine-bg-dark/40 group-hover:bg-raffine-bg-dark/30 transition-colors duration-500"></div>
                <div className="relative h-full flex flex-col justify-center items-center text-center px-6 p-12 z-10">
                    <span className="text-raffine-gold tracking-[0.2em] uppercase text-xs font-bold mb-4">
                        The Directory
                    </span>
                    <h2 className="text-white text-4xl md:text-5xl font-light mb-6">
                        Book an Experience
                    </h2>
                    <p className="text-gray-200 max-w-md mb-8 font-light text-lg">
                        Discover world-class salons, spas, and wellness sanctuaries near
                        you.
                    </p>
                    <button
                        onClick={() => navigate("/spa")}
                        className="px-8 py-4 bg-raffine-primary hover:bg-raffine-primary/90 text-white text-sm font-bold uppercase tracking-widest rounded-lg transition-all transform hover:-translate-y-1 shadow-lg shadow-raffine-primary/20"
                    >
                        Find a Salon
                    </button>
                </div>
            </div>
            {/* Right Pillar: Shop */}
            <div className="group relative flex-1 min-h-[50vh] md:min-h-auto w-full overflow-hidden rounded-3xl shadow-2xl border border-white/5">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{
                        backgroundImage:
                            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA1Ffoi5X8J2KyQM_gaotdEwjgVlXuh08Lwnjy4IRQATgpht-GuxUD4KhY435Hv2ldwrjlhj3noud1ijHbwOrW2s471MfuBY_lbWBkBoUR6jLrs3sSjLa_wlnFWNrRJZJ8fPavNidPD6mtwk5AInDfhAvCXFIx4q5iOKs9gQn8HA6glFTTc7GtCjm8CMFDRuvXD2Mj5WhAV6d59AHFTuOOlTLQdPkfHUiG1z9k8aUscWaInluydaY75GTnS3CEGsaDr7jpxFIAbWpQ')",
                    }}
                ></div>
                <div className="absolute inset-0 bg-raffine-bg-dark/40 group-hover:bg-raffine-bg-dark/30 transition-colors duration-500"></div>
                <div className="relative h-full flex flex-col justify-center items-center text-center px-6 p-12 z-10">
                    <span className="text-raffine-gold tracking-[0.2em] uppercase text-xs font-bold mb-4">
                        The Collection
                    </span>
                    <h2 className="text-white text-4xl md:text-5xl font-light mb-6">
                        Shop the Edit
                    </h2>
                    <p className="text-gray-200 max-w-md mb-8 font-light text-lg">
                        Curated beauty essentials and high-performance skincare.
                    </p>
                    <button
                        onClick={() => navigate("/shop")}
                        className="px-8 py-4 bg-raffine-primary hover:bg-raffine-primary/90 text-white text-sm font-bold uppercase tracking-widest rounded-lg transition-all transform hover:-translate-y-1 shadow-lg shadow-raffine-primary/20"
                    >
                        Shop Products
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
