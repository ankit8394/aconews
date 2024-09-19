import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import NewsCard from './NewsCard';

const App = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://gnews.io/api/v4/search?q=${query}&lang=${language}&topic=${category}&apikey=87365cfcf13f3716357a8dfdcf4907e8`
        );
        if (response.data.articles.length === 0) {
          setError('No news articles found. Try a different search term or filter.');
        } else {
          setNews(response.data.articles);
        }
      } catch (error) {
        setError('Failed to fetch news. Check your API key or try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (query || category) {
      fetchNews();
    }
  }, [query, category, language]);

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setError('Please enter a search term.');
      return;
    }
    setQuery(searchTerm);
    setLoading(true);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>News App</h1>
      </header>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search for news..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="filter-container">
        <select value={category} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          <option value="technology">Technology</option>
          <option value="sports">Sports</option>
          <option value="business">Business</option>
          <option value="entertainment">Entertainment</option>
          <option value="health">Health</option>
        </select>

        <select value={language} onChange={handleLanguageChange}>
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
        </select>
      </div>

      {loading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}

      <div className="news-container">
        {news.map((article, index) => (
          <NewsCard key={index} article={article} />
        ))}
      </div>

      {/* Footer */}
      <footer className="app-footer">
        <p>Designed and Developed By Ankit</p>
      </footer>
    </div>
  );
};

export default App;


