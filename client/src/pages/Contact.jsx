import React, { useState } from 'react';
import './Contact.css';
import axios from 'axios';
import contactHeroImg from '../assets/contact-hero.jpg';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/contact', formData);  // ✅ Relative URL
      setFormStatus('Thank you for contacting us!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="contact-hero-bg"></div>
        <img src={contactHeroImg} alt="Contact Us" className="contact-hero-img" />
        <h1>Contact Us</h1>
        <p>We're here to help. Find the right way to reach us below!</p>
      </div>

      <div className="contact-cards-grid">
        {/* contact cards here (same as before) */}
      </div>

      <div className="contact-form-section" id="contact-form">
        <h2>Send Us a Message</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your name"
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Write your message here"
          ></textarea>

          <button type="submit">
            <i className="fas fa-paper-plane"></i> Send Message
          </button>

          {formStatus && <div className="form-status">{formStatus}</div>}
        </form>
      </div>
    </div>
  );
};

export default Contact;
