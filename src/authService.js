import axios from 'axios';

const API_URL = 'https://lms-backend-api-eywh.onrender.com/api/auth';

// For signup
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    alert('You are successfully registered');
    return response;
  } catch (error) {
    console.error(error);
    alert('Error registering user');
    throw error;
  }
};

// For login
export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    alert('Login successful');
    return response;
  } catch (error) {
    console.error(error);
    alert('Error logging in');
    throw error;
  }
};

// Add a book
export const addBook = async (bookData) => {
  try {
    const response = await axios.post('https://lms-backend-api-eywh.onrender.com/api/books', bookData);
    return response.data;
  } catch (error) {
    console.error('Error adding book:', error);
    throw error; // Re-throw the error for handling in the component
  }
};

// Fetch all books
export const fetchBooks = async () => {
  try {
    const response = await axios.get(`https://lms-backend-api-eywh.onrender.com/api/books`);
    return response;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

// Get a specific book by ID
export const getBookById = async (id) => {
  try {
    const response = await axios.get(`https://lms-backend-api-eywh.onrender.com/api/books/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching book:', error);
    throw error;
  }
};

// Update book details
export const updateBook = async (id, bookData) => {
  try {
    const response = await axios.put(`https://lms-backend-api-eywh.onrender.com/api/books/${id}`, bookData);
    return response.data;
  } catch (error) {
    console.error('Error updating book:', error);
    throw error;
  }
};

// Delete a book
export const deleteBook = async (bookId) => {
  try {
    await axios.delete(`https://lms-backend-api-eywh.onrender.com/api/books/${bookId}`);
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error; // Rethrow error for further handling if needed
  }
};

// Borrow a book (new function to decrement the quantity)
// This keeps your existing book decrement logic (optional)
export const decrementBookQuantity = async (bookId) => {
  try {
    const response = await axios.put(`https://lms-backend-api-eywh.onrender.com/api/books/borrow/${bookId}`);
    return response.data;
  } catch (error) {
    console.error('Error decrementing quantity:', error);
    throw error;
  }
};

// ✅ NEW FUNCTION to actually issue a book
export const issueBook = async (userId, bookId) => {
  try {
    const response = await axios.post('https://lms-backend-api-eywh.onrender.com/api/issue/issue-book', {
      userId,
      bookId,
    });
    return response.data;
  } catch (error) {
    console.error('Error issuing book:', error);
    throw error;
  }
};
