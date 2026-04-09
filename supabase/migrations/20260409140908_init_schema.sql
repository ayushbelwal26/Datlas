-- Core schema for DSA Atlas

-- Update user profiles when new auth rows created
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  goal TEXT, -- Placements, Beginner DSA, Interview Prep, Contest Improvement
  current_level TEXT, -- Beginner, Intermediate, Advanced
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Topics
CREATE TABLE topics (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  difficulty TEXT, -- Beginner, Intermediate, Advanced
  estimated_hours TEXT,
  phase TEXT,
  why_it_matters TEXT,
  order_index INTEGER NOT NULL
);

ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access to topics" ON topics FOR SELECT TO authenticated, anon USING (true);

-- Subtopics
CREATE TABLE subtopics (
  id TEXT PRIMARY KEY,
  topic_id TEXT REFERENCES topics(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  order_index INTEGER NOT NULL
);

ALTER TABLE subtopics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access to subtopics" ON subtopics FOR SELECT TO authenticated, anon USING (true);

-- Resources
CREATE TABLE resources (
  id TEXT PRIMARY KEY,
  topic_id TEXT REFERENCES topics(id) ON DELETE CASCADE,
  subtopic_id TEXT REFERENCES subtopics(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  type TEXT NOT NULL, -- video, article, editorial, revision
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  duration TEXT,
  rating NUMERIC(3, 1),
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);

ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access to resources" ON resources FOR SELECT TO authenticated, anon USING (true);

-- Problems
CREATE TABLE problems (
  id TEXT PRIMARY KEY,
  topic_id TEXT REFERENCES topics(id) ON DELETE CASCADE,
  subtopic_id TEXT REFERENCES subtopics(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  difficulty TEXT, -- Easy, Medium, Hard
  stage TEXT NOT NULL, -- warmup, core, interview, competitive
  tags TEXT[] DEFAULT '{}',
  is_must_solve BOOLEAN DEFAULT FALSE,
  cf_link BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);

ALTER TABLE problems ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access to problems" ON problems FOR SELECT TO authenticated, anon USING (true);

-- User Topic Progress
CREATE TABLE user_topic_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  topic_id TEXT REFERENCES topics(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'not-started', -- not-started, in-progress, completed, locked
  completion_percent INTEGER DEFAULT 0,
  current_subtopic_id TEXT REFERENCES subtopics(id) ON DELETE SET NULL,
  last_activity_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(user_id, topic_id)
);

ALTER TABLE user_topic_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own topic progress" ON user_topic_progress FOR ALL USING (auth.uid() = user_id);

-- User Resource Progress
CREATE TABLE user_resource_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  resource_id TEXT REFERENCES resources(id) ON DELETE CASCADE,
  viewed BOOLEAN DEFAULT FALSE,
  bookmarked BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(user_id, resource_id)
);

ALTER TABLE user_resource_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own resource progress" ON user_resource_progress FOR ALL USING (auth.uid() = user_id);

-- User Problem Progress
CREATE TABLE user_problem_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  problem_id TEXT REFERENCES problems(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'not_attempted', -- not_attempted, attempted, solved, retry_later
  bookmarked BOOLEAN DEFAULT FALSE,
  confidence TEXT, -- low, medium, high
  solve_time_minutes INTEGER,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(user_id, problem_id)
);

ALTER TABLE user_problem_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own problem progress" ON user_problem_progress FOR ALL USING (auth.uid() = user_id);

-- Daily Study Plans
CREATE TABLE daily_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  available_minutes INTEGER NOT NULL,
  goal TEXT NOT NULL,
  energy_level TEXT NOT NULL,
  generated_for_date DATE NOT NULL DEFAULT CURRENT_DATE,
  plan_json JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);

ALTER TABLE daily_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own daily plans" ON daily_plans FOR ALL USING (auth.uid() = user_id);

-- Function to handle new user profile creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles(id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new auth users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user();
