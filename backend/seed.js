// seed.js
import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Book from './models/book.js'; // adjust path if needed

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/my-library';

async function seedBooks() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Read the JSON file
    const rawData = fs.readFileSync('./seed/books.json', 'utf-8');
    const jsonData = JSON.parse(rawData);

    // Clear existing books
    await Book.deleteMany({});
    console.log('Old books deleted');

    // Insert the books array from the JSON
    await Book.insertMany(jsonData.books);
    console.log('Books inserted successfully');

    process.exit(0);
  } catch (err) {
    console.error('Error seeding books:', err);
    process.exit(1);
  }
}

seedBooks();
