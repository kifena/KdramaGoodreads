CREATE TABLE IF NOT EXISTS dramas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  year INTEGER,
  poster_url TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS drama_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS drama_tag_relations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  drama_id UUID REFERENCES dramas(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES drama_tags(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(drama_id, tag_id)
);

CREATE TABLE IF NOT EXISTS user_dramas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  drama_id UUID REFERENCES dramas(id) ON DELETE CASCADE,
  status TEXT CHECK (status IN ('liked', 'loved', 'dropped', 'watching', 'plan_to_watch')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, drama_id)
);

-- Enable realtime for all tables
alter publication supabase_realtime add table dramas;
alter publication supabase_realtime add table drama_tags;
alter publication supabase_realtime add table drama_tag_relations;
alter publication supabase_realtime add table user_dramas;

-- Insert some initial tags
INSERT INTO drama_tags (name) VALUES
('Romance'),
('Comedy'),
('Action'),
('Thriller'),
('Historical'),
('Fantasy'),
('Melodrama'),
('Medical'),
('Crime'),
('Legal'),
('School'),
('Slice of Life')
ON CONFLICT (name) DO NOTHING;