-- Seed default categories
-- These are system-wide default categories available to all users
-- user_id is NULL for default categories, users will copy/reference these

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