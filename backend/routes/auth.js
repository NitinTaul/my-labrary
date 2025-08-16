// // backend/middleware/auth.js
// const jwt = require('jsonwebtoken');

// module.exports = function (req, res, next) {
//   try {
//     const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
//     if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // contains id and email
//     next();
//   } catch (err) {
//     console.error(err);
//     return res.status(401).json({ message: 'Token is not valid' });
//   }
// };


// const token = jwt.sign(
//   { id: user._id, email: user.email },
//   process.env.JWT_SECRET,
//   { expiresIn: '1d' }
// );

// res.cookie('token', token, {
//   httpOnly: true,
//   secure: process.env.NODE_ENV === 'production',
//   sameSite: 'lax'
// });

// res.json({ user: { id: user._id, email: user.email } });

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// =================
// REGISTER ROUTE
// =================
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({ email, password: hashedPassword });

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Send cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });

    res.json({ user: { id: user._id, email: user.email } });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// =================
// LOGIN ROUTE
// =================
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Send cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });

    res.json({ user: { id: user._id, email: user.email } });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// =================
// LOGOUT ROUTE
// =================
// backend/routes/auth.js
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax"
  });
  res.json({ message: "Logged out" });
});

module.exports=router;