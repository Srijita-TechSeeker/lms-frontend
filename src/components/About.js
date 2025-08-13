// About.js

import React from 'react';
import './About.css'; // Import CSS for styling
import libraryAboutImg from '../assets/library-about.jpg';
import Navbar from './Navbar';

function About() {
  return (
    <div>
      <Navbar />
    <div className="about-page">
        <img src={libraryAboutImg} alt="Library About" />
      <div className="about-banner">
        <h1>About Us</h1>
      </div>
      <div className="about-content">
        <p>
        Our library management system is designed to streamline the management of resources, enhance accessibility, and facilitate learning. With intuitive cataloging, robust search functionalities, and seamless borrowing processes, we aim to empower students, educators, and researchers alike. Our commitment lies in promoting knowledge dissemination, fostering a love for reading, and supporting academic excellence. Whether accessing physical books or digital resources, our platform ensures efficiency and convenience, making learning an enriching experience for our community.
        </p>
        
      </div>
    </div>
    </div>
  );
}

export default About;
