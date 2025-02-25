/*
  # Initial Schema Setup for Flasher AI

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `username` (text, unique)
      - `avatar_url` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `decks`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `title` (text)
      - `description` (text)
      - `is_public` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `flashcards`
      - `id` (uuid, primary key)
      - `deck_id` (uuid, references decks)
      - `front` (text)
      - `back` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `last_reviewed` (timestamp)
      - `next_review` (timestamp)
      - `difficulty` (smallint)
    
    - `user_stats`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `cards_created` (integer)
      - `cards_reviewed` (integer)
      - `study_time` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Public read access for shared decks
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users,
  username text UNIQUE,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Create decks table
CREATE TABLE decks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles NOT NULL,
  title text NOT NULL,
  description text,
  is_public boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE decks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD own decks"
  ON decks
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can read public decks"
  ON decks
  FOR SELECT
  TO authenticated
  USING (is_public = true);

-- Create flashcards table
CREATE TABLE flashcards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  deck_id uuid REFERENCES decks ON DELETE CASCADE NOT NULL,
  front text NOT NULL,
  back text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  last_reviewed timestamptz,
  next_review timestamptz,
  difficulty smallint DEFAULT 0
);

ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD own flashcards"
  ON flashcards
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM decks
      WHERE decks.id = flashcards.deck_id
      AND decks.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can read public flashcards"
  ON flashcards
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM decks
      WHERE decks.id = flashcards.deck_id
      AND decks.is_public = true
    )
  );

-- Create user_stats table
CREATE TABLE user_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles NOT NULL,
  cards_created integer DEFAULT 0,
  cards_reviewed integer DEFAULT 0,
  study_time integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own stats"
  ON user_stats
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own stats"
  ON user_stats
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create functions and triggers
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_decks_updated_at
  BEFORE UPDATE ON decks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_flashcards_updated_at
  BEFORE UPDATE ON flashcards
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_user_stats_updated_at
  BEFORE UPDATE ON user_stats
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();