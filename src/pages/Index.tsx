import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import TeamSection from "@/components/TeamSection";
import CampSection from "@/components/CampSection";
import GallerySection from "@/components/GallerySection";
import KitSection from "@/components/KitSection";
import LocationSection from "@/components/LocationSection";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TeamSection />
      <CampSection />
      <GallerySection />
      <KitSection />
      <LocationSection />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
