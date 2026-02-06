-- Create movies table for storing film data
CREATE TABLE public.movies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  poster_url TEXT NOT NULL,
  trailer_url TEXT,
  age_rating TEXT NOT NULL DEFAULT '12',
  genre TEXT[] DEFAULT '{}',
  duration TEXT,
  synopsis TEXT,
  director TEXT,
  cast_members TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create sessions table for movie showtimes
CREATE TABLE public.movie_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  movie_id UUID REFERENCES public.movies(id) ON DELETE CASCADE NOT NULL,
  time TEXT NOT NULL,
  days TEXT[] NOT NULL DEFAULT '{}',
  type TEXT NOT NULL DEFAULT 'DUB',
  tech TEXT NOT NULL DEFAULT '2D',
  highlight BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.movies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.movie_sessions ENABLE ROW LEVEL SECURITY;

-- Public read access for movies (everyone can view)
CREATE POLICY "Anyone can view movies" 
ON public.movies 
FOR SELECT 
USING (true);

-- Public read access for sessions
CREATE POLICY "Anyone can view sessions" 
ON public.movie_sessions 
FOR SELECT 
USING (true);

-- For now, allow public insert/update/delete (later we can add admin auth)
CREATE POLICY "Anyone can insert movies" 
ON public.movies 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update movies" 
ON public.movies 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete movies" 
ON public.movies 
FOR DELETE 
USING (true);

CREATE POLICY "Anyone can insert sessions" 
ON public.movie_sessions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update sessions" 
ON public.movie_sessions 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete sessions" 
ON public.movie_sessions 
FOR DELETE 
USING (true);

-- Enable realtime for movies table
ALTER PUBLICATION supabase_realtime ADD TABLE public.movies;
ALTER PUBLICATION supabase_realtime ADD TABLE public.movie_sessions;

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_movies_updated_at
BEFORE UPDATE ON public.movies
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();