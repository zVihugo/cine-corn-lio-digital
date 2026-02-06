import { X, Clock, Play, MapPin, User, Film, Calendar, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Movie } from "@/hooks/useMovies";
import { useState } from "react";
import TrailerModal from "./TrailerModal";

const TICKET_URL = "https://www.veloxtickets.com/Portal/Ingresso/Cinema/Cornelio-Procopio";

interface MovieDetailModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieDetailModal = ({ movie, onClose }: MovieDetailModalProps) => {
  const [showTrailer, setShowTrailer] = useState(false);

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

  const getAllDays = () => {
    if (!movie.sessions || movie.sessions.length === 0) return [];
    const allDays = movie.sessions.flatMap((s) => s.days || []);
    return [...new Set(allDays)];
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
        
        <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-strong rounded-2xl scrollbar-cinema">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 text-foreground hover:text-primary"
          >
            <X className="w-6 h-6" />
          </Button>

          <div className="grid md:grid-cols-[300px_1fr] gap-6 p-6">
            {/* Poster */}
            <div className="relative">
              <img
                src={movie.poster_url}
                alt={movie.title}
                className="w-full rounded-xl shadow-2xl"
              />
              
              {movie.trailer_url && (
                <Button
                  variant="gold"
                  className="absolute bottom-4 left-4 right-4"
                  onClick={() => setShowTrailer(true)}
                >
                  <Play className="w-4 h-4" />
                  Ver Trailer
                </Button>
              )}
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant={getAgeBadgeVariant(movie.age_rating)} className="text-sm">
                    {movie.age_rating === "L" ? "Livre" : `${movie.age_rating} anos`}
                  </Badge>
                  {movie.sessions?.some((s) => s.tech === "3D") && (
                    <Badge variant="tech3d">3D</Badge>
                  )}
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {movie.title}
                </h2>
                
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                  {movie.duration && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {movie.duration}
                    </span>
                  )}
                  {movie.genre && movie.genre.length > 0 && (
                    <span className="flex items-center gap-1">
                      <Film className="w-4 h-4" />
                      {movie.genre.join(", ")}
                    </span>
                  )}
                </div>
              </div>

              {/* Synopsis */}
              {movie.synopsis && (
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Sinopse</h3>
                  <p className="text-muted-foreground leading-relaxed">{movie.synopsis}</p>
                </div>
              )}

              {/* Crew */}
              <div className="grid grid-cols-2 gap-4">
                {movie.director && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Direção</h4>
                    <p className="text-foreground flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" />
                      {movie.director}
                    </p>
                  </div>
                )}
                {movie.cast_members && movie.cast_members.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Elenco</h4>
                    <p className="text-foreground">{movie.cast_members.join(", ")}</p>
                  </div>
                )}
              </div>

              {/* Sessions */}
              {movie.sessions && movie.sessions.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Sessões
                  </h3>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {getAllDays().map((day, i) => (
                      <span key={i} className="px-3 py-1 bg-secondary rounded-full text-sm text-muted-foreground">
                        {day}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {movie.sessions.map((session, i) => (
                      <div
                        key={i}
                        className={`p-3 rounded-lg border ${
                          session.highlight
                            ? "border-amber-500/50 bg-amber-500/10"
                            : "border-primary/30 bg-primary/10"
                        }`}
                      >
                        <span className={`text-xl font-bold ${session.highlight ? "text-amber-400" : "text-primary"}`}>
                          {session.time}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={session.type === "DUB" ? "dubbed" : "subtitled"} className="text-xs">
                            {session.type === "DUB" ? "Dublado" : "Legendado"}
                          </Badge>
                          <Badge variant={session.tech === "3D" ? "tech3d" : "tech2d"} className="text-xs">
                            {session.tech}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Buy Ticket Button */}
              <div className="pt-4">
                <a
                  href={TICKET_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button variant="gold" size="lg" className="w-full">
                    <Ticket className="w-5 h-5" />
                    Comprar Ingresso
                  </Button>
                </a>
              </div>

              {/* Location */}
              <div className="pt-4 border-t border-border">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-foreground">Cine Teatro Cornélio Procópio</h4>
                    <p className="text-sm text-muted-foreground">
                      R. XV de Novembro, Centro - Cornélio Procópio, PR
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
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

export default MovieDetailModal;
