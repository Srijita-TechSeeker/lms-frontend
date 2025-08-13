import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './AdminSidebar.css';

function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token or any auth-related data from localStorage/sessionStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userType'); // if stored
    alert('You are successfully logged out!');
    navigate('/'); // Redirect to home page
  };
  return (
    <div className="sidebar">
      <h2>📚 LMS Admin</h2>
      <nav>
        <NavLink to="/admin-home" activeClassName="active">Dashboard</NavLink>
        <NavLink to="/add-book" activeClassName="active">Add Book</NavLink>
        <NavLink to="/user-list" activeClassName="active">User List</NavLink>
        <NavLink to="/add-user" activeClassName="active">Add User</NavLink>
        <NavLink to="/issue-book" activeClassName="active">Issue Book</NavLink>
        <NavLink to="/issued-list" activeClassName="active">Issued Records</NavLink>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </nav>
    </div>
  );
}

export default AdminSidebar;
