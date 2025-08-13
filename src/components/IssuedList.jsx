import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './IssuedList.css';

function IssuedList() {
  const [issued, setIssued] = useState([]);

  useEffect(() => {
    const fetchIssued = async () => {
      try {
        const res = await axios.get('https://lms-backend-api-eywh.onrender.com/api/issue/issued-books');
        setIssued(res.data);
      } catch (err) {
        console.error('Failed to load issued books', err);
      }
    };
    fetchIssued();
  }, []);

  // Fine calculation: ₹10 per day after dueDate
  const calculateFine = (dueDate, returnDate) => {
    const due = new Date(dueDate);
    const returned = returnDate ? new Date(returnDate) : new Date();
    const daysLate = Math.ceil((returned - due) / (1000 * 60 * 60 * 24));
    return daysLate > 0 ? daysLate * 10 : 0;
  };

  return (
    <div className="issued-list-container">
      <h2>📋 Issued Book Records</h2>
      {issued.length === 0 ? (
        <p>No issued records found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Book</th>
              <th>Issue Date</th>
              <th>Due Date</th>
              <th>Return Date</th>
              <th>Status</th>
              <th>Fine (₹)</th>
            </tr>
          </thead>
          <tbody>
            {issued.map((item) => (
              <tr key={item._id}>
                <td>{item.userId?.username || 'N/A'}</td>
                <td>{item.bookId?.name || 'N/A'}</td>
                <td>{new Date(item.issueDate).toLocaleDateString()}</td>
                <td>{new Date(item.dueDate).toLocaleDateString()}</td>
                <td>{item.returnDate ? new Date(item.returnDate).toLocaleDateString() : '-'}</td>
                <td className={item.status === 'returned' ? 'status returned' : 'status issued'}>
                  {item.status}
                </td>
                <td>{calculateFine(item.dueDate, item.returnDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default IssuedList;
