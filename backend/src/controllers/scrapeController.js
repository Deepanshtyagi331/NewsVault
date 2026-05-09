const { scrapeHackerNews } = require('../utils/scraper');

const triggerScrape = async (req, res) => {
  try {
    const stories = await scrapeHackerNews();
    res.json({ message: 'Scraping successful', stories });
  } catch (error) {
    res.status(500).json({ message: 'Scraping failed', error: error.message });
  }
};

module.exports = { triggerScrape };
