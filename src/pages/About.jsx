import React from 'react';

export default function About() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-primary-800 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center">About Our Company</h1>
          <p className="mt-4 text-xl text-center text-primary-100">
            Building excellence with integrity and expertise
          </p>
        </div>
      </div>

      {/* Company Overview */}
      <div className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
              <p className="mt-4 text-lg text-gray-600">
                With over two decades of experience in the construction industry, we've built our reputation on quality craftsmanship, reliability, and customer satisfaction. Our journey began with a simple mission: to provide exceptional construction services while maintaining the highest standards of integrity and professionalism.
              </p>
              <p className="mt-4 text-lg text-gray-600">
                Today, we're proud to be one of the most trusted names in construction, serving both residential and commercial clients with the same dedication and attention to detail that has defined our company since day one.
              </p>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Values</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-6 w-6 rounded-full bg-primary-600 flex items-center justify-center text-white">1</div>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-semibold">Quality First</h4>
                    <p className="text-gray-600">We never compromise on the quality of our work</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-6 w-6 rounded-full bg-primary-600 flex items-center justify-center text-white">2</div>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-semibold">Customer Focus</h4>
                    <p className="text-gray-600">Your satisfaction is our top priority</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-6 w-6 rounded-full bg-primary-600 flex items-center justify-center text-white">3</div>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-semibold">Safety</h4>
                    <p className="text-gray-600">Maintaining the highest safety standards in every project</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center">Our Leadership Team</h2>
          <p className="mt-4 text-lg text-gray-600 text-center max-w-3xl mx-auto">
            Meet the experienced professionals who lead our company with expertise and vision
          </p>
          <div className="mt-12 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {/* Team Member Cards */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
              <h3 className="text-xl font-semibold">John Smith</h3>
              <p className="text-primary-600">CEO & Founder</p>
              <p className="mt-2 text-gray-600">20+ years of construction experience</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
              <h3 className="text-xl font-semibold">Sarah Johnson</h3>
              <p className="text-primary-600">Project Director</p>
              <p className="mt-2 text-gray-600">15+ years of project management</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
              <h3 className="text-xl font-semibold">Mike Wilson</h3>
              <p className="text-primary-600">Lead Architect</p>
              <p className="mt-2 text-gray-600">12+ years of architectural design</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}