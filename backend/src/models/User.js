const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    lowercase: true
  },
  password: { 
    type: String, 
    required: true 
  },
  bookmarkedStories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Story'
  }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
