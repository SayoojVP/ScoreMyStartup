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

//POST route for scores
router.post('/scores', async (req, res) => {
  const { idea_id, market_potential, uniqueness, team_fit, monetization, feasibility } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO scores (idea_id, market_potential, uniqueness, team_fit, monetization, feasibility)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [idea_id, market_potential, uniqueness, team_fit, monetization, feasibility]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error saving score');
  }
});

// GET route for scores
router.get('/scores/:ideaId', async (req, res) => {
  const { ideaId } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM scores WHERE idea_id = $1`,
      [ideaId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error fetching scores');
  }
});


module.exports = router;
