import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import ProgramacaoSection from "@/components/ProgramacaoSection";
import BomboniereSection from "@/components/BomboniereSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroCarousel />
        <ProgramacaoSection />
        <BomboniereSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
