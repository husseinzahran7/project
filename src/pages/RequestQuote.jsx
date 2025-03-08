import React from 'react';

export default function RequestQuote() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-primary-800 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center">Request a Quote</h1>
          <p className="mt-4 text-xl text-center text-primary-100">
            Tell us about your project and we'll get back to you with a detailed quote
          </p>
        </div>
      </div>

      <div className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <form className="space-y-8">
            {/* Personal Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Details</h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="projectType" className="block text-sm font-medium text-gray-700">
                    Project Type
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  >
                    <option>Select a project type</option>
                    <option>New Construction</option>
                    <option>Renovation</option>
                    <option>Addition</option>
                    <option>Commercial Build-out</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="timeline" className="block text-sm font-medium text-gray-700">
                    Desired Timeline
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  >
                    <option>Select a timeline</option>
                    <option>Immediately</option>
                    <option>1-3 months</option>
                    <option>3-6 months</option>
                    <option>6+ months</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                    Budget Range
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  >
                    <option>Select a budget range</option>
                    <option>Under $50,000</option>
                    <option>$50,000 - $100,000</option>
                    <option>$100,000 - $250,000</option>
                    <option>$250,000 - $500,000</option>
                    <option>$500,000+</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Project Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    placeholder="Please provide details about your project..."
                  ></textarea>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full btn-primary"
              >
                Submit Quote Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}