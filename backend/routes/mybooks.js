// backend/routes/mybooks.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const MyBook = require('../models/MyBook');

// GET /api/mybooks - get user's books
router.get('/', auth, async (req, res) => {
  try {
    // populate book details
    const mybooks = await MyBook.find({ userId: req.user.id }).populate('bookId');
    res.json({ mybooks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/mybooks/:bookId - add book to user's list
router.post('/:bookId', auth, async (req, res) => {
  try {
    const { bookId } = req.params;
    const existing = await MyBook.findOne({ userId: req.user.id, bookId });
    if (existing) return res.status(400).json({ message: 'Book already in your list' });

    const mybook = new MyBook({ userId: req.user.id, bookId, status: 'Want to Read' });
    await mybook.save();
    res.status(201).json({ mybook });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH /api/mybooks/:bookId/status - update reading status
router.patch('/:bookId/status', auth, async (req, res) => {
  try {
    const { bookId } = req.params;
    const { status } = req.body;
    const mybook = await MyBook.findOneAndUpdate(
      { userId: req.user.id, bookId },
      { status },
      { new: true }
    ).populate('bookId');
    res.json({ mybook });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH /api/mybooks/:bookId/rating - update rating
router.patch('/:bookId/rating', auth, async (req, res) => {
  try {
    const { bookId } = req.params;
    const { rating } = req.body;
    const mybook = await MyBook.findOneAndUpdate(
      { userId: req.user.id, bookId },
      { rating },
      { new: true }
    ).populate('bookId');
    res.json({ mybook });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
