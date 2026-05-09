require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const { scrapeHackerNews } = require('./src/utils/scraper');

const authRoutes = require('./src/routes/authRoutes');
const storyRoutes = require('./src/routes/storyRoutes');
const scrapeRoutes = require('./src/routes/scrapeRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/scrape', scrapeRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Hacker News Scraper API is running');
});

// Start server
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  
  // Scraper must run automatically on server start
  try {
    await scrapeHackerNews();
  } catch (error) {
    console.error('Initial scraping failed:', error.message);
  }
});
