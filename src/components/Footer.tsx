import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer id="contato" className="bg-card border-t border-border">
      {/* Location Section */}
      <section id="localizacao" className="py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-2xl aspect-video lg:aspect-auto lg:h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3661.0876741547373!2d-50.64946568503551!3d-23.18072558486371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94efbe2d7d8d3a67%3A0x8f0a9f0a9f0a9f0a!2sCorn%C3%A9lio%20Proc%C3%B3pio%2C%20PR!5e0!3m2!1spt-BR!2sbr!4v1620000000000!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização do Cine Teatro Cornélio Procópio"
              />
            </div>

            {/* Info */}
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
                📍 Localização
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
                Venha nos Visitar
              </h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Endereço</h3>
                    <p className="text-muted-foreground">
                      Rua Brasil, 1234 - Centro<br />
                      Cornélio Procópio - PR, 86300-000
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Horário de Funcionamento</h3>
                    <p className="text-muted-foreground">
                      Segunda a Domingo: 13h às 00h<br />
                      Bilheteria abre 1h antes da primeira sessão
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Contato</h3>
                    <p className="text-muted-foreground">
                      (43) 3523-1234<br />
                      WhatsApp: (43) 99999-1234
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button variant="gold" size="lg">
                  <MapPin className="w-4 h-4" />
                  Como Chegar
                </Button>
                <Button variant="outline" size="lg">
                  <Phone className="w-4 h-4" />
                  Ligar Agora
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Bottom */}
      <div className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-gold-dark flex items-center justify-center">
                <span className="text-primary-foreground font-serif font-bold text-xl">CT</span>
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-foreground">Cine Teatro</h3>
                <p className="text-xs text-primary">Cornélio Procópio</p>
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#programacao" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Programação
              </a>
              <a href="#bomboniere" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Bomboniere
              </a>
              <a href="#localizacao" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Localização
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Política de Privacidade
              </a>
            </div>

            {/* Social */}
            <div className="flex justify-center md:justify-end gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Cine Teatro Cornélio Procópio. Todos os direitos reservados.
            </p>
            <p className="text-xs text-muted-foreground/60 mt-2">
              Patrimônio Cultural de Cornélio Procópio, PR
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
