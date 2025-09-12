-- Create goals table
CREATE TABLE goals (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL CHECK (amount > 0),
  period_type VARCHAR(20) NOT NULL CHECK (period_type IN ('daily', 'weekly', 'monthly', 'yearly')),
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX idx_goals_user_id ON goals(user_id);
CREATE INDEX idx_goals_category_id ON goals(category_id);
CREATE INDEX idx_goals_period_type ON goals(period_type);
CREATE INDEX idx_goals_period_dates ON goals(period_start, period_end);
CREATE INDEX idx_goals_active ON goals(is_active);

-- Compound indexes for common query patterns
CREATE INDEX idx_goals_user_active ON goals(user_id, is_active) WHERE is_active = true;
CREATE INDEX idx_goals_user_category_active ON goals(user_id, category_id, is_active) WHERE is_active = true;

-- Enable Row Level Security
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can view their own goals
CREATE POLICY "Users can view own goals" 
  ON goals FOR SELECT 
  TO authenticated 
  USING (user_id = auth.uid());

-- RLS Policy: Users can insert their own goals
CREATE POLICY "Users can insert own goals" 
  ON goals FOR INSERT 
  TO authenticated 
  WITH CHECK (user_id = auth.uid());

-- RLS Policy: Users can update their own goals
CREATE POLICY "Users can update own goals" 
  ON goals FOR UPDATE 
  TO authenticated 
  USING (user_id = auth.uid());

-- RLS Policy: Users can delete their own goals
CREATE POLICY "Users can delete own goals" 
  ON goals FOR DELETE 
  TO authenticated 
  USING (user_id = auth.uid());