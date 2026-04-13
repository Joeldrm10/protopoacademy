import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import SignupCTA from "@/components/SignupCTA";
import BookingForm from "@/components/BookingForm";
import TeamSection from "@/components/TeamSection";
import CampSection from "@/components/CampSection";
import GalleryCTA from "@/components/GalleryCTA";
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
      <BookingForm />
      <SignupCTA />
      <TeamSection />
      <CampSection />
      <GalleryCTA />
      <KitSection />
      <LocationSection />
      <FAQSection />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
