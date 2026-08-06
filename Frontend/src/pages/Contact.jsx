import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For demo, just show success message
    setSubmitted(true);
    // In production, you'd send the data to an API
    console.log('Contact form submitted:', formData);
  };

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <div className="contact-container">
        <div className="contact-info">
          <h3>Get in Touch</h3>
          <p>We'd love to hear from you! Feel free to reach out with any questions, feedback, or support requests.</p>
          <ul>
            <li><strong>📧 Email:</strong> info@rentflow.com</li>
            <li><strong>📞 Phone:</strong> +91 98765 43210</li>
            <li><strong>📍 Address:</strong> 123, Car Street, Mumbai, India</li>
            <li><strong>🕐 Hours:</strong> Mon-Sat, 9 AM - 8 PM</li>
          </ul>
        </div>
        <div className="contact-form-wrapper">
          {submitted ? (
            <div className="success-message">
              <h3>✅ Thank You!</h3>
              <p>Your message has been sent successfully. We will get back to you shortly.</p>
              <button onClick={() => setSubmitted(false)} className="btn btn-primary">Send Another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div>
                <label>Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div>
                <label>Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div>
                <label>Subject</label>
                <input type="text" name="subject" value={formData.subject} onChange={handleChange} required />
              </div>
              <div>
                <label>Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows="5" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contact;