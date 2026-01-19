import { X, Clock, Star, Play, Ticket, MapPin, Users, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Movie } from "@/data/movies";

interface MovieDetailModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieDetailModal = ({ movie, onClose }: MovieDetailModalProps) => {
  const getAgeBadgeVariant = (age: Movie["ageRating"]) => {
    const variants: Record<Movie["ageRating"], "ageL" | "age10" | "age12" | "age14" | "age16" | "age18"> = {
      L: "ageL",
      "10": "age10",
      "12": "age12",
      "14": "age14",
      "16": "age16",
      "18": "age18",
    };
    return variants[age];
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/90 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto scrollbar-cinema rounded-2xl glass-strong animate-scale-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full glass hover:bg-white/20 transition-colors"
          aria-label="Fechar"
        >
          <X className="w-6 h-6 text-foreground" />
        </button>

        <div className="grid md:grid-cols-[300px,1fr] gap-6 p-6">
          {/* Poster */}
          <div className="relative">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full rounded-xl shadow-2xl"
            />
            <div className="absolute top-3 left-3">
              <Badge variant={getAgeBadgeVariant(movie.ageRating)} className="text-sm font-bold px-3 py-1">
                {movie.ageRating === "L" ? "Livre" : `${movie.ageRating} anos`}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {movie.sessions.some((s) => s.tech === "3D") && (
                <Badge variant="tech3d">3D Disponível</Badge>
              )}
              {movie.genre.map((g) => (
                <Badge key={g} variant="outline" className="text-primary border-primary/30">
                  {g}
                </Badge>
              ))}
            </div>

            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              {movie.title}
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {movie.duration}
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-primary fill-primary" />
                Em Cartaz
              </span>
            </div>

            {/* Synopsis */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">Sinopse</h3>
              <p className="text-muted-foreground leading-relaxed">{movie.synopsis}</p>
            </div>

            {/* Technical Info */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-secondary/50">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <Video className="w-4 h-4" />
                  <span className="font-semibold">Direção</span>
                </div>
                <p className="text-foreground">{movie.director}</p>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <Users className="w-4 h-4" />
                  <span className="font-semibold">Elenco</span>
                </div>
                <p className="text-foreground text-sm">{movie.cast.join(", ")}</p>
              </div>
            </div>

            {/* Sessions */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Horários de Hoje</h3>
              <div className="flex flex-wrap gap-2">
                {movie.sessions.map((session, i) => (
                  <button
                    key={i}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                      session.type === "DUB"
                        ? "bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30"
                        : "bg-accent/20 text-accent border border-accent/30 hover:bg-accent/30"
                    }`}
                  >
                    <span className="font-bold">{session.time}</span>
                    <span className="ml-2 text-sm opacity-80">
                      {session.type} • {session.tech}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 mt-auto pt-4 border-t border-border">
              <Button variant="hero" size="lg" className="flex-1 sm:flex-none">
                <Play className="w-5 h-5" />
                Ver Trailer
              </Button>
              <Button variant="cinema" size="lg" className="flex-1 sm:flex-none">
                <Ticket className="w-5 h-5" />
                Comprar Ingresso
              </Button>
            </div>

            {/* Location */}
            <div className="mt-6 p-4 rounded-xl bg-secondary/30 flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">Exibindo em</p>
                <p className="text-foreground font-medium">
                  Cine Teatro Cornélio Procópio • Centro
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailModal;
