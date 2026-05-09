import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const StoryCard = ({ story, initialIsBookmarked, onBookmarkChange }) => {
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleBookmarkToggle = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`/stories/${story._id}/bookmark`);
      setIsBookmarked(!isBookmarked);
      if (onBookmarkChange) {
        onBookmarkChange(story._id, !isBookmarked);
      }
    } catch (error) {
      console.error('Failed to toggle bookmark', error);
    } finally {
      setLoading(false);
    }
  };

  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours === 1) return '1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  return (
    <div className="story-card">
      <div className="story-points">
        <span>{story.points}</span>
        <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>pts</span>
      </div>
      <div className="story-content">
        <h3 className="story-title">
          <a href={story.url} target="_blank" rel="noopener noreferrer">
            {story.title}
          </a>
        </h3>
        <div className="story-meta">
          <span>by <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{story.author}</span></span>
          <span>•</span>
          <span>{timeAgo(story.postedAt)}</span>
        </div>
      </div>
      <div className="story-actions">
        <button 
          className={`bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
          onClick={handleBookmarkToggle}
          disabled={loading}
          title={isBookmarked ? "Remove bookmark" : "Add bookmark"}
        >
          {isBookmarked ? '★' : '☆'}
        </button>
      </div>
    </div>
  );
};

export default StoryCard;
