import React from 'react';
import './NewsCard.css';

const NewsCard = ({ article }) => {
  const { title, description, image, url, publishedAt, source } = article;

  return (
    <div className="news-card">
      {image && (
        <img src={image} alt="News" className="news-image" />
      )}
      <div className="news-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <p className="news-source">
          <strong>{source.name}</strong> - {new Date(publishedAt).toDateString()}
        </p>
        <a href={url} target="_blank" rel="noopener noreferrer">
          Read more
        </a>
      </div>
    </div>
  );
};

export default NewsCard;
