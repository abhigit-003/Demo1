import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `radial-gradient(ellipse at 50% 0%, hsl(340 85% 55% / 0.3), transparent 70%)`,
      }} />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <h1 className="animate-fade-in text-5xl font-extrabold leading-tight tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          Where Beauty Meets{" "}
          <span className="text-gradient">Intention</span>
        </h1>
        <p className="animate-fade-in-delay-1 mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Curated wellness, beauty and lifestyle experiences for the discerning.
        </p>
        <div className="animate-fade-in-delay-2 mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            to="/spa"
            className="inline-flex h-12 items-center rounded-lg bg-primary px-8 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
          >
            Explore Services
          </Link>
          <Link
            to="/shop"
            className="inline-flex h-12 items-center rounded-lg border border-border bg-secondary px-8 text-sm font-semibold text-secondary-foreground transition-transform hover:scale-[1.02]"
          >
            Shop Essentials
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
