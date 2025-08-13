import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchBooks, issueBook } from '../authService';
import './UserHome.css';

function UserHome() {
    const [books, setBooks] = useState([]);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const getBooks = async () => {
            try {
                const response = await fetchBooks();
                console.log('Books fetched:', response.data);
                setBooks(response.data);
            } catch (error) {
                console.error('Failed to fetch books', error);
                alert('Failed to fetch books. Please try again later.');
            }
        };

        getBooks();
    }, []);

    const handleBorrow = async (bookId) => {
        const userId = localStorage.getItem('userId');

        const book = books.find(b => b._id === bookId);
        if (!book) return alert("Book not found");
        // FIX: Check 'available' property, not 'quantity'
        if (book.available <= 0) return alert("Book is currently unavailable");

        try {
            const response = await issueBook(userId, bookId);
            alert(response.message || "Book issued successfully!");

            setBooks(prev =>
                // FIX: Decrement 'available' property, not 'quantity'
                prev.map(b => b._id === bookId ? { ...b, available: b.available - 1 } : b)
            );
        } catch (err) {
            console.error("Issue failed", err);
            // This will show the actual error message from the backend
            alert("Error issuing book: " + (err.response?.data?.message || err.message));
        }
    };

    const filteredBooks = books.filter((book) =>
        [book.name, book.isbn, book.category]
            .some(field =>
                field?.toLowerCase().includes(searchQuery.toLowerCase())
            )
    );

    return (
        <div className="user-home">
            <header className="header">
                <h1>Library Management System</h1>
                <div className="profile-icon">U</div>
            </header>

            {sidebarVisible && (
                <div className="user-sidebar">
                    <button onClick={() => setSidebarVisible(false)}>Close ✖</button>
                    <ul>
                        <li onClick={() => navigate('/view-books')}>📚 View Books</li>
                        <li onClick={() => navigate('/my-issued-books')}>📖 My Issued</li>
                        <li onClick={() => {
                            localStorage.clear();
                            navigate('/');
                        }}>🚪 Logout</li>
                    </ul>
                </div>
            )}

            <main>
                <section className="welcome-section">
                    <div className="welcome-row">
                        <button className="hamburger" onClick={() => setSidebarVisible(!sidebarVisible)}>☰</button>
                        <h2>Welcome User!</h2>
                    </div>
                </section>

                <section className="book-section">
                    <div className="book-list-header">
                        <h3>Available Books</h3>
                    </div>

                    <div className="search-container">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            placeholder="Search by name, ISBN, or category..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                    </div>

                    <div className="book-list">
                        <button className="my-borrowed-books-button" onClick={() => navigate('/my-issued-books')}>
                            My Borrowed Books
                        </button>

                        <div className="book-list-headings">
                            <span>Name</span>
                            <span>ISBN</span>
                            <span>Category</span>
                            <span>Quantity</span>
                            <span>Available</span>
                            <span>Price</span>
                            <span>Actions</span>
                        </div>

                        {filteredBooks.length > 0 ? (
                            filteredBooks.map((book) => (
                                <div className="book-list-item" key={book._id}>
                                    <span>{book.name}</span>
                                    <span>{book.isbn}</span>
                                    <span>{book.category}</span>
                                    <span>{book.quantity}</span>
                                    <span>{book.available}</span>
                                    <span>{book.price}</span>
                                    <span className="actions">
                                        <button
                                            className="action-button"
                                            onClick={() => navigate(`/view-book/${book._id}`, { state: { book } })}
                                        >
                                            View
                                        </button>
                                        <button
                                            className="action-button"
                                            onClick={() => handleBorrow(book._id)}
                                            // FIX: Disable if 'available' is 0
                                            disabled={book.available === 0}
                                        >
                                            Borrow
                                        </button>
                                    </span>
                                </div>
                            ))
                        ) : (
                            <div>No books found</div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default UserHome;