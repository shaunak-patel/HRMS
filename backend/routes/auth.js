const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    console.log('Incoming Request Body:', req.body); // Log incoming data for debugging

    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
        console.error('Signup Error:', error); // Log detailed error

        if (error.code === 11000) {
            // Handle duplicate email or username
            res.status(400).json({ error: 'Email or username already exists' });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Validate password
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });

        // Generate JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token, userId: user._id });
    } catch (error) {
        console.error('Login Error:', error); // Log detailed error
        res.status(500).json({ error: 'Error logging in' });
    }
});

// Get Current User Route
router.get('/me', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Extract token
        if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password'); // Exclude password
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

