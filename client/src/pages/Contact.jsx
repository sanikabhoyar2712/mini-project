import React, { useState } from 'react';
import './Contact.css';
import contactHeroImg from '../assets/contact-hero.jpg';

const contactTopics = [
  {
    title: 'Email Us',
    content: (
      <a href="mailto:support@yourdomain.com">
        <i className="fas fa-envelope"></i> support@yourdomain.com
      </a>
    ),
  },
  {
    title: 'Call Us',
    content: (
      <a href="tel:+919876543210">
        <i className="fas fa-phone"></i> +91 98765 43210
      </a>
    ),
  },
  {
    title: 'Visit Us',
    content: (
      <span>
        <i className="fas fa-map-marker-alt"></i> Wardha, Maharashtra, India
      </span>
    ),
  },
  {
    title: 'Contact Form',
    content: (
      <a href="#contact-form">
        <i className="fas fa-paper-plane"></i> Fill out our contact form below
      </a>
    ),
  },
  {
    title: 'Social Media',
    content: (
      <span className="contact-socials">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
      </span>
    ),
  },
  {
    title: 'WhatsApp Us',
    content: (
      <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-whatsapp"></i> +91 98765 43210
      </a>
    ),
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('Thank you for contacting us!');
    setFormData({ name: '', email: '', message: '' });
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
        {contactTopics.map((topic, idx) => (
          <div className="contact-card" key={idx}>
            <h2>{topic.title}</h2>
            <div className="contact-card-content">{topic.content}</div>
          </div>
        ))}
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