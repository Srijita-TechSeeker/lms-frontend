import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewBooks.css';

function ViewBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get('https://lms-backend-api-eywh.onrender.com/api/books');
        setBooks(res.data);
      } catch (err) {
        console.error('Failed to load books', err);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="view-books-container">
      <h2>📚 Available Books</h2>
      <div className="book-grid">
        {books.length === 0 ? (
          <p>No books available.</p>
        ) : (
          books.map((book) => (
            <div key={book._id} className="book-card">
              <img
                src={book.image || 'https://via.placeholder.com/150'}
                alt={book.name}
                className="book-image"
              />
              <h3>{book.name}</h3>
              <p><strong>Author:</strong> {book.author || 'Unknown'}</p>
              <p><strong>ISBN:</strong> {book.isbn}</p>
              <p><strong>Category:</strong> {book.category}</p>
              <p><strong>Available:</strong> {book.available}</p>
              <p><strong>Description:</strong> {book.description || 'No description provided.'}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ViewBooks;
