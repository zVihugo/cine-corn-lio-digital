import { useState } from "react";
import { Menu, X, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Programação", href: "#programacao" },
    { label: "Bomboniere", href: "#bomboniere" },
    { label: "Localização", href: "#localizacao" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-gold-dark flex items-center justify-center shadow-lg group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-shadow duration-300">
              <span className="text-primary-foreground font-serif font-bold text-xl">CT</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-serif font-bold text-foreground leading-tight">
                Cine Teatro
              </h1>
              <p className="text-xs text-primary font-medium tracking-wider">
                CORNÉLIO PROCÓPIO
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Cornélio Procópio, PR</span>
            </div>
            
            <Button variant="gold" size="sm" className="hidden sm:inline-flex">
              <Phone className="w-4 h-4" />
              Reservar
            </Button>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 glass-strong overflow-hidden transition-all duration-300 ${
          isMenuOpen ? "max-h-96 border-t border-white/10" : "max-h-0"
        }`}
      >
        <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <Button variant="gold" className="mt-4">
            <Phone className="w-4 h-4" />
            Reservar Ingressos
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
