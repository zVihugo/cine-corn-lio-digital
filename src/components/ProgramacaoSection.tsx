import { useState, useEffect, useRef } from "react";
import { Calendar, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import MovieCard from "./MovieCard";
import MovieDetailModal from "./MovieDetailModal";
import { movies, genres, Movie, getMoviesByDay } from "@/data/movies";

const ProgramacaoSection = () => {
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState("Todos");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [visibleMovies, setVisibleMovies] = useState<Movie[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const days = [
    { label: "Hoje", date: new Date() },
    { label: "Amanhã", date: new Date(Date.now() + 86400000) },
    { label: "Quinta", date: new Date(Date.now() + 86400000 * 2) },
    { label: "Sexta", date: new Date(Date.now() + 86400000 * 3) },
    { label: "Sábado", date: new Date(Date.now() + 86400000 * 4) },
  ];

  useEffect(() => {
    let filtered = getMoviesByDay(selectedDay);
    
    if (selectedGenre !== "Todos") {
      filtered = filtered.filter((m) => m.genre.includes(selectedGenre));
    }
    
    setVisibleMovies(filtered);
  }, [selectedDay, selectedGenre]);

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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
  };

  return (
    <section id="programacao" ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-2">
              Programação
            </h2>
            <p className="text-muted-foreground">
              Confira todos os filmes em cartaz no Cine Teatro Cornélio Procópio
            </p>
          </div>

          {/* Day Selector */}
          <div className="flex flex-wrap gap-2">
            {days.map((day, index) => (
              <button
                key={index}
                onClick={() => setSelectedDay(index)}
                className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-300 flex flex-col items-center min-w-[80px] ${
                  selectedDay === index
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                }`}
              >
                <span className="text-sm font-bold">{day.label}</span>
                <span className="text-xs opacity-70">{formatDate(day.date)}</span>
              </button>
            ))}
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

        {/* Movies Grid */}
        {visibleMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {visibleMovies.map((movie, index) => (
              <div
                key={movie.id}
                className="movie-card-wrapper opacity-0"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <MovieCard movie={movie} onSelect={setSelectedMovie} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg mb-4">
              Nenhum filme encontrado para os filtros selecionados
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedGenre("Todos");
                setSelectedDay(0);
              }}
            >
              Limpar Filtros
            </Button>
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
