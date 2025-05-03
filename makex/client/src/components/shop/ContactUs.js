import React, { useState } from "react";
import Navbar from "./partials/Navbar";
import Footer from "./partials/Footer";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle form submission, e.g., send data to backend
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 flex items-center justify-center p-6 pt-24 pb-32">
        <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full p-10 md:p-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center tracking-wide">
            Contact Us
          </h2>
          <p className="text-center text-gray-600 mb-10 max-w-xl mx-auto">
            Have questions or need assistance? Fill out the form below and our team will get back to you promptly.
          </p>
          {submitted && (
            <div className="bg-green-100 text-green-800 p-4 rounded mb-6 text-center font-semibold animate-fadeIn">
              Thank you for contacting us! We will respond shortly.
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="name" className="block mb-2 font-semibold text-gray-700">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-5 py-3 focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 font-semibold text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-5 py-3 focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block mb-2 font-semibold text-gray-700">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-5 py-3 focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
                placeholder="Subject of your message"
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 font-semibold text-gray-700">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows="6"
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-5 py-3 focus:outline-none focus:ring-4 focus:ring-blue-400 transition resize-none"
                placeholder="Write your message here"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-700 text-white font-bold py-4 rounded-xl shadow-lg hover:from-purple-700 hover:to-blue-600 transition"
            >
              Send Message
            </button>
          </form>
          <div className="mt-12 text-center text-gray-700 space-y-2 text-sm md:text-base">
            <p>Or reach us at:</p>
            <p>Email: <a href="mailto:support@scrapyard.com" className="text-blue-600 hover:underline">support@scrapyard.com</a></p>
            <p>Phone: <a href="tel:+15551234567" className="text-blue-600 hover:underline">+1 (555) 123-4567</a></p>
            <p>Address: 123 Scrap St, Recycling City, RC 12345</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;

