import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";

export interface MovieSession {
  id: string;
  movie_id: string;
  time: string;
  days: string[];
  type: "DUB" | "LEG";
  tech: "2D" | "3D";
  highlight: boolean;
}

export interface Movie {
  id: string;
  title: string;
  poster_url: string;
  trailer_url: string | null;
  age_rating: string;
  genre: string[];
  duration: string | null;
  synopsis: string | null;
  director: string | null;
  cast_members: string[];
  is_coming_soon: boolean;
  created_at: string;
  updated_at: string;
  sessions?: MovieSession[];
}

export const useMovies = () => {
  const queryClient = useQueryClient();

  // Fetch movies with sessions
  const { data: movies = [], isLoading, error } = useQuery({
    queryKey: ["movies"],
    queryFn: async () => {
      const { data: moviesData, error: moviesError } = await supabase
        .from("movies")
        .select("*")
        .order("created_at", { ascending: false });

      if (moviesError) throw moviesError;

      const { data: sessionsData, error: sessionsError } = await supabase
        .from("movie_sessions")
        .select("*");

      if (sessionsError) throw sessionsError;

      // Combine movies with their sessions
      return moviesData.map((movie) => ({
        ...movie,
        sessions: sessionsData.filter((s) => s.movie_id === movie.id),
      })) as Movie[];
    },
  });

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel("movies-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "movies" },
        () => {
          queryClient.invalidateQueries({ queryKey: ["movies"] });
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "movie_sessions" },
        () => {
          queryClient.invalidateQueries({ queryKey: ["movies"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  // Add movie
  const addMovie = useMutation({
    mutationFn: async (movieData: {
      title: string;
      poster_url: string;
      trailer_url?: string;
      age_rating: string;
      genre: string[];
      duration?: string;
      synopsis?: string;
      director?: string;
      cast_members: string[];
      is_coming_soon?: boolean;
      sessions: Omit<MovieSession, "id" | "movie_id">[];
    }) => {
      const { sessions, ...movie } = movieData;

      const { data: newMovie, error: movieError } = await supabase
        .from("movies")
        .insert(movie)
        .select()
        .single();

      if (movieError) throw movieError;

      if (sessions.length > 0) {
        const { error: sessionsError } = await supabase
          .from("movie_sessions")
          .insert(sessions.map((s) => ({ ...s, movie_id: newMovie.id })));

        if (sessionsError) throw sessionsError;
      }

      return newMovie;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
  });

  // Update movie
  const updateMovie = useMutation({
    mutationFn: async ({
      id,
      ...movieData
    }: {
      id: string;
      title: string;
      poster_url: string;
      trailer_url?: string;
      age_rating: string;
      genre: string[];
      duration?: string;
      synopsis?: string;
      director?: string;
      cast_members: string[];
      is_coming_soon?: boolean;
      sessions: Omit<MovieSession, "id" | "movie_id">[];
    }) => {
      const { sessions, ...movie } = movieData;

      const { error: movieError } = await supabase
        .from("movies")
        .update(movie)
        .eq("id", id);

      if (movieError) throw movieError;

      // Delete old sessions and insert new ones
      await supabase.from("movie_sessions").delete().eq("movie_id", id);

      if (sessions.length > 0) {
        const { error: sessionsError } = await supabase
          .from("movie_sessions")
          .insert(sessions.map((s) => ({ ...s, movie_id: id })));

        if (sessionsError) throw sessionsError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
  });

  // Delete movie
  const deleteMovie = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("movies").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
  });

  return {
    movies,
    isLoading,
    error,
    addMovie,
    updateMovie,
    deleteMovie,
  };
};
