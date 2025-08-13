import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Public Components
import FrontPage from './components/FrontPage';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgetPassword from './components/ForgetPassword';
import About from './components/About';
import Blog from './components/Blog';
import Contact from './components/Contact';
import UserHome from './components/UserHome';
import UserLayout from './components/UserLayout';
import ViewBooks from './components/ViewBooks';

// Admin Components
import AdminHome from './components/AdminHome';
import AddBook from './components/AddBook';
import UpdateBook from './components/UpdateBook';
import ViewBook from './components/ViewBook';
import IssueBook from './components/IssueBook';

import AddUser from './components/AddUser';
import UserList from './components/UserList';
import IssuedList from './components/IssuedList';
import AdminSidebar from './components/AdminSidebar';
import MyIssuedBooks from './components/MyIssuedBooks';

// Admin Layout to wrap sidebar + content
function AdminLayout({ children }) {
  return (
    <div style={{ display: 'flex' }}>
      <AdminSidebar />
      <div style={{ marginLeft: '220px', width: '100%', padding: '20px' }}>
        {children}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<FrontPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/user-home" element={<UserHome />} />
        <Route path="/user-home" element={<UserLayout><UserHome /></UserLayout>} />
        <Route path="/my-issued-books" element={<UserLayout><MyIssuedBooks /></UserLayout>} />
        <Route path="/view-books" element={<UserLayout><ViewBooks /></UserLayout>} />

        {/* Admin Routes (with Sidebar) */}
        <Route path="/admin-home" element={<AdminLayout><AdminHome /></AdminLayout>} />
        <Route path="/add-book" element={<AdminLayout><AddBook /></AdminLayout>} />
        <Route path="/update-book/:id" element={<AdminLayout><UpdateBook /></AdminLayout>} />
        <Route path="/view-book/:id" element={<ViewBook />} />
        <Route path="/issue-book" element={<AdminLayout><IssueBook /></AdminLayout>} />
        <Route path="/add-user" element={<AdminLayout><AddUser /></AdminLayout>} />
        <Route path="/user-list" element={<AdminLayout><UserList /></AdminLayout>} />
        <Route path="/issued-list" element={<AdminLayout><IssuedList /></AdminLayout>} />
        <Route path="/my-issued-books" element={<MyIssuedBooks />} />
      </Routes>
    </Router>
  );
}

export default App;
