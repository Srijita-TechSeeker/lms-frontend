import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FrontPage.css';

function FrontPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/home');
  };

  return (
    <div className="front-page">
       <div className="background-image">
       <div className="overlay">
        <h1 className='name'>LibraFusion</h1>
      <h1>Welcome to  Library</h1>
      <p>Explore a world of knowledge at our online library. Get started today!</p>
      <button onClick={handleGetStarted} className="btn">Get Started</button>
    </div>
    </div>
    </div>
  );
};

export default FrontPage;
