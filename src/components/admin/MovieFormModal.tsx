import { useState, useEffect } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCinema } from "@/contexts/CinemaContext";
import { Movie, Session } from "@/data/movies";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MovieFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  movie?: Movie | null;
}

const emptySession: Session = { time: "", days: [], type: "DUB", tech: "2D" };

const MovieFormModal = ({ isOpen, onClose, movie }: MovieFormModalProps) => {
  const { addMovie, updateMovie } = useCinema();
  const [formData, setFormData] = useState({
    title: "",
    poster: "",
    heroImage: "",
    ageRating: "12" as Movie["ageRating"],
    genre: "",
    duration: "",
    synopsis: "",
    director: "",
    cast: "",
    trailerUrl: "",
  });
  const [sessions, setSessions] = useState<Session[]>([{ ...emptySession }]);

  useEffect(() => {
    if (movie) {
      setFormData({
        title: movie.title,
        poster: movie.poster,
        heroImage: movie.heroImage || "",
        ageRating: movie.ageRating,
        genre: movie.genre.join(", "),
        duration: movie.duration,
        synopsis: movie.synopsis,
        director: movie.director,
        cast: movie.cast.join(", "),
        trailerUrl: movie.trailerUrl || "",
      });
      setSessions(movie.sessions.length ? movie.sessions : [{ ...emptySession }]);
    } else {
      setFormData({
        title: "",
        poster: "",
        heroImage: "",
        ageRating: "12",
        genre: "",
        duration: "",
        synopsis: "",
        director: "",
        cast: "",
        trailerUrl: "",
      });
      setSessions([{ ...emptySession }]);
    }
  }, [movie, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const movieData = {
      title: formData.title,
      poster: formData.poster || "/placeholder.svg",
      heroImage: formData.heroImage || undefined,
      ageRating: formData.ageRating,
      genre: formData.genre.split(",").map((g) => g.trim()).filter(Boolean),
      duration: formData.duration,
      synopsis: formData.synopsis,
      director: formData.director,
      cast: formData.cast.split(",").map((c) => c.trim()).filter(Boolean),
      trailerUrl: formData.trailerUrl || undefined,
      sessions: sessions.filter((s) => s.time),
    };

    if (movie) {
      updateMovie(movie.id, movieData);
    } else {
      addMovie(movieData);
    }
    onClose();
  };

  const addSession = () => {
    setSessions([...sessions, { ...emptySession }]);
  };

  const removeSession = (index: number) => {
    setSessions(sessions.filter((_, i) => i !== index));
  };

  const updateSession = (index: number, field: keyof Session, value: string) => {
    const updated = [...sessions];
    updated[index] = { ...updated[index], [field]: value };
    setSessions(updated);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-strong rounded-2xl p-6 m-4 scrollbar-cinema">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">
            {movie ? "Editar Filme" : "Novo Filme"}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Título *</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Nome do filme"
              required
              className="bg-background/50"
            />
          </div>

          {/* Poster URL */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">URL do Pôster</label>
            <Input
              value={formData.poster}
              onChange={(e) => setFormData({ ...formData, poster: e.target.value })}
              placeholder="https://exemplo.com/poster.jpg"
              className="bg-background/50"
            />
          </div>

          {/* Hero Image URL */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              URL da Imagem Hero (destaque)
            </label>
            <Input
              value={formData.heroImage}
              onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
              placeholder="https://exemplo.com/hero.jpg"
              className="bg-background/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Age Rating */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Classificação *</label>
              <Select
                value={formData.ageRating}
                onValueChange={(value) =>
                  setFormData({ ...formData, ageRating: value as Movie["ageRating"] })
                }
              >
                <SelectTrigger className="bg-background/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="L">Livre</SelectItem>
                  <SelectItem value="10">10 anos</SelectItem>
                  <SelectItem value="12">12 anos</SelectItem>
                  <SelectItem value="14">14 anos</SelectItem>
                  <SelectItem value="16">16 anos</SelectItem>
                  <SelectItem value="18">18 anos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Duração *</label>
              <Input
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="2h 15min"
                required
                className="bg-background/50"
              />
            </div>
          </div>

          {/* Genre */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Gêneros *</label>
            <Input
              value={formData.genre}
              onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
              placeholder="Ação, Aventura, Ficção Científica"
              required
              className="bg-background/50"
            />
            <p className="text-xs text-muted-foreground">Separe os gêneros por vírgula</p>
          </div>

          {/* Synopsis */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Sinopse *</label>
            <Textarea
              value={formData.synopsis}
              onChange={(e) => setFormData({ ...formData, synopsis: e.target.value })}
              placeholder="Descrição do filme..."
              required
              className="bg-background/50 min-h-[100px]"
            />
          </div>

          {/* Director */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Diretor *</label>
            <Input
              value={formData.director}
              onChange={(e) => setFormData({ ...formData, director: e.target.value })}
              placeholder="Nome do diretor"
              required
              className="bg-background/50"
            />
          </div>

          {/* Cast */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Elenco</label>
            <Input
              value={formData.cast}
              onChange={(e) => setFormData({ ...formData, cast: e.target.value })}
              placeholder="Ator 1, Ator 2, Ator 3"
              className="bg-background/50"
            />
            <p className="text-xs text-muted-foreground">Separe os nomes por vírgula</p>
          </div>

          {/* Trailer URL */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">URL do Trailer</label>
            <Input
              value={formData.trailerUrl}
              onChange={(e) => setFormData({ ...formData, trailerUrl: e.target.value })}
              placeholder="https://youtube.com/watch?v=..."
              className="bg-background/50"
            />
          </div>

          {/* Sessions */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Sessões</label>
              <Button type="button" variant="outline" size="sm" onClick={addSession}>
                <Plus className="w-4 h-4 mr-1" />
                Adicionar
              </Button>
            </div>

            {sessions.map((session, index) => (
              <div key={index} className="flex flex-col gap-2 p-3 bg-background/30 rounded-lg">
                <div className="flex gap-2 items-center">
                  <Input
                    value={session.time}
                    onChange={(e) => updateSession(index, "time", e.target.value)}
                    placeholder="14:30"
                    className="bg-background/50 w-24"
                  />
                  <Select
                    value={session.type}
                    onValueChange={(value) => updateSession(index, "type", value)}
                  >
                    <SelectTrigger className="bg-background/50 w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DUB">DUB</SelectItem>
                      <SelectItem value="LEG">LEG</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={session.tech}
                    onValueChange={(value) => updateSession(index, "tech", value)}
                  >
                    <SelectTrigger className="bg-background/50 w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2D">2D</SelectItem>
                      <SelectItem value="3D">3D</SelectItem>
                    </SelectContent>
                  </Select>
                  {sessions.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSession(index)}
                      className="text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground">Dias da semana</label>
                  <Input
                    value={session.days?.join(", ") || ""}
                    onChange={(e) => {
                      const updated = [...sessions];
                      updated[index] = { 
                        ...updated[index], 
                        days: e.target.value.split(",").map((d) => d.trim()).filter(Boolean) 
                      };
                      setSessions(updated);
                    }}
                    placeholder="Qui, Sex, Sáb, Dom"
                    className="bg-background/50"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" variant="gold" className="flex-1">
              {movie ? "Salvar Alterações" : "Adicionar Filme"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieFormModal;
