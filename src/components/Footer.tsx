import { MapPin, Phone, Clock, Instagram, Facebook, MessageCircle, Users, Ticket, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-cine-new.png";

const TICKET_URL = "https://www.veloxtickets.com/Portal/Ingresso/Cinema/Cornelio-Procopio";
const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=5543991248744";
const GROUP_URL = "https://chat.whatsapp.com/FURuk506HeM89TliH493NI";
const MAPS_URL = "https://www.google.com/maps/dir/?api=1&destination=-23.177800558814756,-50.64708381258222";
const MAPS_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d920.2699!2d-50.64708381258222!3d-23.177800558814756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDEwJzQwLjEiUyA1MMKwMzgnNDkuNSJX!5e0!3m2!1spt-BR!2sbr";
const FACEBOOK_URL = "https://www.facebook.com/cinecornelioprocopio";
const INSTAGRAM_URL = "https://www.instagram.com/cinecornelioprocopio/";

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
                src={MAPS_EMBED_URL}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização do Cine Cornélio Procópio"
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
                      Av. XV de Novembro, 84 – Centro<br />
                      Cornélio Procópio – PR, 86300-000
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
                    <h3 className="font-semibold text-foreground">Telefone / WhatsApp</h3>
                    <p className="text-muted-foreground">
                      +55 (43) 99124-8744
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="gold" size="lg">
                    <Navigation className="w-4 h-4" />
                    Como Chegar
                  </Button>
                </a>
                <a
                  href={TICKET_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="lg">
                    <Ticket className="w-4 h-4" />
                    Comprar Ingresso
                  </Button>
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="lg">
                    <MessageCircle className="w-4 h-4" />
                    Fale Conosco
                  </Button>
                </a>
                <a
                  href={GROUP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="lg">
                    <Users className="w-4 h-4" />
                    Participe do Grupo
                  </Button>
                </a>
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
            <div className="flex items-center justify-center md:justify-start">
              <img src={logo} alt="Cine Cornélio Procópio" className="h-12 md:h-14" />
            </div>

            {/* Links */}
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#programacao" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Programação
              </a>
              <a href="#localizacao" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Localização
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Contato
              </a>
            </div>

            {/* Social */}
            <div className="flex justify-center md:justify-end gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Cine Cornélio Procópio. Todos os direitos reservados.
            </p>
            <p className="text-xs text-muted-foreground/60 mt-2">
              Desenvolvido por Victor Moreira
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
