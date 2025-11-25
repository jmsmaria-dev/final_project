// Final Project API (JWT + MongoDB, Charts)

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { connectDB } = require('./models/db');
const Chart = require('./models/Chart');
const { seedCharts } = require('./models/seed');

const app = express();
const PORT = 3000; // Requirement: backend runs on port 3000

// Configurable first name credential (defaults to "Maria")
const FIRST_NAME = process.env.FIRST_NAME || 'Maria';
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

// CORS - allow all origins by default; tighten in production
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// JWT auth middleware
function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'] || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
        return res.status(401).json({ error: 'Missing Bearer token' });
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = payload;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}

// Routes
app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'final-project-api' }));

app.get('/api/info', (req, res) => {
    res.json({
        app: 'M80 - Generative AI Innovations',
        endpoints: {
            'POST /api/login': 'Login with first name credentials to receive JWT',
            'GET /api/charts/:key': 'Get chart dataset (keys: summary, reports) - requires Bearer token'
        }
    });
});

// Auth - simplified per assignment
app.post('/api/login', (req, res) => {
    const { username, password } = req.body || {};
    if (!username || !password) {
        return res.status(400).json({ error: 'username and password are required' });
    }
    if (username !== FIRST_NAME || password !== FIRST_NAME) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ sub: username }, JWT_SECRET, { expiresIn: '2h' });
    res.json({ token, user: { name: username }, expiresIn: 7200 });
});

// Charts - protected
app.get('/api/charts/:key', authMiddleware, async (req, res) => {
    const { key } = req.params;
    if (!['summary', 'reports'].includes(key)) {
        return res.status(404).json({ error: 'Unknown chart key' });
    }
    const doc = await Chart.findOne({ key });
    if (!doc) return res.status(404).json({ error: 'Chart not found' });
    res.json({
        key: doc.key,
        title: doc.title,
        description: doc.description,
        datasetLabel: doc.datasetLabel,
        data: doc.data
    });
});

async function start() {
    try {
        const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/final_project';
        await connectDB(uri);
        await seedCharts();
        app.listen(PORT, () => {
            console.log(`API served at http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
}

start();