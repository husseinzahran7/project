import React from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <motion.div 
        className="bg-primary-800 text-white py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.h1 
            className="text-4xl font-bold text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Contact Us
          </motion.h1>
          <motion.p 
            className="mt-4 text-xl text-center text-primary-100"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Get in touch with our team
          </motion.p>
        </div>
      </motion.div>

      <div className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 rounded-lg border border-primary-500/20 bg-white/5 backdrop-blur-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder:text-gray-500"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 rounded-lg border border-primary-500/20 bg-white/5 backdrop-blur-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder:text-gray-500"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-2 rounded-lg border border-primary-500/20 bg-white/5 backdrop-blur-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder:text-gray-500"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-primary-500/20 bg-white/5 backdrop-blur-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder:text-gray-500"
                    placeholder="Write your message here..."
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 rounded-lg text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gray-50 p-8 rounded-xl shadow-sm"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Address</h3>
                  <p className="mt-2 text-gray-600">
                    123 Construction Ave<br />
                    City, State 12345
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
                  <p className="mt-2 text-gray-600">(555) 123-4567</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                  <p className="mt-2 text-gray-600">info@yourcompany.com</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Business Hours</h3>
                  <ul className="mt-2 text-gray-600 space-y-1">
                    <li>Monday - Friday: 8am - 6pm</li>
                    <li>Saturday: 9am - 4pm</li>
                    <li>Sunday: Closed</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}