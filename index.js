/**
 * UK Free Will Generator - Backend Server
 */
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const xss = require('xss');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key_change_in_prod';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin2024';

app.use(helmet());
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use('/api/', limiter);
app.use(cors({ origin: process.env.FRONTEND_URL || '*', methods: ['GET', 'POST'] }));

app.post('/webhook', bodyParser.raw({type: 'application/json'}), async (request, response) => {
  response.send();
});

app.use(express.json({ limit: '10mb' }));

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '2h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.get('/api/admin/stats', authenticateToken, (req, res) => {
  res.json({
    totalWills: 1248,
    totalRevenue: 3420,
    conversionRate: 18.5,
    emailList: 890,
    recentActivity: []
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', uptime: process.uptime() });
});

app.listen(PORT, () => {
  console.log(`Secure Server running on port ${PORT}`);
});