import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Method from "./components/Method";
import Team from "./components/Team";
import SocialProof from "./components/SocialProof";
import Location from "./components/Location";
import Contact from "./components/Contact"; // Novo
import Footer from "./components/Footer";   // Novo
import FloatingWhatsapp from "./components/FloatingWhatsapp"; // Novo

export default function Home() {
  return (
    <main className="min-h-screen bg-black-arch text-off-white">
      <Header />
      <Hero />
      <Services />
      <Portfolio />
      <Method />
      <Team />
      <SocialProof />
      <Location />
      <Contact />
      <Footer />
      <FloatingWhatsapp />
    </main>
  );
}