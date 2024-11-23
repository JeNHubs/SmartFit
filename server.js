const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.log("MongoDB connection error: ", err);
    process.exit(1); // Exit if MongoDB connection fails
  });


// User Model (Example Schema)
const User = require('./models/User'); // Assuming this is in a separate file


// Handle Sign-up (with password hashing)
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  console.log('Signup request received:', req.body); // Debugging log

  // Basic validation
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Email already exists:', email); // Debugging log
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash password before saving the user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    console.log('User created successfully:', newUser); // Debugging log
    res.json({ success: true, message: 'User registered successfully',  userEmail: newUser.email });
  } catch (error) {
    console.error('Signup Error:', error); // Log detailed error
    res.status(500).json({ error: 'Signup failed. Please try again later.' });
  }
});

// Handle Sign-in (with password comparison using bcrypt)
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });

    // If no user found, return error
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Compare entered password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);


    // If passwords match, respond with success
    if (isMatch) {
      res.json({ success: true, message: 'Login successful' , userEmail: user.email });
    } else {
      res.status(400).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
