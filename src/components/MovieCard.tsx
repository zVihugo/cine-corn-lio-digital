import { Clock, Ticket, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Movie } from "@/data/movies";

interface MovieCardProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
}

const MovieCard = ({ movie, onSelect }: MovieCardProps) => {
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
    <div className="cinema-card group cursor-pointer" onClick={() => onSelect(movie)}>
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-80" />
        
        {/* Age Badge */}
        <div className="absolute top-3 left-3">
          <Badge variant={getAgeBadgeVariant(movie.ageRating)} className="text-xs font-bold">
            {movie.ageRating === "L" ? "L" : movie.ageRating}
          </Badge>
        </div>

        {/* 3D Badge if applicable */}
        {movie.sessions.some((s) => s.tech === "3D") && (
          <div className="absolute top-3 right-3">
            <Badge variant="tech3d" className="text-xs font-bold">3D</Badge>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-4">
          <Button variant="gold" size="lg" onClick={(e) => { e.stopPropagation(); onSelect(movie); }}>
            <Info className="w-4 h-4" />
            Ver Detalhes
          </Button>
          <Button variant="cinema" size="lg">
            <Ticket className="w-4 h-4" />
            Comprar
          </Button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-serif font-semibold text-lg text-foreground mb-1 line-clamp-1 group-hover:text-primary transition-colors">
          {movie.title}
        </h3>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Clock className="w-3.5 h-3.5" />
          <span>{movie.duration}</span>
          <span className="w-1 h-1 rounded-full bg-muted-foreground" />
          <span className="line-clamp-1">{movie.genre[0]}</span>
        </div>

        {/* Sessions */}
        <div className="flex flex-wrap gap-1.5">
          {movie.sessions.slice(0, 3).map((session, i) => (
            <span
              key={i}
              className={`text-xs px-2 py-1 rounded ${
                session.type === "DUB"
                  ? "bg-primary/20 text-primary"
                  : "bg-accent/20 text-accent"
              }`}
            >
              {session.time}
            </span>
          ))}
          {movie.sessions.length > 3 && (
            <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
              +{movie.sessions.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
