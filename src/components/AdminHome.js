import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchBooks, deleteBook } from '../authService';
import { fetchUsers, deleteUser, addUser } from '../api/userApi';

import './AdminHome.css';

function AdminHome() {
    const [books, setBooks] = useState([]);
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ name: '', username: '', email: '', role: '', password: '' });

    const navigate = useNavigate();

    // Fetch books
    useEffect(() => {
        const getBooks = async () => {
            try {
                const response = await fetchBooks();
                setBooks(response.data);
            } catch (error) {
                console.error('Failed to fetch books', error);
            }
        };
        getBooks();
    }, []);

    // Fetch users
    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await fetchUsers();
                setUsers(response.data);
            } catch (error) {
                console.error('Failed to fetch users', error);
            }
        };
        getUsers();
    }, []);

    const handleDeleteBook = async (bookId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this book?');
        if (confirmDelete) {
            try {
                await deleteBook(bookId);
                setBooks(books.filter(book => book._id !== bookId));
                alert('Book deleted successfully');
            } catch (error) {
                console.error('Failed to delete book', error);
                alert('Error deleting book');
            }
        }
    };

    const handleDeleteUser = async (userId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this user?');
        if (confirmDelete) {
            try {
                await deleteUser(userId);
                setUsers(users.filter(user => user._id !== userId));
                alert('User deleted successfully');
            } catch (error) {
                console.error('Failed to delete user', error);
                alert('Error deleting user');
            }
        }
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            await addUser(form);
            const response = await fetchUsers();
            setUsers(response.data);
            setForm({ name: '', username: '', email: '', role: '', password: '' });
            alert('User added successfully');
        } catch (error) {
            console.error('Error adding user:', error);
            alert('Failed to add user');
        }
    };

    return (
        <div className="admin-home">
            <header className="header">
                <h1>Library Management System</h1>
                <div className="profile-icon">A</div>
            </header>
            <main>
                {/* Welcome */}
                <section className="welcome-section">
                    <h2>Welcome Admin!!</h2>
                </section>

                {/* Book Management */}
                <section className="actions-section">
                    <div className="book-list-header">
                        <h3>Book List</h3>
                        <button onClick={() => navigate('/add-book')}>ADD BOOK</button>
                    </div>
                    <div className="book-list">
                        <div className="book-list-headings">
                            <span>Name</span><span>ISBN</span><span>Category</span><span>Quantity</span><span>Available</span><span>Price</span><span>Actions</span>
                        </div>
                        {books.length > 0 ? (
                            books.map((book) => (
                                <div className="book-list-item" key={book._id}>
                                    <span>{book.name}</span>
                                    <span>{book.isbn}</span>
                                    <span>{book.category}</span>
                                    <span>{book.quantity}</span>
                                    <span>{book.available}</span>
                                    <span>{book.price}</span>
                                    <span className="actions">
                                        <button onClick={() => navigate(`/view-book/${book._id}`, { state: { book } })}>View</button>
                                        <button onClick={() => navigate(`/update-book/${book._id}`, { state: { book } })}>Update</button>
                                        <button onClick={() => handleDeleteBook(book._id)}>Delete</button>
                                    </span>
                                </div>
                            ))
                        ) : (
                            <div>No books available</div>
                        )}
                    </div>
                </section>

                {/* User Management */}
            <section className="actions-section">
    <h3>User Management</h3>

    <form className="add-user-form" onSubmit={handleAddUser}>
        <input name="name" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
        <input name="username" placeholder="Username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} required />
        <input name="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
        <input name="password" placeholder="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
        <select name="role" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} required>
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
        </select>
        <button type="submit">Add User</button>
    </form>

    <div className="book-list">
        <div className="book-list-headings">
            <span>Name</span><span>Username</span><span>Email</span><span>Role</span><span>Actions</span>
        </div>
        {users.length > 0 ? (
            users.map((user) => (
                <div className="book-list-item" key={user._id}>
                    {/* ✅ Added fallbacks here */}
                    <span>{user.name || user.username || "N/A"}</span>
                    <span>{user.username || "N/A"}</span>
                    <span>{user.email || "N/A"}</span>
                    <span>{user.role || user.userType || "N/A"}</span>
                    <span>
                        <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
                    </span>
                </div>
            ))
        ) : (
            <div>No users found</div>
        )}
    </div>
</section>
            </main>
        </div>
    );
}

export default AdminHome;
