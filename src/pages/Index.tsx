import HeroSection from "@/components/landing/HeroSection";
import BrandSection from "@/components/landing/BrandSection";
import CategorySection from "@/components/landing/CategorySection";
import FeaturedServices from "@/components/landing/FeaturedServices";
import HowItWorks from "@/components/landing/HowItWorks";
import FeaturedProducts from "@/components/landing/FeaturedProducts";
import VendorSection from "@/components/landing/VendorSection";
import Testimonials from "@/components/landing/Testimonials";
import TrustMetrics from "@/components/landing/TrustMetrics";
import Newsletter from "@/components/landing/Newsletter";
const Index = () => {
  return (
    <div>
      <main>
        <HeroSection />
        <BrandSection />
        <CategorySection />
        <FeaturedServices />
        <HowItWorks />
        <FeaturedProducts />
        <VendorSection />
        <Testimonials />
        <TrustMetrics />
        <Newsletter />
      </main>
    </div>
  );
};

export default Index;
