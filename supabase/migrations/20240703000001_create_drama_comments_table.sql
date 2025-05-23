-- Create drama_comments table
CREATE TABLE IF NOT EXISTS drama_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  drama_id UUID REFERENCES dramas(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  comment TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS drama_comments_drama_id_idx ON drama_comments(drama_id);
CREATE INDEX IF NOT EXISTS drama_comments_user_id_idx ON drama_comments(user_id);

-- Enable realtime for comments
alter publication supabase_realtime add table drama_comments;
