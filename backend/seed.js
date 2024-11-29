const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcrypt');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

const seedUsers = async () => {
    try {
        const hashedPassword = await bcrypt.hash('password123', 10);
        await User.create({
            username: "testuser",
            email: "testuser@example.com",
            password: hashedPassword,
            leaveBalance: 8,
            tasks: ["Complete project report", "Attend team meeting"],
            performanceMetrics: { totalTasks: 10, completedTasks: 7 },
        });
        console.log('User seeded successfully!');
        process.exit();
    } catch (err) {
        console.error('Error seeding user:', err);
        process.exit(1);
    }
};

seedUsers();
