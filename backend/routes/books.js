// backend/routes/books.js
const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// GET /api/books - public
router.get('/', async (req, res) => {
  try {
    const books = await Book.find({});
    res.json({ books });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
