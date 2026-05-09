const axios = require('axios');
const cheerio = require('cheerio');
const Story = require('../models/Story');

const scrapeHackerNews = async () => {
  try {
    const { data } = await axios.get('https://news.ycombinator.com/');
    const $ = cheerio.load(data);
    
    const stories = [];
    const rows = $('.athing').slice(0, 10);
    
    rows.each((i, el) => {
      const titleElement = $(el).find('.titleline > a');
      const title = titleElement.text();
      let url = titleElement.attr('href');
      
      // If it's an internal HN link, make it absolute
      if (url.startsWith('item?id=')) {
        url = `https://news.ycombinator.com/${url}`;
      }

      const subtext = $(el).next().find('.subtext');
      const pointsText = subtext.find('.score').text();
      const points = pointsText ? parseInt(pointsText, 10) : 0;
      
      const author = subtext.find('.hnuser').text();
      const postedAtText = subtext.find('.age').attr('title') || new Date().toISOString();
      const postedAt = new Date(postedAtText);
      
      const hnId = $(el).attr('id');

      stories.push({
        hnId,
        title,
        url,
        points,
        author,
        postedAt
      });
    });

    for (const story of stories) {
      // Upsert to handle existing stories
      await Story.findOneAndUpdate(
        { hnId: story.hnId },
        { ...story },
        { upsert: true, new: true }
      );
    }
    
    console.log('Successfully scraped top 10 HN stories.');
    return stories;
  } catch (error) {
    console.error('Error scraping Hacker News:', error.message);
    throw error;
  }
};

module.exports = { scrapeHackerNews };
