// Frontend/src/pages/Contact.jsx
import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would connect to your backend API endpoint for contact messages
    console.log('Form submitted:', formData);
    alert('Thank you for reaching out! We will get back to you shortly.');
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col md:flex-row">
        
        {/* --- Left Side: Contact Information --- */}
        <div className="md:w-2/5 w-full bg-[#1a2332] text-white p-10 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-extrabold mb-4">Get in Touch</h2>
            <p className="text-gray-300 font-medium mb-8">
              Have questions about renting a car or need assistance with your booking? Our support team is here to help you 24/7.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#0056D2] p-3 rounded-lg text-white">📍</div>
                <div>
                  <h4 className="font-bold text-lg">Visit Us</h4>
                  <p className="text-gray-300 text-sm">123 Car Street, City Center, India</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#0056D2] p-3 rounded-lg text-white">📞</div>
                <div>
                  <h4 className="font-bold text-lg">Call Us</h4>
                  <p className="text-gray-300 text-sm">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#0056D2] p-3 rounded-lg text-white">✉️</div>
                <div>
                  <h4 className="font-bold text-lg">Email Us</h4>
                  <p className="text-gray-300 text-sm">support@rentflow.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-700">
            <p className="text-gray-400 text-sm font-medium">Follow us for exclusive deals</p>
            <div className="flex gap-4 mt-3">
              <span className="text-2xl cursor-pointer hover:text-[#0056D2] transition-colors">📘</span>
              <span className="text-2xl cursor-pointer hover:text-[#0056D2] transition-colors">📸</span>
              <span className="text-2xl cursor-pointer hover:text-[#0056D2] transition-colors">🐦</span>
            </div>
          </div>
        </div>

        {/* --- Right Side: Contact Form --- */}
        <div className="md:w-3/5 w-full p-10">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Send a Message</h2>
          <p className="text-gray-500 font-medium mb-8">
            Fill out the form below, and we will get back to you as soon as possible.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-1">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0056D2] focus:border-transparent bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-800 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0056D2] focus:border-transparent bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-800 mb-1">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Booking Inquiry"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0056D2] focus:border-transparent bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-800 mb-1">Message</label>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Write your message here..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0056D2] focus:border-transparent bg-gray-50 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#0056D2] text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
            >
              Send Message
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;