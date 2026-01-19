import heroMovie1 from "@/assets/hero-movie-1.jpg";
import heroMovie2 from "@/assets/hero-movie-2.jpg";
import heroMovie3 from "@/assets/hero-movie-3.jpg";
import moviePoster1 from "@/assets/movie-poster-1.jpg";
import moviePoster2 from "@/assets/movie-poster-2.jpg";
import moviePoster3 from "@/assets/movie-poster-3.jpg";
import moviePoster4 from "@/assets/movie-poster-4.jpg";
import moviePoster5 from "@/assets/movie-poster-5.jpg";
import moviePoster6 from "@/assets/movie-poster-6.jpg";

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
  type: "DUB" | "LEG";
  tech: "2D" | "3D";
}

export const featuredMovies: Movie[] = [
  {
    id: "1",
    title: "Horizonte Infinito",
    poster: moviePoster4,
    heroImage: heroMovie1,
    ageRating: "12",
    genre: ["Ficção Científica", "Aventura"],
    duration: "2h 28min",
    synopsis: "Em 2157, o astronauta Marcus Cole embarca em uma missão para encontrar um novo lar para a humanidade. Uma jornada épica além das estrelas que desafiará os limites do possível e redefinirá o significado de esperança.",
    director: "Ana Rodrigues",
    cast: ["Pedro Almeida", "Carla Santos", "João Victor"],
    sessions: [
      { time: "14:30", type: "DUB", tech: "3D" },
      { time: "17:00", type: "LEG", tech: "3D" },
      { time: "19:30", type: "DUB", tech: "2D" },
      { time: "22:00", type: "LEG", tech: "3D" },
    ],
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "2",
    title: "Amor em Paris",
    poster: moviePoster5,
    heroImage: heroMovie2,
    ageRating: "12",
    genre: ["Romance", "Drama"],
    duration: "1h 54min",
    synopsis: "Marina e Lucas se encontram por acaso nas ruas de Paris. O que começa como um acidente se transforma em uma história de amor que transcende o tempo e a distância. Uma celebração do amor em sua forma mais pura.",
    director: "Fernanda Costa",
    cast: ["Maria Silva", "Bruno Martins", "Lúcia Ferreira"],
    sessions: [
      { time: "15:00", type: "DUB", tech: "2D" },
      { time: "17:30", type: "LEG", tech: "2D" },
      { time: "20:00", type: "DUB", tech: "2D" },
    ],
  },
  {
    id: "3",
    title: "Sombras da Noite",
    poster: moviePoster2,
    heroImage: heroMovie3,
    ageRating: "16",
    genre: ["Suspense", "Ação"],
    duration: "2h 05min",
    synopsis: "Detetive Maia enfrenta seu caso mais perigoso quando uma série de crimes conecta figuras poderosas da cidade. Em uma teia de corrupção e mentiras, ela precisa descobrir a verdade antes que seja tarde demais.",
    director: "Ricardo Neves",
    cast: ["Paula Oliveira", "Thiago Mendes", "Cláudio Ribeiro"],
    sessions: [
      { time: "16:00", type: "LEG", tech: "2D" },
      { time: "19:00", type: "DUB", tech: "2D" },
      { time: "21:30", type: "LEG", tech: "2D" },
    ],
  },
];

export const movies: Movie[] = [
  ...featuredMovies,
  {
    id: "4",
    title: "A Grande Aventura",
    poster: moviePoster1,
    ageRating: "L",
    genre: ["Animação", "Aventura", "Família"],
    duration: "1h 42min",
    synopsis: "Um grupo improvável de amigos animais embarca em uma jornada épica pela selva para encontrar um tesouro lendário. Diversão garantida para toda a família!",
    director: "Marcos Lima",
    cast: ["Vozes: Débora Luz", "Carlos Drummond", "Ana Paula"],
    sessions: [
      { time: "13:00", type: "DUB", tech: "2D" },
      { time: "15:30", type: "DUB", tech: "3D" },
      { time: "17:45", type: "DUB", tech: "2D" },
    ],
  },
  {
    id: "5",
    title: "O Casarão",
    poster: moviePoster2,
    ageRating: "16",
    genre: ["Terror", "Suspense"],
    duration: "1h 58min",
    synopsis: "Uma família se muda para uma antiga mansão no interior do Paraná, sem saber dos terríveis segredos que suas paredes escondem. O terror se instala quando o passado vem cobrar seu preço.",
    director: "Julia Mendonça",
    cast: ["Fernanda Torres", "Lázaro Ramos", "Dira Paes"],
    sessions: [
      { time: "21:00", type: "DUB", tech: "2D" },
      { time: "23:30", type: "LEG", tech: "2D" },
    ],
  },
  {
    id: "6",
    title: "Confusões em Família",
    poster: moviePoster3,
    ageRating: "12",
    genre: ["Comédia"],
    duration: "1h 36min",
    synopsis: "O patriarca da família Souza decide reunir todos para o Natal, mas não imaginava que suas três filhas trariam surpresas que virariam a festa de cabeça para baixo. Risadas garantidas!",
    director: "Eduardo Gonzaga",
    cast: ["Leandro Hassum", "Paulo Gustavo", "Tatá Werneck"],
    sessions: [
      { time: "14:00", type: "DUB", tech: "2D" },
      { time: "16:30", type: "DUB", tech: "2D" },
      { time: "19:00", type: "DUB", tech: "2D" },
      { time: "21:15", type: "DUB", tech: "2D" },
    ],
  },
  {
    id: "7",
    title: "Velocidade Máxima",
    poster: moviePoster4,
    ageRating: "14",
    genre: ["Ação", "Aventura"],
    duration: "2h 12min",
    synopsis: "Piloto aposentado é chamado de volta para uma última missão impossível. Com carros velozes e explosões épicas, ele precisa salvar sua família de um cartel internacional.",
    director: "Roberto Santucci",
    cast: ["Rodrigo Santoro", "Paolla Oliveira", "Bruno Gagliasso"],
    sessions: [
      { time: "15:00", type: "DUB", tech: "3D" },
      { time: "18:00", type: "LEG", tech: "3D" },
      { time: "20:30", type: "DUB", tech: "3D" },
      { time: "23:00", type: "LEG", tech: "2D" },
    ],
  },
  {
    id: "8",
    title: "Entre Silêncios",
    poster: moviePoster5,
    ageRating: "14",
    genre: ["Drama"],
    duration: "2h 01min",
    synopsis: "A história de uma pianista que perde a audição e precisa redescobrir sua conexão com a música e consigo mesma. Um filme sensível sobre superação e resiliência.",
    director: "Cláudia Abreu",
    cast: ["Sônia Braga", "Caio Blat", "Débora Falabella"],
    sessions: [
      { time: "16:00", type: "LEG", tech: "2D" },
      { time: "18:30", type: "DUB", tech: "2D" },
    ],
  },
  {
    id: "9",
    title: "O Guardião",
    poster: moviePoster6,
    ageRating: "12",
    genre: ["Ação", "Ficção Científica"],
    duration: "2h 20min",
    synopsis: "Quando uma ameaça alienígena surge, um jovem comum descobre ter poderes extraordinários. Agora ele é a única esperança da Terra contra a destruição total.",
    director: "Pedro Moreira",
    cast: ["Chay Suede", "Juliana Paes", "Cauã Reymond"],
    sessions: [
      { time: "14:30", type: "DUB", tech: "3D" },
      { time: "17:15", type: "LEG", tech: "3D" },
      { time: "20:00", type: "DUB", tech: "3D" },
      { time: "22:30", type: "DUB", tech: "2D" },
    ],
  },
];

export const genres = [
  "Todos",
  "Ação",
  "Aventura",
  "Animação",
  "Comédia",
  "Drama",
  "Família",
  "Ficção Científica",
  "Romance",
  "Suspense",
  "Terror",
];

export const getMoviesByDay = (dayOffset: number): Movie[] => {
  // Simulate different movies for different days
  if (dayOffset === 0) return movies;
  if (dayOffset === 1) return movies.slice(1, 7);
  return movies.slice(2);
};

export const getMovieById = (id: string): Movie | undefined => {
  return movies.find((m) => m.id === id);
};
