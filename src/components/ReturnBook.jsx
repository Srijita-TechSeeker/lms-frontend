// 📁 src/components/ReturnBook.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ReturnBook.css';

function ReturnBook() {
  const [issuedBooks, setIssuedBooks] = useState([]);

  useEffect(() => {
    const fetchIssued = async () => {
      try {
        const res = await axios.get('https://lms-backend-api-eywh.onrender.com/api/issue/all');
        const filtered = res.data.filter((entry) => entry.status === 'issued');
        setIssuedBooks(filtered);
      } catch (err) {
        console.error('Failed to load issued books', err);
      }
    };
    fetchIssued();
  }, []);

  const handleReturn = async (id) => {
    try {
      await axios.post('https://lms-backend-api-eywh.onrender.com/api/issue/return-book', { issueId: id });
      alert('Book returned successfully');
      setIssuedBooks((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      alert('Return failed');
    }
  };

  return (
    <div className="return-book-container">
      <h2>🔄 Return Book</h2>
      {issuedBooks.length === 0 ? (
        <p>No issued books to return.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Book</th>
              <th>Issue Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {issuedBooks.map((item) => (
              <tr key={item._id}>
                <td>{item.userId.username}</td>
                <td>{item.bookId.name}</td>
                <td>{new Date(item.issueDate).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleReturn(item._id)}>Return</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ReturnBook;
