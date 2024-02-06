// BookDisplay.jsx

import React from 'react';
import './BookDisplay.css';

const BookDisplay = ({ book }) => {
  const { title, author, image } = book;

  return (
    
      <div className="book-card">
        <img src={image} alt={title} className="book-image" />
       
          <h3 className="book-title">{title}</h3>
          <p className="author-name">By {author}</p>
       
      
    </div>
  );
};

export default BookDisplay;
