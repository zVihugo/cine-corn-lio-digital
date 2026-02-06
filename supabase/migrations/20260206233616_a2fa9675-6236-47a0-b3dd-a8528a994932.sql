-- Atualizar políticas RLS para movies - apenas usuários autenticados podem modificar
DROP POLICY IF EXISTS "Anyone can delete movies" ON public.movies;
DROP POLICY IF EXISTS "Anyone can insert movies" ON public.movies;
DROP POLICY IF EXISTS "Anyone can update movies" ON public.movies;
DROP POLICY IF EXISTS "Anyone can view movies" ON public.movies;

-- Manter leitura pública, mas restringir escrita a usuários autenticados
CREATE POLICY "Anyone can view movies" 
ON public.movies 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can insert movies" 
ON public.movies 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update movies" 
ON public.movies 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete movies" 
ON public.movies 
FOR DELETE 
USING (auth.uid() IS NOT NULL);

-- Atualizar políticas RLS para movie_sessions
DROP POLICY IF EXISTS "Anyone can delete sessions" ON public.movie_sessions;
DROP POLICY IF EXISTS "Anyone can insert sessions" ON public.movie_sessions;
DROP POLICY IF EXISTS "Anyone can update sessions" ON public.movie_sessions;
DROP POLICY IF EXISTS "Anyone can view sessions" ON public.movie_sessions;

-- Manter leitura pública, mas restringir escrita a usuários autenticados
CREATE POLICY "Anyone can view sessions" 
ON public.movie_sessions 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can insert sessions" 
ON public.movie_sessions 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update sessions" 
ON public.movie_sessions 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete sessions" 
ON public.movie_sessions 
FOR DELETE 
USING (auth.uid() IS NOT NULL);