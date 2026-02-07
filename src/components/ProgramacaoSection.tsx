import { useState, useEffect, useRef } from "react";
import { Filter, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import MovieCard from "./MovieCard";
import MovieDetailModal from "./MovieDetailModal";
import { useMovies, Movie } from "@/hooks/useMovies";

const genres = [
  "Todos",
  "Ação",
  "Aventura",
  "Animação",
  "Biografia",
  "Comédia",
  "Drama",
  "Ficção Científica",
  "Suspense",
  "Terror",
];

const ProgramacaoSection = () => {
  const { movies, isLoading } = useMovies();
  const [selectedGenre, setSelectedGenre] = useState("Todos");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [visibleMovies, setVisibleMovies] = useState<Movie[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  // Filter movies into "now showing" and "coming soon"
  const nowShowingMovies = movies.filter((m) => !m.is_coming_soon);
  const comingSoonMovies = movies.filter((m) => m.is_coming_soon);

  useEffect(() => {
    let filtered = nowShowingMovies;
    
    if (selectedGenre !== "Todos") {
      filtered = filtered.filter((m) => m.genre?.includes(selectedGenre));
    }
    
    setVisibleMovies(filtered);
  }, [selectedGenre, nowShowingMovies.length, movies]);

  // Intersection Observer for fade-in animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = sectionRef.current?.querySelectorAll(".movie-card-wrapper");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [visibleMovies]);

  return (
    <section id="programacao" ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
              Programação
            </h2>
            <p className="text-muted-foreground">
              Confira todos os filmes em cartaz no Cine Cornélio Procópio
            </p>
          </div>
        </div>

        {/* Genre Filters */}
        <div className="mb-8 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-2 pb-2">
            <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  selectedGenre === genre
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {/* Movies Grid - Now Showing */}
        {!isLoading && visibleMovies.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
            {visibleMovies.map((movie, index) => (
              <div
                key={movie.id}
                className="movie-card-wrapper opacity-0 h-full"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <MovieCard movie={movie} onSelect={setSelectedMovie} />
              </div>
            ))}
          </div>
        )}

        {/* Empty state for now showing */}
        {!isLoading && nowShowingMovies.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg mb-4">
              {movies.length === 0
                ? "Nenhum filme cadastrado ainda"
                : "Nenhum filme em cartaz no momento"}
            </p>
          </div>
        )}

        {/* No results for filter */}
        {!isLoading && visibleMovies.length === 0 && nowShowingMovies.length > 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg mb-4">
              Nenhum filme encontrado para os filtros selecionados
            </p>
            {selectedGenre !== "Todos" && (
              <Button variant="outline" onClick={() => setSelectedGenre("Todos")}>
                Limpar Filtros
              </Button>
            )}
          </div>
        )}

        {/* Coming Soon Section */}
        {!isLoading && comingSoonMovies.length > 0 && (
          <div className="mt-16">
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                Em Breve
              </h2>
              <p className="text-muted-foreground">
                Filmes que estreiam em breve no Cine Cornélio Procópio
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
              {comingSoonMovies.map((movie, index) => (
                <div
                  key={movie.id}
                  className="movie-card-wrapper opacity-0 h-full"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <MovieCard movie={movie} onSelect={setSelectedMovie} hideSessionsAndDays />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Movie Detail Modal */}
      {selectedMovie && (
        <MovieDetailModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </section>
  );
};

export default ProgramacaoSection;
