import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StoryCard from '../components/StoryCard';
import { useAuth } from '../contexts/AuthContext';
import { Navigate, Link } from 'react-router-dom';

const Bookmarks = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchBookmarks();
    }
  }, [user]);

  const fetchBookmarks = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/stories/bookmarks');
      setStories(res.data);
    } catch (err) {
      setError('Failed to fetch bookmarks.');
    } finally {
      setLoading(false);
    }
  };

  const handleBookmarkChange = (storyId, isBookmarked) => {
    if (!isBookmarked) {
      setStories(stories.filter(story => story._id !== storyId));
    }
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="main-content">
      <h2 className="mb-4">Your Bookmarks</h2>
      
      {error && <div className="error-msg">{error}</div>}

      {loading ? (
        <div className="text-center mt-4">Loading bookmarks...</div>
      ) : stories.length === 0 ? (
        <div className="text-center mt-4 text-secondary">
          <p>You haven't bookmarked any stories yet.</p>
          <Link to="/" className="btn-primary mt-4" style={{ display: 'inline-block' }}>
            Browse Stories
          </Link>
        </div>
      ) : (
        <div className="stories-list">
          {stories.map(story => (
            <StoryCard 
              key={story._id} 
              story={story} 
              initialIsBookmarked={true}
              onBookmarkChange={handleBookmarkChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
