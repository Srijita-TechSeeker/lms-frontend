import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBookById } from '../authService';
import './ViewBook.css';

function ViewBook() {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const bookData = await getBookById(id);
                setBook(bookData);
            } catch (error) {
                console.error('Error fetching book:', error);
            }
        };

        fetchBook();
    }, [id]);

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div className="view-book">
            <h2>{book.name}</h2>
            <img
                src={book.image || 'https://via.placeholder.com/300x400?text=No+Image'}
                alt={book.name}
                className="book-image"
            />
            <p><strong>ISBN:</strong> {book.isbn}</p>
            <p><strong>Category:</strong> {book.category}</p>
            <p><strong>Author:</strong> {book.author || 'Unknown Author'}</p>
            <p><strong>Price:</strong> ${book.price}</p>
            <p><strong>Quantity:</strong> {book.quantity}</p>
            <p><strong>Available:</strong> {book.available}</p>
            <p><strong>Description:</strong> {book.description || 'No description available.'}</p>
        </div>
    );
}

export default ViewBook;
