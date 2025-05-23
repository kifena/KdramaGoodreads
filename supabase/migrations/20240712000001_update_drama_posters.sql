-- Update drama posters for existing entries
-- This migration will update poster URLs for dramas that don't have them

-- Crash Landing on You
UPDATE dramas 
SET poster_url = 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80'
WHERE title = 'Crash Landing on You' AND (poster_url IS NULL OR poster_url = '');

-- Goblin
UPDATE dramas 
SET poster_url = 'https://images.unsplash.com/photo-1611162616305-c69b3037f0e7?w=600&q=80'
WHERE title = 'Goblin' AND (poster_url IS NULL OR poster_url = '');

-- Descendants of the Sun
UPDATE dramas 
SET poster_url = 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=600&q=80'
WHERE title = 'Descendants of the Sun' AND (poster_url IS NULL OR poster_url = '');

-- Itaewon Class
UPDATE dramas 
SET poster_url = 'https://images.unsplash.com/photo-1611162618479-ee4d1e0e3156?w=600&q=80'
WHERE title = 'Itaewon Class' AND (poster_url IS NULL OR poster_url = '');

-- Reply 1988
UPDATE dramas 
SET poster_url = 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=600&q=80'
WHERE title = 'Reply 1988' AND (poster_url IS NULL OR poster_url = '');

-- My Love from the Star
UPDATE dramas 
SET poster_url = 'https://images.unsplash.com/photo-1611162616714-b25b3a10d78f?w=600&q=80'
WHERE title = 'My Love from the Star' AND (poster_url IS NULL OR poster_url = '');

-- Default poster for any remaining dramas without posters
UPDATE dramas
SET poster_url = 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&q=80'
WHERE poster_url IS NULL OR poster_url = '';