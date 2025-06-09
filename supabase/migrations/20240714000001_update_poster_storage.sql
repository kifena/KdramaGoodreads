-- Add a new column for local poster paths
ALTER TABLE dramas ADD COLUMN IF NOT EXISTS local_poster_path TEXT;

-- Update existing dramas to have a default local path based on their ID
UPDATE dramas SET local_poster_path = CONCAT('/posters/', id, '.jpg') WHERE local_poster_path IS NULL;
