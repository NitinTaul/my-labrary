// backend/seed/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('../models/Book');
const data = require('./books.json');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(async () => {
  console.log('Connected for seeding');
  await Book.deleteMany({});
  await Book.insertMany(data.books);
  console.log('Seeded books');
  mongoose.disconnect();
})
.catch(err => console.error(err));
