import { useState } from "react";
import { Menu, X, User, Ticket, MessageCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logo from "@/assets/logo-cine-new.png";

const TICKET_URL = "https://www.veloxtickets.com/Portal/Ingresso/Cinema/Cornelio-Procopio";
const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=5543991248744";
const GROUP_URL = "https://chat.whatsapp.com/FURuk506HeM89TliH493NI";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Programação", href: "#programacao" },
    { label: "Unidade", href: "#localizacao" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Cine Cornélio Procópio" className="h-10 md:h-12" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
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
          <div className="flex items-center gap-2">
            <a
              href={TICKET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block"
            >
              <Button variant="gold" size="sm">
                <Ticket className="w-4 h-4" />
                Comprar Ingresso
              </Button>
            </a>
            
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:block"
            >
              <Button variant="outline" size="sm">
                <MessageCircle className="w-4 h-4" />
                Fale Conosco
              </Button>
            </a>

            <Link to="/admin">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <User className="w-5 h-5" />
              </Button>
            </Link>

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
          isMenuOpen ? "max-h-80 border-t border-white/10" : "max-h-0"
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
          
          <a
            href={TICKET_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-lg font-medium text-primary py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <Ticket className="w-5 h-5" />
            Comprar Ingresso
          </a>
          
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-lg font-medium text-foreground hover:text-primary transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <MessageCircle className="w-5 h-5" />
            Fale Conosco
          </a>
          
          <a
            href={GROUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-lg font-medium text-foreground hover:text-primary transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <Users className="w-5 h-5" />
            Participe do Grupo
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
