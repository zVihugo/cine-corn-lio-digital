import posterZootopia from "@/assets/poster-zootopia2.jpg";
import posterAvatar from "@/assets/poster-avatar.jpg";
import posterEmpregada from "@/assets/poster-empregada.jpg";
import posterDavi from "@/assets/poster-davi.jpg";

export interface Movie {
  id: string;
  title: string;
  poster: string;
  heroImage?: string;
  ageRating: "L" | "10" | "12" | "14" | "16" | "18";
  genre: string[];
  duration: string;
  synopsis: string;
  director: string;
  cast: string[];
  sessions: Session[];
  trailerUrl?: string;
}

export interface Session {
  time: string;
  days: string[];
  type: "DUB" | "LEG";
  tech: "2D" | "3D";
  highlight?: boolean;
}

export const featuredMovies: Movie[] = [
  {
    id: "1",
    title: "Zootopia 2",
    poster: posterZootopia,
    heroImage: posterZootopia,
    ageRating: "L",
    genre: ["Animação", "Aventura", "Comédia"],
    duration: "1h 50min",
    synopsis: "Judy Hopps e Nick Wilde retornam em uma nova aventura pela metrópole de Zootopia, onde precisam desvendar um mistério que ameaça a harmonia entre os animais da cidade.",
    director: "Byron Howard, Rich Moore",
    cast: ["Ginnifer Goodwin", "Jason Bateman", "Idris Elba"],
    sessions: [
      { time: "15:10", days: ["Qui", "Sex", "Sáb", "Dom", "Seg", "Ter", "Qua"], type: "DUB", tech: "2D" },
      { time: "17:20", days: ["Qui", "Sex", "Sáb", "Dom", "Seg", "Ter", "Qua"], type: "DUB", tech: "2D" },
    ],
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "2",
    title: "Avatar: Fogo e Cinzas",
    poster: posterAvatar,
    heroImage: posterAvatar,
    ageRating: "12",
    genre: ["Ficção Científica", "Aventura", "Ação"],
    duration: "3h 10min",
    synopsis: "Jake Sully e Neytiri enfrentam uma nova ameaça quando um clã do fogo emerge das profundezas de Pandora, trazendo destruição e revelando segredos ancestrais do planeta.",
    director: "James Cameron",
    cast: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"],
    sessions: [
      { time: "19:30", days: ["Qui", "Sáb", "Ter"], type: "LEG", tech: "3D", highlight: true },
      { time: "22:00", days: ["Sex", "Dom", "Qua"], type: "LEG", tech: "3D" },
    ],
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
];

export const movies: Movie[] = [
  ...featuredMovies,
  {
    id: "3",
    title: "A Empregada (The Housemaid)",
    poster: posterEmpregada,
    ageRating: "16",
    genre: ["Terror", "Suspense", "Drama"],
    duration: "1h 54min",
    synopsis: "Uma jovem empregada aceita trabalhar em uma mansão isolada, mas logo descobre que os segredos sombrios da família podem custar sua vida.",
    director: "Im Sang-soo",
    cast: ["Sydney Sweeney", "Amanda Seyfried", "Michelle Dockery"],
    sessions: [
      { time: "19:30", days: ["Sex", "Qua", "Dom"], type: "LEG", tech: "2D", highlight: true },
    ],
  },
  {
    id: "4",
    title: "Davi",
    poster: posterDavi,
    ageRating: "12",
    genre: ["Drama", "Biografia"],
    duration: "1h 38min",
    synopsis: "A história inspiradora de um jovem brasileiro que supera adversidades e descobre seu propósito de vida através da música e da fé.",
    director: "Alexandre Avancini",
    cast: ["Elenco Nacional"],
    sessions: [
      { time: "13:00", days: ["Qui", "Sex", "Sáb", "Dom", "Seg", "Ter", "Qua"], type: "DUB", tech: "2D" },
    ],
  },
];

export const genres = [
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

export const getMoviesByDay = (dayOffset: number): Movie[] => {
  return movies;
};

export const getMovieById = (id: string): Movie | undefined => {
  return movies.find((m) => m.id === id);
};
