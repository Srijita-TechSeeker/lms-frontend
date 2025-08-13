import axios from "axios";

// Adjust if your backend port is different
const API = "https://lms-backend-api-eywh.onrender.com/api/users";

// GET: fetch all users
export const fetchUsers = () => {
  return axios.get(API);
};

// POST: add a new user
export const addUser = (userData) => {
  return axios.post(`${API}/add`, userData);
};

// DELETE: delete a user by ID
export const deleteUser = (userId) => {
  return axios.delete(`${API}/${userId}`);
};
