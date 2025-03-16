import 'dotenv/config';
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy (required for rate limiting to work properly)
app.set('trust proxy', 1);

// Middleware
app.use(cors());
app.use(express.json());

// Rate limiter (limits requests to 10 per minute per IP)
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10,
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
  // Ensure proper IP detection
  keyGenerator: (req) => {
    return req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  }
});

app.use('/api/chat', limiter);

// Proxy OpenRouter requests
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: "google/gemini-2.0-flash-thinking-exp:free",
        messages
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));