import React, { createContext, useContext, useState, ReactNode } from "react";
import { Movie, Session, featuredMovies as initialFeatured, movies as initialMovies } from "@/data/movies";
import { SnackItem, snacks as initialSnacks } from "@/data/snacks";

interface CinemaContextType {
  movies: Movie[];
  featuredMovies: Movie[];
  snacks: SnackItem[];
  addMovie: (movie: Omit<Movie, "id">) => void;
  updateMovie: (id: string, movie: Partial<Movie>) => void;
  deleteMovie: (id: string) => void;
  addSnack: (snack: Omit<SnackItem, "id">) => void;
  updateSnack: (id: string, snack: Partial<SnackItem>) => void;
  deleteSnack: (id: string) => void;
  getMovieById: (id: string) => Movie | undefined;
  getMoviesByDay: (dayOffset: number) => Movie[];
}

const CinemaContext = createContext<CinemaContextType | undefined>(undefined);

export const CinemaProvider = ({ children }: { children: ReactNode }) => {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [featuredMovies, setFeaturedMovies] = useState<Movie[]>(initialFeatured);
  const [snacks, setSnacks] = useState<SnackItem[]>(initialSnacks);

  const generateId = () => Math.random().toString(36).substring(2, 9);

  const addMovie = (movie: Omit<Movie, "id">) => {
    const newMovie: Movie = { ...movie, id: generateId() };
    setMovies((prev) => [...prev, newMovie]);
    if (movie.heroImage) {
      setFeaturedMovies((prev) => [...prev, newMovie]);
    }
  };

  const updateMovie = (id: string, updates: Partial<Movie>) => {
    setMovies((prev) =>
      prev.map((movie) => (movie.id === id ? { ...movie, ...updates } : movie))
    );
    setFeaturedMovies((prev) =>
      prev.map((movie) => (movie.id === id ? { ...movie, ...updates } : movie))
    );
  };

  const deleteMovie = (id: string) => {
    setMovies((prev) => prev.filter((movie) => movie.id !== id));
    setFeaturedMovies((prev) => prev.filter((movie) => movie.id !== id));
  };

  const addSnack = (snack: Omit<SnackItem, "id">) => {
    const newSnack: SnackItem = { ...snack, id: generateId() };
    setSnacks((prev) => [...prev, newSnack]);
  };

  const updateSnack = (id: string, updates: Partial<SnackItem>) => {
    setSnacks((prev) =>
      prev.map((snack) => (snack.id === id ? { ...snack, ...updates } : snack))
    );
  };

  const deleteSnack = (id: string) => {
    setSnacks((prev) => prev.filter((snack) => snack.id !== id));
  };

  const getMovieById = (id: string) => movies.find((m) => m.id === id);

  const getMoviesByDay = (dayOffset: number): Movie[] => {
    if (dayOffset === 0) return movies;
    if (dayOffset === 1) return movies.slice(1, 7);
    return movies.slice(2);
  };

  return (
    <CinemaContext.Provider
      value={{
        movies,
        featuredMovies,
        snacks,
        addMovie,
        updateMovie,
        deleteMovie,
        addSnack,
        updateSnack,
        deleteSnack,
        getMovieById,
        getMoviesByDay,
      }}
    >
      {children}
    </CinemaContext.Provider>
  );
};

export const useCinema = () => {
  const context = useContext(CinemaContext);
  if (!context) {
    throw new Error("useCinema must be used within a CinemaProvider");
  }
  return context;
};
