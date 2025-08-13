import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import './Home.css';

function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading or delay to trigger animation
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 500); // Adjust delay as needed

    return () => clearTimeout(timer);
  }, []); // Run only on component mount

  return (
    <div>
      <Navbar />
      <div className={`home-container ${loaded ? 'loaded' : ''}`}>
        <div className="home-content">
          <h1>Welcome to Our Online Library</h1>
          <h1 className='meet'>"Welcome to LibraFusion, where knowledge meets innovation. Explore our extensive collection and enrich your learning journey."</h1>
          <p>
            Discover a world of knowledge at your fingertips. Our online library offers a wide range of books, journals, and resources to help you learn and grow. Join us today and start your journey of discovery.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
