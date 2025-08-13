// 📁 src/components/UserSidebar.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './UserSidebar.css'; // You can reuse or tweak AdminSidebar.css

function UserSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userId');
    alert('You are successfully logged out!');
    navigate('/');
  };

  return (
    <div className="sidebar">
      <h2>👤 LMS User</h2>
      <nav>
        <NavLink to="/user-home" activeClassName="active">Home</NavLink>
        <NavLink to="/my-issued-books" activeClassName="active">My Issued Books</NavLink>
        <NavLink to="/view-books" activeClassName="active">View All Books</NavLink>
      </nav>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default UserSidebar;
