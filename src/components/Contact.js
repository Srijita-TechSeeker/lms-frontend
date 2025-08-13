// About.js

import React from 'react';
import './Contact.css'; // Import CSS for styling
import Navbar from './Navbar';

function Contact() {
  return (
    <div>
      <Navbar />
    <div className="contact-container">
        
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you! Get in touch with us for any queries or feedback.</p>
      </div>
      <div class="contact-content">
            <div class="contact-form">
                <h2>Send Us a Message</h2>

                <form>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
              
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
              
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" required></textarea>
              
              <button type="submit">Send Message</button>
            </form>
                </div>



                
            <div class="contact-info">
                <h2>Contact Information</h2>
                <p><i class="fas fa-phone-alt"></i> Phone: +123 456 7890</p>
                <p><i class="fas fa-envelope"></i> Email: support@LibraFusion.com</p>
                <p><i class="fas fa-map-marker-alt"></i> Address: 123 Fashion St, Style City, USA</p>

                <div class="social-icons">
                    

                </div>
            </div>
            
                </div>








                </div>
                </div>
        
        
        
      
    
  );
}

export default Contact;
