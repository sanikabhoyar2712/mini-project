import React, { useState } from 'react';
import './Contact.css';
import axios from 'axios';
import contactHeroImg from '../assets/contact-hero.jpg';

const API_URL = 'http://localhost:5000/api/contact';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus('');

    try {
      const response = await axios.post(API_URL, formData);
      setFormStatus('Thank you for contacting us! We will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus(error.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
          ></textarea>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              <i className="fas fa-paper-plane"></i>
            )}
            {isSubmitting ? ' Sending...' : ' Send Message'}
          </button>

          {formStatus && (
            <div className={`form-status ${formStatus.includes('Thank you') ? 'success' : 'error'}`}>
              {formStatus}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;
