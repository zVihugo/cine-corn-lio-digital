import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Film, Plus, Pencil, Trash2, Loader2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import MovieFormModal from "@/components/admin/MovieFormModal";
import AdminLogin from "@/components/admin/AdminLogin";
import { useMovies, Movie } from "@/hooks/useMovies";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const { movies, isLoading, deleteMovie } = useMovies();
  const { isAuthenticated, isLoading: authLoading, signOut } = useAuth();
  const { toast } = useToast();
  const [isMovieModalOpen, setIsMovieModalOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);

  const handleEditMovie = (movie: Movie) => {
    setEditingMovie(movie);
    setIsMovieModalOpen(true);
  };

  const handleDeleteMovie = async (id: string) => {
    try {
      await deleteMovie.mutateAsync(id);
      toast({
        title: "Filme removido",
        description: "O filme foi removido com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível remover o filme.",
        variant: "destructive",
      });
    }
  };

  const handleCloseMovieModal = () => {
    setIsMovieModalOpen(false);
    setEditingMovie(null);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Logout realizado",
        description: "Você saiu do painel administrativo.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível fazer logout.",
        variant: "destructive",
      });
    }
  };

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Show login if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin />;
  }

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
            <Button variant="ghost" onClick={handleSignOut} className="gap-2 text-muted-foreground">
              <LogOut className="w-4 h-4" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Movies Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Film className="w-6 h-6 text-primary" />
              Filmes em Cartaz
            </h2>
            <Button variant="gold" onClick={() => setIsMovieModalOpen(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Adicionar Filme
            </Button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : movies.length === 0 ? (
            <div className="text-center py-12 glass-strong rounded-xl">
              <p className="text-muted-foreground">Nenhum filme cadastrado ainda.</p>
              <Button
                variant="gold"
                className="mt-4"
                onClick={() => setIsMovieModalOpen(true)}
              >
                <Plus className="w-4 h-4" />
                Adicionar Primeiro Filme
              </Button>
            </div>
          ) : (
            <div className="grid gap-4">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className="glass-strong rounded-xl p-4 flex items-center gap-4"
                >
                  <img
                    src={movie.poster_url}
                    alt={movie.title}
                    className="w-16 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">{movie.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {movie.genre?.join(", ")} • {movie.duration}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {movie.sessions?.length || 0} sessões configuradas
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold ${
                        movie.age_rating === "L"
                          ? "bg-green-600 text-white"
                          : movie.age_rating === "18"
                          ? "bg-black text-white"
                          : "bg-yellow-500 text-black"
                      }`}
                    >
                      {movie.age_rating}
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
                      onClick={() => handleDeleteMovie(movie.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      <MovieFormModal
        isOpen={isMovieModalOpen}
        onClose={handleCloseMovieModal}
        movie={editingMovie}
      />
    </div>
  );
};

export default Admin;
