// backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const booksRoutes = require('./routes/books');
const myBooksRoutes = require('./routes/mybooks');

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// CORS - allow frontend to send cookies
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

// Routes
console.log('authRoutes is:', authRoutes);
app.use('/api/books', require('./routes/books'));

app.use('/api/auth', authRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/mybooks', myBooksRoutes);

// Connect to MongoDB and start server


const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
})
.catch(err => console.error("MongoDB connection error", err));

console.log("MONGO_URI from env:", process.env.MONGO_URI);
