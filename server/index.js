import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import blogRoutes from './routes/blogRoutes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Increase payload limit for base64 images (up to 10 images)
app.use(express.json({ limit: '150mb' }));
app.use(express.urlencoded({ limit: '150mb', extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Test GPT Connection
app.get('/api/test-gpt-connection', async (req, res) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ status: 'Error', message: 'OPENAI_API_KEY is missing in .env' });
  }

  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch('https://api.openai.com/v1/models', {
      headers: { 'Authorization': `Bearer ${apiKey}` }
    });

    if (response.ok) {
      res.json({ status: 'Success', message: 'API is working! Key is valid.' });
    } else {
      const errorData = await response.json();
      res.status(400).json({ status: 'Error', message: errorData.error?.message || 'Invalid API Key' });
    }
  } catch (error) {
    res.status(500).json({ status: 'Error', message: 'Failed to connect to OpenAI' });
  }
});

// Routes
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/blog', blogRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal server error',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
});

app.listen(PORT, () => {
  console.log(`✅ Calyco API Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
