-- Make sure web_scraped column exists before inserting data
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'dramas' 
    AND column_name = 'web_scraped'
  ) THEN
    ALTER TABLE dramas ADD COLUMN IF NOT EXISTS web_scraped BOOLEAN DEFAULT false;
  END IF;
END
$$;

-- Insert popular K-dramas with web_scraped flag set to true

-- Crash Landing on You
INSERT INTO dramas (title, year, description, poster_url, web_scraped)
VALUES (
  'Crash Landing on You',
  2019,
  'A South Korean heiress accidentally paraglides into North Korea and falls in love with a North Korean army officer who decides to help her hide.',
  'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80',
  true
);

-- Goblin (Guardian: The Lonely and Great God)
INSERT INTO dramas (title, year, description, poster_url, web_scraped)
VALUES (
  'Goblin',
  2016,
  'A modern fantasy about a 939-year-old goblin who needs a human bride to end his immortal life. His life changes when he meets a high school girl with a tragic past.',
  'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80',
  true
);

-- Descendants of the Sun
INSERT INTO dramas (title, year, description, poster_url, web_scraped)
VALUES (
  'Descendants of the Sun',
  2016,
  'A love story between a special forces captain and a doctor in a fictional war-torn country. Despite their different beliefs and careers, they fall in love while providing aid in disaster-struck areas.',
  'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80',
  true
);

-- It's Okay to Not Be Okay
INSERT INTO dramas (title, year, description, poster_url, web_scraped)
VALUES (
  'It''s Okay to Not Be Okay',
  2020,
  'An unusual romance between a children''s book author with antisocial personality disorder and a psychiatric ward caretaker who has devoted his life to caring for his autistic older brother.',
  'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80',
  true
);

-- Reply 1988
INSERT INTO dramas (title, year, description, poster_url, web_scraped)
VALUES (
  'Reply 1988',
  2015,
  'A nostalgic look at the lives of five families living in a neighborhood in Seoul in 1988. The drama explores the relationships, friendships, and coming-of-age experiences of the characters.',
  'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80',
  true
);

-- My Love from the Star
INSERT INTO dramas (title, year, description, poster_url, web_scraped)
VALUES (
  'My Love from the Star',
  2013,
  'An alien who landed on Earth 400 years ago and has built a perfect life for himself as a university professor falls in love with a top actress known for her difficult personality.',
  'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80',
  true
);

-- Hospital Playlist
INSERT INTO dramas (title, year, description, poster_url, web_scraped)
VALUES (
  'Hospital Playlist',
  2020,
  'Five doctors who have been friends since medical school work at the same hospital and navigate their professional and personal lives while playing in a band together.',
  'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80',
  true
);

-- The King: Eternal Monarch
INSERT INTO dramas (title, year, description, poster_url, web_scraped)
VALUES (
  'The King: Eternal Monarch',
  2020,
  'A modern-day Korean emperor passes through a mysterious portal and into a parallel world where he encounters a detective. Together, they work to protect both their worlds from danger.',
  'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80',
  true
);

-- Itaewon Class
INSERT INTO dramas (title, year, description, poster_url, web_scraped)
VALUES (
  'Itaewon Class',
  2020,
  'An ex-convict opens a bar in Itaewon to fulfill his father''s dream and seek revenge against the powerful family that destroyed his life.',
  'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80',
  true
);

-- Sky Castle
INSERT INTO dramas (title, year, description, poster_url, web_scraped)
VALUES (
  'Sky Castle',
  2018,
  'A satirical drama about wealthy families living in a prestigious residential area who are willing to do anything to get their children into top universities.',
  'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80',
  true
);

-- Signal
INSERT INTO dramas (title, year, description, poster_url, web_scraped)
VALUES (
  'Signal',
  2016,
  'A criminal profiler in 2015 discovers a walkie-talkie that allows him to communicate with a detective from 1989. Together, they solve cold cases and prevent crimes across time.',
  'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80',
  true
);

-- Mr. Sunshine
INSERT INTO dramas (title, year, description, poster_url, web_scraped)
VALUES (
  'Mr. Sunshine',
  2018,
  'Set in the early 1900s during the Japanese occupation of Korea, a Korean-born U.S. Marine officer returns to his homeland and falls in love with an aristocrat''s daughter.',
  'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80',
  true
);

-- Hotel Del Luna
INSERT INTO dramas (title, year, description, poster_url, web_scraped)
VALUES (
  'Hotel Del Luna',
  2019,
  'A hotel catering exclusively to ghosts is run by a beautiful but ill-tempered CEO who has been cursed to manage the establishment for the past millennium as punishment for her sins.',
  'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80',
  true
);

-- Kingdom
INSERT INTO dramas (title, year, description, poster_url, web_scraped)
VALUES (
  'Kingdom',
  2019,
  'Set during Korea''s Joseon period, a crown prince investigates a mysterious plague that resurrects the dead. He must fight to save his people while uncovering political conspiracy.',
  'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80',
  true
);

-- When the Camellia Blooms
INSERT INTO dramas (title, year, description, poster_url, web_scraped)
VALUES (
  'When the Camellia Blooms',
  2019,
  'A single mother opens a bar named Camellia in a small town and faces both social stigma and the attention of a passionate local policeman, all while a serial killer targets the town.',
  'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80',
  true
);

-- Vincenzo
INSERT INTO dramas (title, year, description, poster_url, web_scraped)
VALUES (
  'Vincenzo',
  2021,
  'A Korean-Italian mafia lawyer returns to Korea and uses his skills to fight against corrupt corporations, forming unlikely alliances along the way.',
  'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80',
  true
);

-- True Beauty
INSERT INTO dramas (title, year, description, poster_url, web_scraped)
VALUES (
  'True Beauty',
  2020,
  'A high school girl who is bullied for her appearance becomes a renowned beauty after learning makeup techniques online, but struggles to keep her bare face hidden.',
  'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80',
  true
);

-- Extraordinary You
INSERT INTO dramas (title, year, description, poster_url, web_scraped)
VALUES (
  'Extraordinary You',
  2019,
  'A high school student discovers she''s a character in a comic book and attempts to change her predetermined fate by altering the story''s plot.',
  'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80',
  true
);

-- Strong Woman Do Bong Soon
INSERT INTO dramas (title, year, description, poster_url, web_scraped)
VALUES (
  'Strong Woman Do Bong Soon',
  2017,
  'A woman born with superhuman strength is hired as a bodyguard for a gaming company CEO, leading to romance and crime-fighting adventures.',
  'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80',
  true
);

-- What's Wrong with Secretary Kim
INSERT INTO dramas (title, year, description, poster_url, web_scraped)
VALUES (
  'What''s Wrong with Secretary Kim',
  2018,
  'A narcissistic vice chairman of a major corporation is shocked when his highly capable secretary announces her resignation, prompting him to figure out how to keep her by his side.',
  'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80',
  true
);

-- Weightlifting Fairy Kim Bok Joo
INSERT INTO dramas (title, year, description, poster_url, web_scraped)
VALUES (
  'Weightlifting Fairy Kim Bok Joo',
  2016,
  'A coming-of-age story about a female college weightlifter who struggles with her first love and the challenges of being a young athlete.',
  'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80',
  true
);

-- The Heirs
INSERT INTO dramas (title, year, description, poster_url, web_scraped)
VALUES (
  'The Heirs',
  2013,
  'Wealthy high school students navigate love, friendship, and family politics while preparing to take over their families'' business empires.',
  'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80',
  true
);

-- Boys Over Flowers
INSERT INTO dramas (title, year, description, poster_url, web_scraped)
VALUES (
  'Boys Over Flowers',
  2009,
  'A poor girl attends an elite school where she encounters the F4, a group of four wealthy and arrogant boys. She stands up to their leader and unexpectedly becomes involved in a complicated romance.',
  'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80',
  true
);

-- Moon Lovers: Scarlet Heart Ryeo
INSERT INTO dramas (title, year, description, poster_url, web_scraped)
VALUES (
  'Moon Lovers: Scarlet Heart Ryeo',
  2016,
  'A modern woman is transported back in time to the Goryeo Dynasty, where she becomes entangled in palace politics and falls in love with a prince.',
  'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80',
  true
);

-- Flower of Evil
INSERT INTO dramas (title, year, description, poster_url, web_scraped)
VALUES (
  'Flower of Evil',
  2020,
  'A man with a hidden past lives a perfect life with his detective wife until she begins investigating a case that threatens to expose his secrets.',
  'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80',
  true
);

-- Start-Up
INSERT INTO dramas (title, year, description, poster_url, web_scraped)
VALUES (
  'Start-Up',
  2020,
  'Young entrepreneurs navigate the competitive world of tech start-ups in Korea''s fictional Silicon Valley, dealing with success, failure, and romance along the way.',
  'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80',
  true
);

-- Hometown Cha-Cha-Cha
INSERT INTO dramas (title, year, description, poster_url, web_scraped)
VALUES (
  'Hometown Cha-Cha-Cha',
  2021,
  'A big-city dentist moves to a seaside village where she meets a jack-of-all-trades with a mysterious past. Their contrasting personalities lead to a heartwarming romance.',
  'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80',
  true
);

-- Our Beloved Summer
INSERT INTO dramas (title, year, description, poster_url, web_scraped)
VALUES (
  'Our Beloved Summer',
  2021,
  'Former high school sweethearts are forced to reunite years after their breakup when a documentary they filmed in school goes viral.',
  'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80',
  true
);

-- Business Proposal
INSERT INTO dramas (title, year, description, poster_url, web_scraped)
VALUES (
  'Business Proposal',
  2022,
  'An office worker agrees to go on a blind date in place of her friend, only to discover that her date is actually her company''s CEO.',
  'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80',
  true
);

-- Twenty-Five Twenty-One
INSERT INTO dramas (title, year, description, poster_url, web_scraped)
VALUES (
  'Twenty-Five Twenty-One',
  2022,
  'Set against the backdrop of the IMF crisis in the late 1990s, two young people meet at ages 22 and 18, then fall in love when they turn 25 and 21.',
  'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80',
  true
);

-- Squid Game
INSERT INTO dramas (title, year, description, poster_url, web_scraped)
VALUES (
  'Squid Game',
  2021,
  'Desperate contestants compete in deadly children''s games for a chance to win a life-changing cash prize, revealing the dark side of human nature in the process.',
  'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80',
  true
);

-- All of Us Are Dead
INSERT INTO dramas (title, year, description, poster_url, web_scraped)
VALUES (
  'All of Us Are Dead',
  2022,
  'A high school becomes ground zero for a zombie virus outbreak. Trapped students must fight their way out or turn into one of the infected.',
  'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80',
  true
);

-- Pachinko
INSERT INTO dramas (title, year, description, poster_url, web_scraped)
VALUES (
  'Pachinko',
  2022,
  'An epic story following four generations of a Korean family who immigrate to Japan, facing discrimination and hardship while trying to build a better life.',
  'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80',
  true
);

-- Extraordinary Attorney Woo
INSERT INTO dramas (title, year, description, poster_url, web_scraped)
VALUES (
  'Extraordinary Attorney Woo',
  2022,
  'A brilliant attorney on the autism spectrum tackles challenges in the courtroom and beyond, using her exceptional memory and creative thinking to solve cases.',
  'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80',
  true
);

-- The Glory
INSERT INTO dramas (title, year, description, poster_url, web_scraped)
VALUES (
  'The Glory',
  2022,
  'A woman who was brutally bullied in high school meticulously plans revenge against her tormentors years later.',
  'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80',
  true
);

-- Moving
INSERT INTO dramas (title, year, description, poster_url, web_scraped)
VALUES (
  'Moving',
  2023,
  'High school students with superpowers and their parents, who have been hiding their abilities for years, face new threats that force them to use their powers.',
  'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80',
  true
);

-- Queen of Tears
INSERT INTO dramas (title, year, description, poster_url, web_scraped)
VALUES (
  'Queen of Tears',
  2024,
  'The heiress of a conglomerate and her husband from a rural background navigate their marriage crisis when she is diagnosed with a terminal illness.',
  'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80',
  true
);

-- Lovely Runner
INSERT INTO dramas (title, year, description, poster_url, web_scraped)
VALUES (
  'Lovely Runner',
  2024,
  'A devoted fan gets the chance to travel back in time to save her favorite idol from a tragic accident, changing both their destinies in the process.',
  'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80',
  true
);

-- My Demon
INSERT INTO dramas (title, year, description, poster_url, web_scraped)
VALUES (
  'My Demon',
  2023,
  'A powerful demon loses his abilities after making a contract with a cold-hearted chaebol heiress, leading to an unexpected romance.',
  'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80',
  true
);

-- Alchemy of Souls
INSERT INTO dramas (title, year, description, poster_url, web_scraped)
VALUES (
  'Alchemy of Souls',
  2022,
  'Set in a fictional country where magic exists, a powerful sorceress in a blind woman''s body becomes entangled with a noble family''s troubled history.',
  'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80',
  true
);

-- The Uncanny Counter
INSERT INTO dramas (title, year, description, poster_url, web_scraped)
VALUES (
  'The Uncanny Counter',
  2020,
  'Noodle shop employees by day and demon hunters by night, the Counters use their supernatural abilities to chase evil spirits who have escaped from the afterlife.',
  'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80',
  true
);

-- Sweet Home
INSERT INTO dramas (title, year, description, poster_url, web_scraped)
VALUES (
  'Sweet Home',
  2020,
  'As humans turn into savage monsters, a troubled teen and his apartment neighbors fight to survive and hold on to their humanity.',
  'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80',
  true
);

-- D.P.
INSERT INTO dramas (title, year, description, poster_url, web_scraped)
VALUES (
  'D.P.',
  2021,
  'A team of Korean military police whose job is to catch deserters discovers the painful realities that drive soldiers to desert their posts.',
  'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80',
  true
);

-- Now add tags for each drama

-- Romance tags
INSERT INTO drama_tags (name) VALUES ('Romance') ON CONFLICT (name) DO NOTHING;
INSERT INTO drama_tags (name) VALUES ('Melodrama') ON CONFLICT (name) DO NOTHING;
INSERT INTO drama_tags (name) VALUES ('Romantic Comedy') ON CONFLICT (name) DO NOTHING;

-- Genre tags
INSERT INTO drama_tags (name) VALUES ('Fantasy') ON CONFLICT (name) DO NOTHING;
INSERT INTO drama_tags (name) VALUES ('Historical') ON CONFLICT (name) DO NOTHING;
INSERT INTO drama_tags (name) VALUES ('Medical') ON CONFLICT (name) DO NOTHING;
INSERT INTO drama_tags (name) VALUES ('Thriller') ON CONFLICT (name) DO NOTHING;
INSERT INTO drama_tags (name) VALUES ('Mystery') ON CONFLICT (name) DO NOTHING;
INSERT INTO drama_tags (name) VALUES ('Action') ON CONFLICT (name) DO NOTHING;
INSERT INTO drama_tags (name) VALUES ('Comedy') ON CONFLICT (name) DO NOTHING;
INSERT INTO drama_tags (name) VALUES ('Horror') ON CONFLICT (name) DO NOTHING;
INSERT INTO drama_tags (name) VALUES ('Slice of Life') ON CONFLICT (name) DO NOTHING;
INSERT INTO drama_tags (name) VALUES ('Coming of Age') ON CONFLICT (name) DO NOTHING;
INSERT INTO drama_tags (name) VALUES ('Legal') ON CONFLICT (name) DO NOTHING;
INSERT INTO drama_tags (name) VALUES ('Supernatural') ON CONFLICT (name) DO NOTHING;
INSERT INTO drama_tags (name) VALUES ('Sci-Fi') ON CONFLICT (name) DO NOTHING;
INSERT INTO drama_tags (name) VALUES ('School') ON CONFLICT (name) DO NOTHING;
INSERT INTO drama_tags (name) VALUES ('Zombie') ON CONFLICT (name) DO NOTHING;
INSERT INTO drama_tags (name) VALUES ('Time Travel') ON CONFLICT (name) DO NOTHING;
INSERT INTO drama_tags (name) VALUES ('Revenge') ON CONFLICT (name) DO NOTHING;
INSERT INTO drama_tags (name) VALUES ('Business') ON CONFLICT (name) DO NOTHING;

-- Now associate tags with dramas
-- This is a simplified approach - in a real implementation, you'd want to match tags more precisely

-- Helper function to get tag IDs
DO $$
DECLARE
  romance_id UUID;
  romcom_id UUID;
  fantasy_id UUID;
  historical_id UUID;
  medical_id UUID;
  thriller_id UUID;
  mystery_id UUID;
  action_id UUID;
  comedy_id UUID;
  horror_id UUID;
  slice_id UUID;
  coming_id UUID;
  legal_id UUID;
  supernatural_id UUID;
  scifi_id UUID;
  school_id UUID;
  zombie_id UUID;
  time_travel_id UUID;
  revenge_id UUID;
  business_id UUID;
  melodrama_id UUID;
  drama_id UUID;
  
BEGIN
  -- Get tag IDs
  SELECT id INTO romance_id FROM drama_tags WHERE name = 'Romance';
  SELECT id INTO romcom_id FROM drama_tags WHERE name = 'Romantic Comedy';
  SELECT id INTO fantasy_id FROM drama_tags WHERE name = 'Fantasy';
  SELECT id INTO historical_id FROM drama_tags WHERE name = 'Historical';
  SELECT id INTO medical_id FROM drama_tags WHERE name = 'Medical';
  SELECT id INTO thriller_id FROM drama_tags WHERE name = 'Thriller';
  SELECT id INTO mystery_id FROM drama_tags WHERE name = 'Mystery';
  SELECT id INTO action_id FROM drama_tags WHERE name = 'Action';
  SELECT id INTO comedy_id FROM drama_tags WHERE name = 'Comedy';
  SELECT id INTO horror_id FROM drama_tags WHERE name = 'Horror';
  SELECT id INTO slice_id FROM drama_tags WHERE name = 'Slice of Life';
  SELECT id INTO coming_id FROM drama_tags WHERE name = 'Coming of Age';
  SELECT id INTO legal_id FROM drama_tags WHERE name = 'Legal';
  SELECT id INTO supernatural_id FROM drama_tags WHERE name = 'Supernatural';
  SELECT id INTO scifi_id FROM drama_tags WHERE name = 'Sci-Fi';
  SELECT id INTO school_id FROM drama_tags WHERE name = 'School';
  SELECT id INTO zombie_id FROM drama_tags WHERE name = 'Zombie';
  SELECT id INTO time_travel_id FROM drama_tags WHERE name = 'Time Travel';
  SELECT id INTO revenge_id FROM drama_tags WHERE name = 'Revenge';
  SELECT id INTO business_id FROM drama_tags WHERE name = 'Business';
  SELECT id INTO melodrama_id FROM drama_tags WHERE name = 'Melodrama';
  
  -- Crash Landing on You
  SELECT id INTO drama_id FROM dramas WHERE title = 'Crash Landing on You' AND web_scraped = true;
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, romance_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, comedy_id);
  
  -- Goblin
  SELECT id INTO drama_id FROM dramas WHERE title = 'Goblin' AND web_scraped = true;
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, romance_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, fantasy_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, supernatural_id);
  
  -- Descendants of the Sun
  SELECT id INTO drama_id FROM dramas WHERE title = 'Descendants of the Sun' AND web_scraped = true;
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, romance_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, action_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, medical_id);
  
  -- It's Okay to Not Be Okay
  SELECT id INTO drama_id FROM dramas WHERE title = 'It''s Okay to Not Be Okay' AND web_scraped = true;
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, romance_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, melodrama_id);
  
  -- Reply 1988
  SELECT id INTO drama_id FROM dramas WHERE title = 'Reply 1988' AND web_scraped = true;
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, slice_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, coming_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, comedy_id);
  
  -- My Love from the Star
  SELECT id INTO drama_id FROM dramas WHERE title = 'My Love from the Star' AND web_scraped = true;
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, romance_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, fantasy_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, comedy_id);
  
  -- Hospital Playlist
  SELECT id INTO drama_id FROM dramas WHERE title = 'Hospital Playlist' AND web_scraped = true;
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, medical_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, slice_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, comedy_id);
  
  -- The King: Eternal Monarch
  SELECT id INTO drama_id FROM dramas WHERE title = 'The King: Eternal Monarch' AND web_scraped = true;
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, romance_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, fantasy_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, scifi_id);
  
  -- Itaewon Class
  SELECT id INTO drama_id FROM dramas WHERE title = 'Itaewon Class' AND web_scraped = true;
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, business_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, revenge_id);
  
  -- Sky Castle
  SELECT id INTO drama_id FROM dramas WHERE title = 'Sky Castle' AND web_scraped = true;
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, thriller_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, mystery_id);
  
  -- Signal
  SELECT id INTO drama_id FROM dramas WHERE title = 'Signal' AND web_scraped = true;
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, thriller_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, mystery_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, time_travel_id);
  
  -- Mr. Sunshine
  SELECT id INTO drama_id FROM dramas WHERE title = 'Mr. Sunshine' AND web_scraped = true;
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, historical_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, romance_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, action_id);
  
  -- Hotel Del Luna
  SELECT id INTO drama_id FROM dramas WHERE title = 'Hotel Del Luna' AND web_scraped = true;
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, fantasy_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, romance_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, supernatural_id);
  
  -- Kingdom
  SELECT id INTO drama_id FROM dramas WHERE title = 'Kingdom' AND web_scraped = true;
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, historical_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, zombie_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, horror_id);
  
  -- When the Camellia Blooms
  SELECT id INTO drama_id FROM dramas WHERE title = 'When the Camellia Blooms' AND web_scraped = true;
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, romance_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, thriller_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, comedy_id);
  
  -- Vincenzo
  SELECT id INTO drama_id FROM dramas WHERE title = 'Vincenzo' AND web_scraped = true;
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, action_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, comedy_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, legal_id);
  
  -- True Beauty
  SELECT id INTO drama_id FROM dramas WHERE title = 'True Beauty' AND web_scraped = true;
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, romcom_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, school_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, coming_id);
  
  -- Extraordinary You
  SELECT id INTO drama_id FROM dramas WHERE title = 'Extraordinary You' AND web_scraped = true;
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, fantasy_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, romance_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, school_id);
  
  -- Strong Woman Do Bong Soon
  SELECT id INTO drama_id FROM dramas WHERE title = 'Strong Woman Do Bong Soon' AND web_scraped = true;
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, romcom_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, fantasy_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, action_id);
  
  -- What's Wrong with Secretary Kim
  SELECT id INTO drama_id FROM dramas WHERE title = 'What''s Wrong with Secretary Kim' AND web_scraped = true;
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, romcom_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, business_id);
  
  -- Weightlifting Fairy Kim Bok Joo
  SELECT id INTO drama_id FROM dramas WHERE title = 'Weightlifting Fairy Kim Bok Joo' AND web_scraped = true;
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, romcom_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, coming_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, school_id);
  
  -- The Heirs
  SELECT id INTO drama_id FROM dramas WHERE title = 'The Heirs' AND web_scraped = true;
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, romance_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, school_id);
  
  -- Boys Over Flowers
  SELECT id INTO drama_id FROM dramas WHERE title = 'Boys Over Flowers' AND web_scraped = true;
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, romance_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, school_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, comedy_id);
  
  -- Moon Lovers: Scarlet Heart Ryeo
  SELECT id INTO drama_id FROM dramas WHERE title = 'Moon Lovers: Scarlet Heart Ryeo' AND web_scraped = true;
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, historical_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, romance_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, time_travel_id);
  
  -- Flower of Evil
  SELECT id INTO drama_id FROM dramas WHERE title = 'Flower of Evil' AND web_scraped = true;
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, thriller_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, mystery_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, romance_id);
  
  -- Start-Up
  SELECT id INTO drama_id FROM dramas WHERE title = 'Start-Up' AND web_scraped = true;
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, romance_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, business_id);
  
  -- Hometown Cha-Cha-Cha
  SELECT id INTO drama_id FROM dramas WHERE title = 'Hometown Cha-Cha-Cha' AND web_scraped = true;
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, romcom_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, slice_id);
  
  -- Our Beloved Summer
  SELECT id INTO drama_id FROM dramas WHERE title = 'Our Beloved Summer' AND web_scraped = true;
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, romance_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, slice_id);
  
  -- Business Proposal
  SELECT id INTO drama_id FROM dramas WHERE title = 'Business Proposal' AND web_scraped = true;
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, romcom_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, business_id);
  
  -- Twenty-Five Twenty-One
  SELECT id INTO drama_id FROM dramas WHERE title = 'Twenty-Five Twenty-One' AND web_scraped = true;
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, romance_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, coming_id);
  
  -- Squid Game
  SELECT id INTO drama_id FROM dramas WHERE title = 'Squid Game' AND web_scraped = true;
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, thriller_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, action_id);
  
  -- All of Us Are Dead
  SELECT id INTO drama_id FROM dramas WHERE title = 'All of Us Are Dead' AND web_scraped = true;
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, zombie_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, horror_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, school_id);
  
  -- Pachinko
  SELECT id INTO drama_id FROM dramas WHERE title = 'Pachinko' AND web_scraped = true;
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, historical_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, melodrama_id);
  
  -- Extraordinary Attorney Woo
  SELECT id INTO drama_id FROM dramas WHERE title = 'Extraordinary Attorney Woo' AND web_scraped = true;
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, legal_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, slice_id);
  
  -- The Glory
  SELECT id INTO drama_id FROM dramas WHERE title = 'The Glory' AND web_scraped = true;
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, revenge_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, thriller_id);
  
  -- Moving
  SELECT id INTO drama_id FROM dramas WHERE title = 'Moving' AND web_scraped = true;
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, action_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, fantasy_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, school_id);
  
  -- Queen of Tears
  SELECT id INTO drama_id FROM dramas WHERE title = 'Queen of Tears' AND web_scraped = true;
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, romance_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, melodrama_id);
  
  -- Lovely Runner
  SELECT id INTO drama_id FROM dramas WHERE title = 'Lovely Runner' AND web_scraped = true;
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, romance_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, time_travel_id);
  
  -- My Demon
  SELECT id INTO drama_id FROM dramas WHERE title = 'My Demon' AND web_scraped = true;
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, romance_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, fantasy_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, supernatural_id);
  
  -- Alchemy of Souls
  SELECT id INTO drama_id FROM dramas WHERE title = 'Alchemy of Souls' AND web_scraped = true;
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, fantasy_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, historical_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, romance_id);
  
  -- The Uncanny Counter
  SELECT id INTO drama_id FROM dramas WHERE title = 'The Uncanny Counter' AND web_scraped = true;
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, action_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, supernatural_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, fantasy_id);
  
  -- Sweet Home
  SELECT id INTO drama_id FROM dramas WHERE title = 'Sweet Home' AND web_scraped = true;
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, horror_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, thriller_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, supernatural_id);
  
  -- D.P.
  SELECT id INTO drama_id FROM dramas WHERE title = 'D.P.' AND web_scraped = true;
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, action_id);
  INSERT INTO drama_tag_relations (drama_id, tag_id) VALUES (drama_id, thriller_id);
  
END $$;