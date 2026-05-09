const Story = require('../models/Story');
const User = require('../models/User');

const getStories = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const stories = await Story.find()
      .sort({ points: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Story.countDocuments();

    res.json({
      stories,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalStories: total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const getStoryById = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }
    res.json(story);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const toggleBookmark = async (req, res) => {
  try {
    const storyId = req.params.id;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

    const isBookmarked = user.bookmarkedStories.includes(storyId);

    if (isBookmarked) {
      user.bookmarkedStories = user.bookmarkedStories.filter(
        id => id.toString() !== storyId
      );
    } else {
      user.bookmarkedStories.push(storyId);
    }

    await user.save();
    
    res.json({ 
      message: isBookmarked ? 'Bookmark removed' : 'Bookmark added',
      bookmarkedStories: user.bookmarkedStories 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const getBookmarkedStories = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate({
      path: 'bookmarkedStories',
      options: { sort: { points: -1 } }
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.bookmarkedStories);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getStories, getStoryById, toggleBookmark, getBookmarkedStories };
