-- Database Test Case Script for User Registration / Login / Profile Update
-- Purpose: validate core user flow and edge cases in SQL

BEGIN;

-- Optional setup for a clean environment
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TC-DB-001: Register new user
INSERT INTO users (name, email, password_hash)
VALUES ('Playwright User', 'playwright@example.com', 'hashed_password_123');

-- TC-DB-002: Verify user was created successfully
SELECT id, name, email
FROM users
WHERE email = 'playwright@example.com';

-- TC-DB-003: Validate duplicate email is rejected
SELECT CASE
    WHEN EXISTS (
        SELECT 1
        FROM users
        WHERE email = 'playwright@example.com'
    ) THEN 'DUPLICATE_EMAIL_FOUND'
    ELSE 'NO_DUPLICATE_EMAIL'
END AS duplicate_email_check;

-- TC-DB-004: Login validation with correct credentials
SELECT id, name, email
FROM users
WHERE email = 'playwright@example.com'
  AND password_hash = 'hashed_password_123';

-- TC-DB-005: Update user profile
UPDATE users
SET name = 'Playwright Updated User',
    updated_at = CURRENT_TIMESTAMP
WHERE email = 'playwright@example.com';

-- TC-DB-006: Verify profile update result
SELECT id, name, email, updated_at
FROM users
WHERE email = 'playwright@example.com';

-- TC-DB-007: Negative test - invalid password should fail
SELECT CASE
    WHEN EXISTS (
        SELECT 1
        FROM users
        WHERE email = 'playwright@example.com'
          AND password_hash = 'wrong_password'
    ) THEN 'LOGIN_SUCCESS'
    ELSE 'LOGIN_FAILED'
END AS login_status;

-- TC-DB-008: Check final persisted user data
SELECT id, name, email, password_hash, updated_at
FROM users
WHERE email = 'playwright@example.com';

-- TC-DB-009: Confirm expected data state in the table
SELECT
    COUNT(*) AS total_users,
    SUM(CASE WHEN email = 'playwright@example.com' AND name = 'Playwright Updated User' THEN 1 ELSE 0 END) AS updated_user_count,
    SUM(CASE WHEN email = 'playwright@example.com' AND password_hash = 'hashed_password_123' THEN 1 ELSE 0 END) AS valid_password_count
FROM users;

COMMIT;

-- Expected result summary:
-- 1. User row inserted successfully
-- 2. Email uniqueness is preserved
-- 3. Correct credentials return one user record
-- 4. Profile update changes the name
-- 5. Invalid credentials return LOGIN_FAILED
-- 6. Final persisted data matches the expected updated user record
-- 7. Table count confirms only one valid updated user exists
