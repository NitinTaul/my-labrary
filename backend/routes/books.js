const express = require('express');
const router = express.Router();
const Book = require('../models/book.js');
const authMiddleware = require('../middleware/auth')

// GET all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET my books (protected)
router.get('/mybooks', authMiddleware, async (req, res) => {
  try {
    const books = await Book.find({ user: req.user.id });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add to my books
router.post('/mybooks', authMiddleware, async (req, res) => {
  const { title, author, status, rating } = req.body;
  try {
    const book = new Book({ title, author, status, rating, user: req.user.id });
    await book.save();
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update book status/rating
router.put('/mybooks/:id', authMiddleware, async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { $set: req.body },
      { new: true }
    );
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
