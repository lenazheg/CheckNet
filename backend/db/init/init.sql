CREATE TABLE IF NOT EXISTS candidates (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  keywords TEXT,
  external_data TEXT,
  summary TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);