import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Programação", href: "#programacao" },
    { label: "Bomboniere", href: "#bomboniere" },
    { label: "Unidade", href: "#localizacao" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo Icon Only */}
          <a href="/" className="flex items-center group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-gold-dark flex items-center justify-center shadow-lg group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-shadow duration-300">
              <span className="text-primary-foreground font-bold text-lg">CT</span>
            </div>
          </a>

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
          <div className="flex items-center gap-3">
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
          <Link 
            to="/admin" 
            className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Administração
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
