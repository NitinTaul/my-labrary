// backend/models/Book.js
const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  coverImage: String,
  availability: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Book', BookSchema);
