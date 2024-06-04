-- Create the posts table
CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY,
  userId INTEGER,
  content TEXT,
  timestamp DATETIME,
  FOREIGN KEY (userId) REFERENCES users (id)
);

-- Insert sample post data
INSERT INTO posts (id, userId, content, timestamp)
VALUES (1, 1, 'Hello, everyone!', '2023-05-25 12:00:00');

-- Add additional SQL statements for post-related operations if needed
