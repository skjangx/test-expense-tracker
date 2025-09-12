-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create categories table
CREATE TABLE categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('income', 'expense')),
  color VARCHAR(7) NOT NULL,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_categories_user_id ON categories(user_id);
CREATE INDEX idx_categories_type ON categories(type);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can view their own categories
CREATE POLICY "Users can view own categories" 
  ON categories FOR SELECT 
  TO authenticated 
  USING (user_id = auth.uid());

-- RLS Policy: Users can insert their own categories
CREATE POLICY "Users can insert own categories" 
  ON categories FOR INSERT 
  TO authenticated 
  WITH CHECK (user_id = auth.uid());

-- RLS Policy: Users can update their own categories
CREATE POLICY "Users can update own categories" 
  ON categories FOR UPDATE 
  TO authenticated 
  USING (user_id = auth.uid());

-- RLS Policy: Users can delete their own categories
CREATE POLICY "Users can delete own categories" 
  ON categories FOR DELETE 
  TO authenticated 
  USING (user_id = auth.uid());