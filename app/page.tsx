import Navbar from "@/components/Navbar";
import FlightSearchSection from "@/components/FlightSearchSection";
import WhyUs from "@/components/WhyUs";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <FlightSearchSection />
      <WhyUs />
      <Footer />
    </main>
  );
}
