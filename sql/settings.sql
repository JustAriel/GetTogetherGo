-- Create the settings table
CREATE TABLE IF NOT EXISTS settings (
  id INTEGER PRIMARY KEY,
  userId INTEGER,
  settingName TEXT,
  value TEXT,
  FOREIGN KEY (userId) REFERENCES users (id)
);

-- Insert sample setting data
INSERT INTO settings (id, userId, settingName, value)
VALUES (1, 1, 'theme', 'dark');

-- Add additional SQL statements for setting-related operations if needed
