const express = require('express');
const mysql = require('mysql');
const app = express();

// Set up server port
const port = 3000;

// Create MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database_name'
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Example route to fetch users from the database
app.get('/users', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      res.status(500).json({ error: 'Error connecting to the database' });
    } else {
      const sql = 'SELECT * FROM users';

      connection.query(sql, (error, results) => {
        connection.release(); // Release the connection

        if (error) {
          res.status(500).json({ error: 'Error executing the query' });
        } else {
          res.json(results);
        }
      });
    }
  });
});
