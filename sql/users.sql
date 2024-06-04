-- users.sql
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

INSERT INTO users (id, username, password) 
VALUES (2, '321', '321');