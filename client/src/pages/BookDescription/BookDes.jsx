import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GetBook } from "../../apicalls/books";
import "./BookDes.css";
const BookDes = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await GetBook(bookId);
        if (response.success) {
          setBook(response.data);
        } else {
          console.error(response.message);
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (bookId) {
      fetchBookDetails();
    }
  }, [bookId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!book) {
    return <p>Book not found.</p>;
  }
  const { title, author, image } = book;

  return (
    <div className=" container">
      <div className="book-heading">
        <h1> {book.title}</h1>
      </div>
      <div className="book-img">
        <img src={image} alt={title} className="book-image" />
      </div>
      <div className="book-description">
      <p> {book.description}</p>
      </div>
      <p>Author: {book.author}</p>
      <p>Category: {book.category}</p>
      <p>Publisher: {book.publisher}</p>
      <p>Published Year: {book.publishedYear}</p>
    </div>
  );
};

export default BookDes;
