-- Create the likes table
CREATE TABLE IF NOT EXISTS likes (
  id INTEGER PRIMARY KEY,
  postId INTEGER,
  userId INTEGER,
  FOREIGN KEY (postId) REFERENCES posts (id),
  FOREIGN KEY (userId) REFERENCES users (id)
);

-- Insert sample like data
INSERT INTO likes (id, postId, userId)
VALUES (1, 1, 1);

-- Add additional SQL statements for like-related operations if needed
