import { Calendar, Play, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Movie } from "@/hooks/useMovies";
import { useState } from "react";
import TrailerModal from "./TrailerModal";

interface MovieCardProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
  hideSessionsAndDays?: boolean;
}

const MovieCard = ({ movie, onSelect, hideSessionsAndDays = false }: MovieCardProps) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const isComingSoon = movie.is_coming_soon;

  const getAgeBadgeVariant = (age: string) => {
    const variants: Record<string, "ageL" | "age10" | "age12" | "age14" | "age16" | "age18"> = {
      L: "ageL",
      "10": "age10",
      "12": "age12",
      "14": "age14",
      "16": "age16",
      "18": "age18",
    };
    return variants[age] || "age12";
  };

  // Get unique days from all sessions
  const getAllDays = () => {
    if (!movie.sessions || movie.sessions.length === 0) return [];
    const allDays = movie.sessions.flatMap((s) => s.days || []);
    return [...new Set(allDays)];
  };

  const handleTrailerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (movie.trailer_url) {
      setShowTrailer(true);
    }
  };

  return (
    <>
      <div className="cinema-card group cursor-pointer" onClick={() => onSelect(movie)}>
        {/* Poster */}
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={movie.poster_url}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-80" />
          
          {/* Age Badge */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            <Badge variant={getAgeBadgeVariant(movie.age_rating)} className="text-xs font-bold">
              {movie.age_rating === "L" ? "L" : movie.age_rating}
            </Badge>
            {/* Coming Soon Badge */}
            {isComingSoon && (
              <Badge className="text-xs font-bold bg-amber-500 text-black hover:bg-amber-400">
                Em breve
              </Badge>
            )}
          </div>

          {/* 3D Badge if applicable */}
          {movie.sessions?.some((s) => s.tech === "3D") && (
            <div className="absolute top-3 right-3">
              <Badge variant="tech3d" className="text-xs font-bold">3D</Badge>
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3">
            {movie.trailer_url && (
              <Button variant="gold" size="lg" onClick={handleTrailerClick}>
                <Play className="w-4 h-4" />
                Ver Trailer
              </Button>
            )}
            <Button variant="cinema" size="lg" onClick={(e) => { e.stopPropagation(); onSelect(movie); }}>
              <Info className="w-4 h-4" />
              Detalhes
            </Button>
          </div>
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors min-h-[3.5rem]">
            {movie.title}
          </h3>
          
          {/* Days - Hide for coming soon */}
          {!hideSessionsAndDays && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3 min-h-[1.25rem]">
              {getAllDays().length > 0 && (
                <>
                  <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="line-clamp-1">{getAllDays().join(", ")}</span>
                </>
              )}
            </div>
          )}

          {/* Sessions with times - Hide for coming soon */}
          {!hideSessionsAndDays && (
            <div className="flex flex-col gap-2 mt-auto">
              {movie.sessions?.slice(0, 3).map((session, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span
                    className={`text-sm font-bold px-2.5 py-1 rounded ${
                      session.highlight
                        ? "bg-amber-500/20 text-amber-400"
                        : "bg-primary/20 text-primary"
                    }`}
                  >
                    {session.time}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {session.type === "DUB" ? "Dub" : "Leg"} • {session.tech}
                  </span>
                </div>
              ))}
            </div>
          )}
          
          {/* Coming soon placeholder */}
          {hideSessionsAndDays && (
            <div className="mt-auto">
              <span className="text-sm text-amber-400 font-medium">
                Em breve nos cinemas
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && movie.trailer_url && (
        <TrailerModal
          trailerUrl={movie.trailer_url}
          movieTitle={movie.title}
          onClose={() => setShowTrailer(false)}
        />
      )}
    </>
  );
};

export default MovieCard;
