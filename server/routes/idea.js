const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM ideas');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// POST - Create new idea
router.post('/', async (req, res) => {
  const { title, description, category, status } = req.body;

  try {
    const newIdea = await pool.query(
      'INSERT INTO ideas (title, description, category, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description, category, status]
    );

    res.json(newIdea.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


module.exports = router;
