const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err)); 

// Routes
app.use('/api/auth', authRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});
