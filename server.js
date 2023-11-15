const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3002;

app.use(express.json());

// PostgreSQL connection setup
const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'postgres',
  password: 'DB@1234',
  port: 5432,
});

app.post('/products', async (req, res) => {
  const { name, price } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *',
      [name, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Product Catalog Service is running on port ${port}`);
});

module.exports = app;
