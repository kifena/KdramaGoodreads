-- Fix the web_scraped flag for all dramas to ensure posters display correctly
UPDATE dramas SET web_scraped = false;

-- Note: The dramas table is already part of the supabase_realtime publication
-- No need to add it again
