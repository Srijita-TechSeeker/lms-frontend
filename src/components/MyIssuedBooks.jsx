import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyIssuedBooks.css';
import { useNavigate } from 'react-router-dom';

function MyIssuedBooks() {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // Must be set during login

  useEffect(() => {
    const fetchIssuedBooks = async () => {
      try {
        const res = await axios.get(`https://lms-backend-api-eywh.onrender.com/api/issue/user/${userId}`);
        setIssuedBooks(res.data);
      } catch (err) {
        console.error('Error fetching issued books', err);
        alert('Failed to fetch issued books. Please try again later.');
      }
    };

    if (userId) {
      fetchIssuedBooks();
    }
  }, [userId]);

  const handleReturn = async (issueId) => {
    try {
      await axios.post('https://lms-backend-api-eywh.onrender.com/api/issue/return-book', { issueId });
      alert('Book returned successfully!');
      setIssuedBooks((prev) =>
        prev.map((book) =>
          book._id === issueId
            ? { ...book, status: 'returned', returnDate: new Date().toISOString() }
            : book
        )
      );
    } catch (err) {
      console.error('Error returning book', err);
      alert('Failed to return book.');
    }
  };
  const calculateFine = (dueDate, returnDate) => {
  if (!returnDate || !dueDate) return 0;
  const diff = new Date(returnDate) - new Date(dueDate);
  const daysLate = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return daysLate > 0 ? daysLate * 10 : 0; // ₹10 per day
};
  return (
    <div className="issued-books-page">
      <header className="issued-header">
        <h2>📚 My Borrowed Books</h2>
        <button className="back-button" onClick={() => navigate('/user-home')}>← Back to Home</button>
      </header>

      <div className="issued-table-container">
        <table className="issued-table">
          <thead>
            <tr>
              <th>Book Name</th>
              <th>ISBN</th>
              <th>Issue Date</th>
              <th>Return Date</th>
              <th>Status</th>
              <th>Fine</th> 
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {issuedBooks.length > 0 ? (
              issuedBooks.map((item) => (
                <tr key={item._id}>
                  <td>{item.bookId?.name || 'N/A'}</td>
                  <td>{item.bookId?.isbn || 'N/A'}</td>
                  <td>{new Date(item.issueDate).toLocaleDateString()}</td>
                  <td>{item.returnDate ? new Date(item.returnDate).toLocaleDateString() : 'Not Returned'}</td>
                  <td>{item.status}</td>
                  <td>₹{calculateFine(item.dueDate, item.returnDate)}</td>
                  <td>
                    {item.status === 'issued' ? (
                      <button className="return-button" onClick={() => handleReturn(item._id)}>Return</button>
                    ) : (
                      <span className="returned-label">Returned</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No books issued.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyIssuedBooks;
