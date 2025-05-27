import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for contacting us!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-page">
      <section className="contact-header">
        <h1>Get in Touch</h1>
        <p>We’d love to hear from you! Whether you have a question, feedback, or just want to say hello.</p>
      </section>

      <section className="contact-form-section">
        <div className="contact-form-container">
          <form onSubmit={handleSubmit} className="contact-form">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />

            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              id="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Write your message here"
            ></textarea>

            <button type="submit">
              <i className="fas fa-paper-plane"></i> Send Message
            </button>
          </form>
        </div>
      </section>

      <section className="contact-info-section">
        <h2>Contact Information</h2>
        <p><i className="fas fa-envelope"></i> support@space.com</p>
        <p><i className="fas fa-phone"></i> +91 98765 43210</p>
        <p><i className="fas fa-map-marker-alt"></i> Wardha, Maharashtra, India</p>
      </section>
    </div>
  );
};

export default ContactUs;
