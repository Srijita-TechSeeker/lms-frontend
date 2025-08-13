// 📁 src/components/IssueBook.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './IssueBook.css';

function IssueBook() {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedBook, setSelectedBook] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const userRes = await axios.get('https://lms-backend-api-eywh.onrender.com/api/users');
      const bookRes = await axios.get('https://lms-backend-api-eywh.onrender.com/api/books');
      setUsers(userRes.data);
      setBooks(bookRes.data);
    };
    fetchData();
  }, []);

  const handleIssue = async () => {
    if (!selectedUser || !selectedBook) {
      alert('Please select both user and book.');
      return;
    }
    try {
      await axios.post('https://lms-backend-api-eywh.onrender.com/api/issue/issue-book', {
        userId: selectedUser,
        bookId: selectedBook,
      });
      alert('Book issued successfully');
    } catch (err) {
      alert('Error issuing book');
      console.error(err);
    }
  };

  return (
    <div className="issue-book-container">
      <h2>📚 Issue Book</h2>
      <div className="form-grid">
        <div className="form-group">
          <label>Select User:</label>
          <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
            <option value="">-- Select User --</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>{user.username}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Select Book:</label>
          <select value={selectedBook} onChange={(e) => setSelectedBook(e.target.value)}>
            <option value="">-- Select Book --</option>
            {books.filter(book => book.available > 0).map((book) => (
              <option key={book._id} value={book._id}>{book.name} (Available: {book.available})</option>
            ))}
          </select>
        </div>

        <button className="issue-button" onClick={handleIssue}>Issue Book</button>
      </div>
    </div>
  );
}

export default IssueBook;
