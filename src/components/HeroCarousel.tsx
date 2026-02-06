import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play, Ticket, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMovies, Movie } from "@/hooks/useMovies";
import TrailerModal from "./TrailerModal";

const HeroCarousel = () => {
  const { movies } = useMovies();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // Get all movies for carousel
  const featuredMovies = movies;

  const nextSlide = useCallback(() => {
    if (isAnimating || featuredMovies.length === 0) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, featuredMovies.length]);

  const prevSlide = useCallback(() => {
    if (isAnimating || featuredMovies.length === 0) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + featuredMovies.length) % featuredMovies.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, featuredMovies.length]);

  useEffect(() => {
    if (featuredMovies.length === 0) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide, featuredMovies.length]);

  const handleTrailerClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setShowTrailer(true);
  };

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

  if (featuredMovies.length === 0) {
    return (
      <section className="relative h-screen min-h-[600px] max-h-[900px] bg-gradient-to-b from-secondary to-background flex items-center justify-center">
        <p className="text-muted-foreground text-lg">Carregando filmes...</p>
      </section>
    );
  }

  const currentMovie = featuredMovies[currentIndex];

  return (
    <>
      <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
        {/* Background Images */}
        {featuredMovies.map((movie, index) => (
          <div
            key={movie.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={movie.poster_url}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          </div>
        ))}

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl pt-20">
            {/* Movie Info */}
            <div
              className={`transition-all duration-500 ${
                isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <Badge variant={getAgeBadgeVariant(currentMovie.age_rating)} className="text-sm px-3 py-1">
                  {currentMovie.age_rating === "L" ? "Livre" : `${currentMovie.age_rating}+`}
                </Badge>
                <Badge variant="gold" className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  Em Destaque
                </Badge>
                {currentMovie.sessions?.some((s) => s.tech === "3D") && (
                  <Badge variant="tech3d">3D</Badge>
                )}
              </div>

              <h2 className="text-5xl md:text-7xl font-bold text-foreground mb-4 leading-tight">
                {currentMovie.title}
              </h2>

              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
                {currentMovie.duration && <span>{currentMovie.duration}</span>}
                {currentMovie.genre && currentMovie.genre.length > 0 && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                    <span>{currentMovie.genre.join(", ")}</span>
                  </>
                )}
              </div>

              {currentMovie.synopsis && (
                <p className="text-lg text-foreground/80 mb-8 line-clamp-3 max-w-xl">
                  {currentMovie.synopsis}
                </p>
              )}

              <div className="flex flex-wrap gap-4">
                {currentMovie.trailer_url && (
                  <Button
                    variant="hero"
                    size="xl"
                    onClick={() => handleTrailerClick(currentMovie)}
                  >
                    <Play className="w-5 h-5" />
                    Ver Trailer
                  </Button>
                )}
                <Button variant="heroOutline" size="xl">
                  <Ticket className="w-5 h-5" />
                  Comprar Ingresso
                </Button>
              </div>

              {/* Sessions Preview */}
              {currentMovie.sessions && currentMovie.sessions.length > 0 && (
                <div className="mt-8 flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-muted-foreground mr-2">Horários:</span>
                  {currentMovie.sessions.slice(0, 4).map((session, i) => (
                    <span
                      key={i}
                      className={`session-badge ${session.type === "DUB" ? "session-dub" : "session-leg"}`}
                    >
                      {session.time} {session.type}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        {featuredMovies.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full glass hover:bg-white/20 transition-all duration-300 group"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full glass hover:bg-white/20 transition-all duration-300 group"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
            </button>
          </>
        )}

        {/* Slide Indicators */}
        {featuredMovies.length > 1 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {featuredMovies.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setCurrentIndex(index);
                    setTimeout(() => setIsAnimating(false), 500);
                  }
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-primary"
                    : "w-4 bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Trailer Modal */}
      {showTrailer && selectedMovie?.trailer_url && (
        <TrailerModal
          trailerUrl={selectedMovie.trailer_url}
          movieTitle={selectedMovie.title}
          onClose={() => {
            setShowTrailer(false);
            setSelectedMovie(null);
          }}
        />
      )}
    </>
  );
};

export default HeroCarousel;
