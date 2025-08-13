import React, { useEffect, useState } from "react";
import { fetchUsers, deleteUser } from "../api/userApi";
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    try {
      const res = await fetchUsers();
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        loadUsers();
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="user-list-container">
      <h2>User List</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((u) => (
              <tr key={u._id}>
                {/* Use username if name is missing */}
                <td>{u.name || u.username || "N/A"}</td>
                <td>{u.username || "N/A"}</td>
                <td>{u.email || "N/A"}</td>
                {/* Show role or fallback to userType */}
                <td>{u.role || u.userType || "N/A"}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(u._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
