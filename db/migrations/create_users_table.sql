-- Create users table with required fields and constraints
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Add unique index on email (case-insensitive)
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email_lower ON users (LOWER(email));

-- Add comment for documentation
COMMENT ON TABLE users IS 'User accounts with secure password storage';
COMMENT ON COLUMN users.email IS 'Unique email address (case-insensitive)';
COMMENT ON COLUMN users.password_hash IS 'Bcrypt hashed password (never store plain text)';
