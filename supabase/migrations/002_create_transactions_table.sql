-- Create transactions table
CREATE TABLE transactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL CHECK (amount > 0),
  type VARCHAR(20) NOT NULL CHECK (type IN ('income', 'expense')),
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  description VARCHAR(500),
  transaction_date DATE NOT NULL,
  is_recurring BOOLEAN DEFAULT false,
  recurring_pattern JSONB,
  is_deleted BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_date ON transactions(transaction_date);
CREATE INDEX idx_transactions_category ON transactions(category_id);
CREATE INDEX idx_transactions_type ON transactions(type);
CREATE INDEX idx_transactions_is_deleted ON transactions(is_deleted);

-- Compound index for common query patterns
CREATE INDEX idx_transactions_user_date ON transactions(user_id, transaction_date DESC);
CREATE INDEX idx_transactions_user_not_deleted ON transactions(user_id, is_deleted) WHERE is_deleted = false;

-- Enable Row Level Security
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can view their own non-deleted transactions
CREATE POLICY "Users can view own transactions" 
  ON transactions FOR SELECT 
  TO authenticated 
  USING (user_id = auth.uid() AND is_deleted = false);

-- RLS Policy: Users can insert their own transactions
CREATE POLICY "Users can insert own transactions" 
  ON transactions FOR INSERT 
  TO authenticated 
  WITH CHECK (user_id = auth.uid());

-- RLS Policy: Users can update their own transactions
CREATE POLICY "Users can update own transactions" 
  ON transactions FOR UPDATE 
  TO authenticated 
  USING (user_id = auth.uid());

-- RLS Policy: Users can delete their own transactions (soft delete)
CREATE POLICY "Users can delete own transactions" 
  ON transactions FOR DELETE 
  TO authenticated 
  USING (user_id = auth.uid());