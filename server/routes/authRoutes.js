const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'flyjatri_secret_key_2026';

// In-memory demo users store
const users = [
  {
    id: 'usr-1',
    name: 'Traveler Demo',
    email: 'demo@flyjatri.com',
    password: 'password123',
    phone: '+880 1712 345678',
    role: 'user'
  },
  {
    id: 'usr-admin',
    name: 'Admin Manager',
    email: 'admin@flyjatri.com',
    password: 'admin123',
    phone: '+880 1321 060476',
    role: 'admin'
  }
];

// Register
router.post('/register', (req, res) => {
  const { name, email, password, phone } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide name, email, and password.' });
  }

  const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'Email already registered.' });
  }

  const newUser = {
    id: `usr-${Date.now()}`,
    name,
    email,
    password,
    phone: phone || '',
    role: 'user'
  };
  users.push(newUser);

  const token = jwt.sign({ id: newUser.id, email: newUser.email, role: newUser.role }, JWT_SECRET, { expiresIn: '7d' });
  const { password: _, ...userSafe } = newUser;

  res.status(201).json({
    success: true,
    message: 'Registration successful!',
    token,
    user: userSafe
  });
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password required.' });
  }

  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid email or password.' });
  }

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
  const { password: _, ...userSafe } = user;

  res.json({
    success: true,
    message: 'Welcome back!',
    token,
    user: userSafe
  });
});

// Get current profile
router.get('/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No authorization token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = users.find(u => u.id === decoded.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const { password: _, ...userSafe } = user;
    res.json({ success: true, user: userSafe });
  } catch (err) {
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
});

module.exports = router;
