import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocationSection from "@/components/LocationSection";
import BookingForm from "@/components/BookingForm";

const Contacto = () => {
  useEffect(() => {
    document.title = "Contacto | ProTopo Academy";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24">
        <LocationSection />
        <BookingForm />
      </div>
      <Footer />
    </div>
  );
};

export default Contacto;
