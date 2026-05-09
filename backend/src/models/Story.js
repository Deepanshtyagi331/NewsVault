const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  hnId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  url: { type: String, required: true },
  points: { type: Number, default: 0 },
  author: { type: String },
  postedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Story', storySchema);
