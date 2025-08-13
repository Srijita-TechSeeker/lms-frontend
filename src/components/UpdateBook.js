import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { updateBook } from '../authService';
import './UpdateBook.css';

function UpdateBook() {
    const { state } = useLocation();
    const { book } = state || {};
    const [updatedBook, setUpdatedBook] = useState(book || {});
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (book) {
            setUpdatedBook(book);
        }
    }, [book]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedBook((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateBook(id, updatedBook);
            alert('Updated successfully');
            navigate('/admin-home');
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };

    return (
        <div className="update-book-container">
            <h2>Update Book Details</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={updatedBook.name || ''} onChange={handleChange} required />
                </label>
                <label>
                    ISBN:
                    <input type="text" name="isbn" value={updatedBook.isbn || ''} onChange={handleChange} required />
                </label>
                <label>
                    Category:
                    <input type="text" name="category" value={updatedBook.category || ''} onChange={handleChange} required />
                </label>
                <label>
                    Author:
                    <input type="text" name="author" value={updatedBook.author || ''} onChange={handleChange} required />
                </label>
                <label>
                    Description:
                    <textarea name="description" value={updatedBook.description || ''} onChange={handleChange} required />
                </label>
                <label>
                    Price:
                    <input type="number" name="price" value={updatedBook.price || ''} onChange={handleChange} required />
                </label>
                <label>
                    Quantity:
                    <input type="number" name="quantity" value={updatedBook.quantity || ''} onChange={handleChange} required />
                </label>
                <label>
                    Image:
                    <input type="text" name="image" value={updatedBook.image || ''} onChange={handleChange} required />
                </label>
                <button type="submit">Update</button>
                <button type="button" onClick={() => navigate('/admin-home')}>Cancel</button>
            </form>
        </div>
    );
}

export default UpdateBook;
