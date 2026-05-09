const express = require('express');
const { getStories, getStoryById, toggleBookmark, getBookmarkedStories } = require('../controllers/storyController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/', getStories);
router.get('/bookmarks', authMiddleware, getBookmarkedStories);
router.get('/:id', getStoryById);
router.post('/:id/bookmark', authMiddleware, toggleBookmark);

module.exports = router;
