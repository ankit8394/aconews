import { useState, useEffect } from 'react';
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
      if (!query && !category) return;
      setLoading(true);
      setError(null);

      try {
        let url = `https://gnews.io/api/v4/search?lang=${language}&apikey=87365cfcf13f3716357a8dfdcf4907e8`;

        if (query) {
          url += `&q=${query}`;
        } else if (category) {
          url += `&q=${category}`; // GNews does not allow topic in /search, so we use category as a keyword
        }

        const { data } = await axios.get(url);

        if (data.articles.length === 0) {
          setError('No news articles found. Try a different search or filter.');
        } else {
          setNews(data.articles);
        }
      } catch {
        setError('Failed to fetch news. Check your API key or try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [query, category, language]);

  const handleSearch = () => {
    setSearchTerm(searchTerm.toUpperCase());
    if (searchTerm.trim()) {
      setQuery(searchTerm.trim());
      setCategory(''); // clear category if searching
      setError(null);
    } else {
      setError('Please enter a search term.');
    }
  };

  return (
    <div className="app">
      <header className="app-header"><h1>News App</h1></header>

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
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setQuery('');
            setSearchTerm('');
          }}
        >
          <option value="">All Categories</option>
          {['technology', 'sports', 'business', 'entertainment', 'health'].map(cat => (
            <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
          ))}
        </select>

        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          {[
            { code: 'en', name: 'English' },
            { code: 'hi', name: 'Hindi' },
            { code: 'es', name: 'Spanish' },
            { code: 'fr', name: 'French' },
            { code: 'de', name: 'German' }
          ].map(lang => (
            <option key={lang.code} value={lang.code}>{lang.name}</option>
          ))}
        </select>
      </div>

      {loading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}

      <div className="news-container" style={{ paddingBottom: "70px" }}>
        {news.map((article, index) => (
          <NewsCard key={index} article={article} />
        ))}
      </div>

      <footer className="app-footer">
        <p>Designed and Developed By Ankit</p>
      </footer>
    </div>
  );
};

export default App;
