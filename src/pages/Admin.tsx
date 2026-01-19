import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Film, Popcorn, Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCinema } from "@/contexts/CinemaContext";
import MovieFormModal from "@/components/admin/MovieFormModal";
import SnackFormModal from "@/components/admin/SnackFormModal";
import { Movie } from "@/data/movies";
import { SnackItem } from "@/data/snacks";

const Admin = () => {
  const { movies, snacks, deleteMovie, deleteSnack } = useCinema();
  const [activeTab, setActiveTab] = useState<"movies" | "snacks">("movies");
  const [isMovieModalOpen, setIsMovieModalOpen] = useState(false);
  const [isSnackModalOpen, setIsSnackModalOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [editingSnack, setEditingSnack] = useState<SnackItem | null>(null);

  const handleEditMovie = (movie: Movie) => {
    setEditingMovie(movie);
    setIsMovieModalOpen(true);
  };

  const handleEditSnack = (snack: SnackItem) => {
    setEditingSnack(snack);
    setIsSnackModalOpen(true);
  };

  const handleCloseMovieModal = () => {
    setIsMovieModalOpen(false);
    setEditingMovie(null);
  };

  const handleCloseSnackModal = () => {
    setIsSnackModalOpen(false);
    setEditingSnack(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <h1 className="text-xl font-bold text-foreground">Administração</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8">
          <Button
            variant={activeTab === "movies" ? "gold" : "secondary"}
            onClick={() => setActiveTab("movies")}
            className="gap-2"
          >
            <Film className="w-4 h-4" />
            Filmes
          </Button>
          <Button
            variant={activeTab === "snacks" ? "gold" : "secondary"}
            onClick={() => setActiveTab("snacks")}
            className="gap-2"
          >
            <Popcorn className="w-4 h-4" />
            Bomboniere
          </Button>
        </div>

        {/* Movies Tab */}
        {activeTab === "movies" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Filmes em Cartaz</h2>
              <Button variant="gold" onClick={() => setIsMovieModalOpen(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                Adicionar Filme
              </Button>
            </div>

            <div className="grid gap-4">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className="glass-strong rounded-xl p-4 flex items-center gap-4"
                >
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-16 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">{movie.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {movie.genre.join(", ")} • {movie.duration}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {movie.sessions.length} sessões configuradas
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`badge-age badge-age-${movie.ageRating}`}
                    >
                      {movie.ageRating}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditMovie(movie)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => deleteMovie(movie.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Snacks Tab */}
        {activeTab === "snacks" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Bomboniere</h2>
              <Button variant="gold" onClick={() => setIsSnackModalOpen(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                Adicionar Item
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {snacks.map((snack) => (
                <div
                  key={snack.id}
                  className="glass-strong rounded-xl p-4 flex items-center gap-4"
                >
                  <img
                    src={snack.image}
                    alt={snack.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">{snack.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {snack.description}
                    </p>
                    <p className="text-primary font-bold mt-1">
                      R$ {snack.price.toFixed(2).replace(".", ",")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditSnack(snack)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => deleteSnack(snack.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Modals */}
      <MovieFormModal
        isOpen={isMovieModalOpen}
        onClose={handleCloseMovieModal}
        movie={editingMovie}
      />
      <SnackFormModal
        isOpen={isSnackModalOpen}
        onClose={handleCloseSnackModal}
        snack={editingSnack}
      />
    </div>
  );
};

export default Admin;
