-- Add web_scraped column to dramas table
ALTER TABLE dramas ADD COLUMN IF NOT EXISTS web_scraped BOOLEAN DEFAULT false;

-- Enable realtime for dramas table (only if not already added)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND schemaname = 'public' 
    AND tablename = 'dramas'
  ) THEN
    alter publication supabase_realtime add table dramas;
  END IF;
END
$$;