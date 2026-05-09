import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StoryCard from '../components/StoryCard';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { user } = useAuth();
  const [scraping, setScraping] = useState(false);

  useEffect(() => {
    fetchStories();
  }, [page]);

  const fetchStories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/stories?page=${page}&limit=10`);
      setStories(res.data.stories);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      setError('Failed to fetch stories.');
    } finally {
      setLoading(false);
    }
  };

  const handleScrape = async () => {
    setScraping(true);
    try {
      await axios.post('/scrape');
      fetchStories();
    } catch (err) {
      setError('Failed to trigger scrape.');
    } finally {
      setScraping(false);
    }
  };

  const isBookmarked = (storyId) => {
    if (!user || !user.bookmarkedStories) return false;
    return user.bookmarkedStories.includes(storyId);
  };

  return (
    <div className="main-content">
      <div className="flex justify-between items-center mb-4">
        <h2>Top Stories</h2>
        <button 
          onClick={handleScrape} 
          disabled={scraping}
          className="btn-primary"
        >
          {scraping ? 'Scraping...' : 'Refresh Latest Stories'}
        </button>
      </div>

      {error && <div className="error-msg">{error}</div>}

      {loading ? (
        <div className="text-center mt-4">Loading stories...</div>
      ) : (
        <>
          <div className="stories-list">
            {stories.map(story => (
              <StoryCard 
                key={story._id} 
                story={story} 
                initialIsBookmarked={isBookmarked(story._id)} 
              />
            ))}
          </div>
          
          <div className="pagination">
            <button 
              className="page-btn" 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <span className="page-info">
              Page {page} of {totalPages}
            </span>
            <button 
              className="page-btn"
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
