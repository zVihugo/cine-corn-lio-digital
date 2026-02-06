import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import ProgramacaoSection from "@/components/ProgramacaoSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroCarousel />
        <ProgramacaoSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
