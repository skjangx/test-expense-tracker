-- Seed default categories
-- These are system-wide default categories available to all users
-- user_id is NULL for default categories, users will copy/reference these

-- Create test user for automated testing
-- This user is used by Playwright visual regression tests
DO $$
BEGIN
  -- Only create if not exists
  IF NOT EXISTS (
    SELECT 1 FROM auth.users WHERE email = 'test@expense-tracker.com'
  ) THEN
    -- Create test user with known credentials
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      recovery_sent_at,
      last_sign_in_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'test@expense-tracker.com',
      crypt('TestPassword123!', gen_salt('bf')),
      NOW(),
      NULL,
      NULL,
      '{"provider":"email","providers":["email"]}',
      '{}',
      NOW(),
      NOW(),
      '',
      '',
      '',
      ''
    );
  END IF;
END $$;

-- Default Expense Categories
INSERT INTO categories (user_id, name, type, color, is_default) VALUES
(NULL, 'Food', 'expense', '#ef4444', true),              -- Red
(NULL, 'Transportation', 'expense', '#3b82f6', true),    -- Blue  
(NULL, 'Housing', 'expense', '#8b5cf6', true),           -- Purple
(NULL, 'Entertainment', 'expense', '#f59e0b', true),     -- Amber
(NULL, 'Healthcare', 'expense', '#10b981', true),        -- Emerald
(NULL, 'Shopping', 'expense', '#ec4899', true),          -- Pink
(NULL, 'Utilities', 'expense', '#6b7280', true),         -- Gray
(NULL, 'Other', 'expense', '#64748b', true);             -- Slate

-- Default Income Categories  
INSERT INTO categories (user_id, name, type, color, is_default) VALUES
(NULL, 'Salary', 'income', '#22c55e', true),             -- Green
(NULL, 'Freelance', 'income', '#06b6d4', true),          -- Cyan
(NULL, 'Investment', 'income', '#8b5cf6', true),         -- Purple
(NULL, 'Gift', 'income', '#f59e0b', true),               -- Amber
(NULL, 'Other', 'income', '#64748b', true);              -- Slate