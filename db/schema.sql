DROP DATABASE IF EXISTS chattycathy;

CREATE DATABASE chattycathy;

\c chattycathy

-- CREATE OR REPLACE FUNCTION trigger_set_timestamp()
-- RETURNS TRIGGER AS $$
-- BEGIN
--   NEW.created_at = NOW();
--   RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  handle VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE chatrooms (
  id SERIAL PRIMARY KEY,
  roomname VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  message VARCHAR(255) NOT NULL,
  -- created_at TIMESTAMPTZ,
  created_at timestamp DEFAULT current_timestamp,
  user_id INT REFERENCES users(id),
  room_id INT REFERENCES chatrooms(id)
  
);

-- CREATE TRIGGER set_timestamp
-- BEFORE UPDATE ON messages
-- FOR EACH ROW
-- EXECUTE PROCEDURE trigger_set_timestamp();