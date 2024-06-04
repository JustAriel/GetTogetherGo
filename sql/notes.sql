-- Create the notes table
CREATE TABLE IF NOT EXISTS notes (
  id INTEGER PRIMARY KEY,
  userId INTEGER,
  title TEXT,
  content TEXT,
  FOREIGN KEY (userId) REFERENCES users (id)
);

-- Insert sample note data
INSERT INTO notes (id, userId, title, content)
VALUES (1, 1, 'Grocery List', 'Milk, Eggs, Bread');

-- Add additional SQL statements for note-related operations if needed
