const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { JWT_SECRET, requireAuth } = require('../middleware/auth');
const { authLimiter } = require('../middleware/security');

// In-memory demo users store (pre-hashed with bcrypt)
const defaultHash = bcrypt.hashSync('password123', 10);
const adminHash = bcrypt.hashSync('admin123', 10);

const users = [
  {
    id: 'usr-1',
    name: 'Traveler Demo',
    email: 'demo@flyjatri.com',
    password: defaultHash,
    phone: '+880 1712 345678',
    role: 'user'
  },
  {
    id: 'usr-admin',
    name: 'Admin Manager',
    email: 'admin@flyjatri.com',
    password: adminHash,
    phone: '+880 1321 060476',
    role: 'admin'
  }
];

// Register with Salted Password Hashing
router.post('/register', authLimiter, async (req, res) => {
  try {
    let { name, email, password, phone } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide full name, email, and password.' });
    }

    name = String(name).trim();
    email = String(email).trim().toLowerCase();

    // Input validations
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }

    if (String(password).length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long.' });
    }

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
    }

    // Hash password with 10 salt rounds
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      id: `usr-${Date.now()}`,
      name,
      email,
      password: hashedPassword,
      phone: phone ? String(phone).trim() : '',
      role: 'user',
      createdAt: new Date().toISOString()
    };
    users.push(newUser);

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const { password: _, ...userSafe } = newUser;

    res.status(201).json({
      success: true,
      message: 'Account created successfully!',
      token,
      user: userSafe
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ success: false, message: 'Internal server error during registration.' });
  }
});

// Login with Secure Password Verification
router.post('/login', authLimiter, async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    email = String(email).trim().toLowerCase();
    const user = users.find(u => u.email === email);

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    // Verify hashed password
    const isMatch = await bcrypt.compare(String(password), user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const { password: _, ...userSafe } = user;

    res.json({
      success: true,
      message: 'Welcome back!',
      token,
      user: userSafe
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Internal server error during login.' });
  }
});

// Protected Profile Endpoint
router.get('/me', requireAuth, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User profile not found.' });
  }
  const { password: _, ...userSafe } = user;
  res.json({ success: true, user: userSafe });
});

module.exports = router;
