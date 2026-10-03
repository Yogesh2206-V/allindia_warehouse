import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';

import propertyRoutes from './routes/propertyRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import requirementRoutes from './routes/requirementRoutes.js';
import authRoutes from './routes/authRoutes.js';
import marketplaceRoutes from './routes/marketplaceRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'https://allindiawarehouse.in'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    app: 'All India Warehouse Industrial API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/properties', propertyRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/requirements', requirementRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/marketplace', marketplaceRoutes);

// Root API Welcome
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to All India Warehouse Backend API',
    endpoints: {
      health: 'GET /api/health',
      properties: 'GET /api/properties, POST /api/properties, GET /api/properties/:id',
      inquiries: 'POST /api/inquiries, GET /api/inquiries',
      requirements: 'POST /api/requirements, GET /api/requirements',
      auth: 'POST /api/auth/register, POST /api/auth/login, POST /api/auth/save-property'
    }
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({ success: false, message: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`🚀 All India Warehouse API Server running`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`📡 API Base: http://localhost:${PORT}/api`);
  console.log(`=========================================`);
});
