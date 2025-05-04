/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { toast } from 'react-toastify';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({
      name: '',
      email: '',
      message: '',
    });
    toast('Thank you for contacting us!', {
      type: 'success',
      position: 'top-center',
      theme: 'light',
      autoClose: 3000,
    });
  };

  return (
    <div className="mt-16 bg-slate-900 text-white min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-slate-800 p-8 rounded-lg shadow-lg">
        <h2 className="font-bold text-3xl mb-8 text-center">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-lg mb-2">Name</label>
            <input
              className="w-full p-3 rounded bg-slate-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="name"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-lg mb-2">Email</label>
            <input
              className="w-full p-3 rounded bg-slate-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              id="email"
              name="email"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-lg mb-2">Message</label>
            <textarea
              className="w-full p-3 rounded bg-slate-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="message"
              name="message"
              rows="5"
              placeholder="Your message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 transition-all duration-300 py-3 rounded-lg text-white font-semibold"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
