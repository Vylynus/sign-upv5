require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    bio: { type: String, default: '' }
});

const User = mongoose.model('User', userSchema);

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.redirect('/login.html');
    }
};

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/signup', async (req, res) => {
    try {
        const { email, password, username } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = new User({
            email,
            password: hashedPassword,
            username
        });
        
        await user.save();
        res.redirect('/login.html');
    } catch (error) {
        res.status(400).json({ error: 'Signup failed' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (user && await bcrypt.compare(password, user.password)) {
            req.session.userId = user._id;
            res.redirect('/profile.html');
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Login failed' });
    }
});

app.get('/api/profile', isAuthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.session.userId).select('-password');
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: 'Failed to fetch profile' });
    }
});

app.post('/api/profile', isAuthenticated, async (req, res) => {
    try {
        const { username, bio } = req.body;
        await User.findByIdAndUpdate(req.session.userId, { username, bio });
        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Failed to update profile' });
    }
});

app.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 