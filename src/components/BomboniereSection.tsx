import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { snacks } from "@/data/snacks";

const BomboniereSection = () => {
  const formatPrice = (price: number) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <section id="bomboniere" className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
            🍿 Bomboniere
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Combos & Delícias
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Complete sua experiência cinematográfica com nossos deliciosos combos.
            Pipoca fresquinha, bebidas geladas e muito mais!
          </p>
        </div>

        {/* Snacks Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {snacks.filter(s => s.category === "combo").map((snack, index) => (
            <div
              key={snack.id}
              className="group relative overflow-hidden rounded-2xl glass-strong hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] transition-all duration-500"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={snack.image}
                  alt={snack.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                
                {/* Price Badge */}
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-primary text-primary-foreground font-bold text-sm shadow-lg">
                  {formatPrice(snack.price)}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-serif font-bold text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                  {snack.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {snack.description}
                </p>
                <Button
                  variant="gold"
                  className="w-full"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Adicionar
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Peça pelo app e retire direto no balcão sem fila!
          </p>
          <Button variant="outline" size="lg">
            Ver Menu Completo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BomboniereSection;
