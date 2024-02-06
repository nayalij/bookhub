import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BookDisplay from '../BookDisplay/BookDisplay';
import { GetAllBooks } from '../../apicalls/books';
import './Home.css'
const Home = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetAllBooks();
        if (response.success) {
          setBooks(response.data);
        } else {
          console.error(response.message);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home-page">
      <h1>All Books</h1>
      <div className="book-container">
        {books.map((book) => (
          <Link key={book._id} to={`/book/${book._id}`} className="link-style">
            <BookDisplay book={book} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
