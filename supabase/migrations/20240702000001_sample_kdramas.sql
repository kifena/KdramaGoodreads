-- Insert sample K-drama tags
INSERT INTO drama_tags (name) VALUES
('Romance'),
('Comedy'),
('Thriller'),
('Mystery'),
('Action'),
('Historical'),
('Fantasy'),
('Sci-Fi'),
('Medical'),
('Crime'),
('Melodrama'),
('Slice of Life'),
('Coming of Age'),
('Office'),
('School'),
('Family'),
('Supernatural'),
('Horror'),
('Law'),
('Military')
ON CONFLICT (name) DO NOTHING;

-- Insert sample K-dramas
INSERT INTO dramas (title, year, description, poster_url) VALUES
('Crash Landing on You', 2019, 'A South Korean heiress accidentally paraglides into North Korea and falls in love with a North Korean elite officer.', 'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80'),
('Goblin', 2016, 'A modern fantasy about a 939-year-old goblin who needs a human bride to end his immortal life.', 'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80'),
('Descendants of the Sun', 2016, 'A love story between a special forces captain and a surgeon in a fictional war-torn country.', 'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80'),
('Itaewon Class', 2020, 'An ex-convict opens a bar in Itaewon and works for success and revenge against the family that caused his downfall.', 'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80'),
('Reply 1988', 2015, 'A nostalgic look at the lives of five families living in a small neighborhood in Seoul in 1988.', 'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80'),
('Hospital Playlist', 2020, 'Five doctors who have been friends since medical school work together at the same hospital and play in a band.', 'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80'),
('My Love from the Star', 2013, 'An alien who landed on Earth 400 years ago falls in love with a top actress in modern-day Korea.', 'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80'),
('Signal', 2016, 'Detectives from the present and a detective from the past communicate via a walkie-talkie to solve cold cases.', 'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80'),
('Kingdom', 2019, 'A crown prince investigates a mysterious plague that turns people into zombies in medieval Korea.', 'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80'),
('Mr. Sunshine', 2018, 'A Korean boy born into slavery in the late 1800s returns as a U.S. marine officer to his homeland.', 'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80')
ON CONFLICT (title, year) DO NOTHING;

-- Get tag IDs
DO $$
DECLARE
    romance_id UUID;
    comedy_id UUID;
    thriller_id UUID;
    mystery_id UUID;
    action_id UUID;
    historical_id UUID;
    fantasy_id UUID;
    medical_id UUID;
    crime_id UUID;
    slice_of_life_id UUID;
    family_id UUID;
    supernatural_id UUID;
BEGIN
    SELECT id INTO romance_id FROM drama_tags WHERE name = 'Romance';
    SELECT id INTO comedy_id FROM drama_tags WHERE name = 'Comedy';
    SELECT id INTO thriller_id FROM drama_tags WHERE name = 'Thriller';
    SELECT id INTO mystery_id FROM drama_tags WHERE name = 'Mystery';
    SELECT id INTO action_id FROM drama_tags WHERE name = 'Action';
    SELECT id INTO historical_id FROM drama_tags WHERE name = 'Historical';
    SELECT id INTO fantasy_id FROM drama_tags WHERE name = 'Fantasy';
    SELECT id INTO medical_id FROM drama_tags WHERE name = 'Medical';
    SELECT id INTO crime_id FROM drama_tags WHERE name = 'Crime';
    SELECT id INTO slice_of_life_id FROM drama_tags WHERE name = 'Slice of Life';
    SELECT id INTO family_id FROM drama_tags WHERE name = 'Family';
    SELECT id INTO supernatural_id FROM drama_tags WHERE name = 'Supernatural';

    -- Add tags to dramas
    -- Crash Landing on You
    INSERT INTO drama_tag_relations (drama_id, tag_id)
    SELECT id, romance_id FROM dramas WHERE title = 'Crash Landing on You'
    ON CONFLICT (drama_id, tag_id) DO NOTHING;
    
    INSERT INTO drama_tag_relations (drama_id, tag_id)
    SELECT id, comedy_id FROM dramas WHERE title = 'Crash Landing on You'
    ON CONFLICT (drama_id, tag_id) DO NOTHING;
    
    -- Goblin
    INSERT INTO drama_tag_relations (drama_id, tag_id)
    SELECT id, romance_id FROM dramas WHERE title = 'Goblin'
    ON CONFLICT (drama_id, tag_id) DO NOTHING;
    
    INSERT INTO drama_tag_relations (drama_id, tag_id)
    SELECT id, fantasy_id FROM dramas WHERE title = 'Goblin'
    ON CONFLICT (drama_id, tag_id) DO NOTHING;
    
    INSERT INTO drama_tag_relations (drama_id, tag_id)
    SELECT id, supernatural_id FROM dramas WHERE title = 'Goblin'
    ON CONFLICT (drama_id, tag_id) DO NOTHING;
    
    -- Descendants of the Sun
    INSERT INTO drama_tag_relations (drama_id, tag_id)
    SELECT id, romance_id FROM dramas WHERE title = 'Descendants of the Sun'
    ON CONFLICT (drama_id, tag_id) DO NOTHING;
    
    INSERT INTO drama_tag_relations (drama_id, tag_id)
    SELECT id, action_id FROM dramas WHERE title = 'Descendants of the Sun'
    ON CONFLICT (drama_id, tag_id) DO NOTHING;
    
    -- Itaewon Class
    INSERT INTO drama_tag_relations (drama_id, tag_id)
    SELECT id, romance_id FROM dramas WHERE title = 'Itaewon Class'
    ON CONFLICT (drama_id, tag_id) DO NOTHING;
    
    -- Reply 1988
    INSERT INTO drama_tag_relations (drama_id, tag_id)
    SELECT id, comedy_id FROM dramas WHERE title = 'Reply 1988'
    ON CONFLICT (drama_id, tag_id) DO NOTHING;
    
    INSERT INTO drama_tag_relations (drama_id, tag_id)
    SELECT id, family_id FROM dramas WHERE title = 'Reply 1988'
    ON CONFLICT (drama_id, tag_id) DO NOTHING;
    
    INSERT INTO drama_tag_relations (drama_id, tag_id)
    SELECT id, slice_of_life_id FROM dramas WHERE title = 'Reply 1988'
    ON CONFLICT (drama_id, tag_id) DO NOTHING;
    
    -- Hospital Playlist
    INSERT INTO drama_tag_relations (drama_id, tag_id)
    SELECT id, medical_id FROM dramas WHERE title = 'Hospital Playlist'
    ON CONFLICT (drama_id, tag_id) DO NOTHING;
    
    INSERT INTO drama_tag_relations (drama_id, tag_id)
    SELECT id, comedy_id FROM dramas WHERE title = 'Hospital Playlist'
    ON CONFLICT (drama_id, tag_id) DO NOTHING;
    
    -- My Love from the Star
    INSERT INTO drama_tag_relations (drama_id, tag_id)
    SELECT id, romance_id FROM dramas WHERE title = 'My Love from the Star'
    ON CONFLICT (drama_id, tag_id) DO NOTHING;
    
    INSERT INTO drama_tag_relations (drama_id, tag_id)
    SELECT id, fantasy_id FROM dramas WHERE title = 'My Love from the Star'
    ON CONFLICT (drama_id, tag_id) DO NOTHING;
    
    -- Signal
    INSERT INTO drama_tag_relations (drama_id, tag_id)
    SELECT id, thriller_id FROM dramas WHERE title = 'Signal'
    ON CONFLICT (drama_id, tag_id) DO NOTHING;
    
    INSERT INTO drama_tag_relations (drama_id, tag_id)
    SELECT id, mystery_id FROM dramas WHERE title = 'Signal'
    ON CONFLICT (drama_id, tag_id) DO NOTHING;
    
    INSERT INTO drama_tag_relations (drama_id, tag_id)
    SELECT id, crime_id FROM dramas WHERE title = 'Signal'
    ON CONFLICT (drama_id, tag_id) DO NOTHING;
    
    -- Kingdom
    INSERT INTO drama_tag_relations (drama_id, tag_id)
    SELECT id, thriller_id FROM dramas WHERE title = 'Kingdom'
    ON CONFLICT (drama_id, tag_id) DO NOTHING;
    
    INSERT INTO drama_tag_relations (drama_id, tag_id)
    SELECT id, historical_id FROM dramas WHERE title = 'Kingdom'
    ON CONFLICT (drama_id, tag_id) DO NOTHING;
    
    -- Mr. Sunshine
    INSERT INTO drama_tag_relations (drama_id, tag_id)
    SELECT id, historical_id FROM dramas WHERE title = 'Mr. Sunshine'
    ON CONFLICT (drama_id, tag_id) DO NOTHING;
    
    INSERT INTO drama_tag_relations (drama_id, tag_id)
    SELECT id, romance_id FROM dramas WHERE title = 'Mr. Sunshine'
    ON CONFLICT (drama_id, tag_id) DO NOTHING;
END $$;

-- Enable realtime for the tables
alter publication supabase_realtime add table dramas;
alter publication supabase_realtime add table drama_tags;
alter publication supabase_realtime add table drama_tag_relations;
