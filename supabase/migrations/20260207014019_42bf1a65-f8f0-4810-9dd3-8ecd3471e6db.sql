-- Add is_coming_soon column to movies table
ALTER TABLE public.movies ADD COLUMN is_coming_soon boolean NOT NULL DEFAULT false;